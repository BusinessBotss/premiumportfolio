"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/unsupported-syntax, prefer-const */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './image-trail.css';

interface PointerPos {
    x: number;
    y: number;
}

function lerp(a: number, b: number, n: number) {
    return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: any, rect: DOMRect): PointerPos {
    let clientX = 0, clientY = 0;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function getMouseDistance(p1: PointerPos, p2: PointerPos) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.hypot(dx, dy);
}

class ImageItem {
    DOM: { el: HTMLElement | null; inner: HTMLElement | null } = { el: null, inner: null };
    defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
    rect: DOMRect | null = null;
    resizeHandler: (() => void) | null = null;

    constructor(DOM_el: HTMLElement) {
        this.DOM.el = DOM_el;
        this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
        this.getRect();
        this.initEvents();
    }
    initEvents() {
        this.resizeHandler = () => {
            if (this.DOM.el) gsap.set(this.DOM.el, this.defaultStyle);
            this.getRect();
        };
        window.addEventListener('resize', this.resizeHandler);
    }
    getRect() {
        if (this.DOM.el) this.rect = this.DOM.el.getBoundingClientRect();
    }
    destroy() {
        if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    }
}

// Variants implementation... (I'll condense them into a clean structure for the component)

interface ImageTrailProps {
    items?: string[];
    variant?: number;
}

export default function ImageTrail({ items = [], variant = 1 }: ImageTrailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const variantInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current || items.length === 0) return;

        const container = containerRef.current;
        const images = [...container.querySelectorAll('.content__img')] as HTMLElement[];
        const imageItems = images.map(img => new ImageItem(img));

        // Core Trail Logic helper
        class TrailLogic {
            container: HTMLElement;
            images: ImageItem[];
            imagesTotal: number;
            imgPosition = 0;
            zIndexVal = 1;
            activeImagesCount = 0;
            isIdle = true;
            threshold = 80;
            mousePos = { x: 0, y: 0 };
            lastMousePos = { x: 0, y: 0 };
            cacheMousePos = { x: 0, y: 0 };
            rafId: number | null = null;
            lastAngle = 0;
            visibleImagesCount = 0;
            visibleImagesTotal = 9;

            constructor(container: HTMLElement, images: ImageItem[]) {
                this.container = container;
                this.images = images;
                this.imagesTotal = images.length;
                this.visibleImagesTotal = Math.min(9, this.imagesTotal - 1);

                const handleMove = (ev: MouseEvent | TouchEvent) => {
                    const rect = this.container.getBoundingClientRect();
                    this.mousePos = getLocalPointerPos(ev, rect);
                };
                const initRender = (ev: MouseEvent | TouchEvent) => {
                    const rect = this.container.getBoundingClientRect();
                    this.mousePos = getLocalPointerPos(ev, rect);
                    this.cacheMousePos = { ...this.mousePos };
                    this.render();
                    container.removeEventListener('mousemove', initRender as any);
                    container.removeEventListener('touchmove', initRender as any);
                };

                container.addEventListener('mousemove', handleMove as any);
                container.addEventListener('touchmove', handleMove as any);
                container.addEventListener('mousemove', initRender as any);
                container.addEventListener('touchmove', initRender as any);

                this.destroy = () => {
                    container.removeEventListener('mousemove', handleMove as any);
                    container.removeEventListener('touchmove', handleMove as any);
                    container.removeEventListener('mousemove', initRender as any);
                    container.removeEventListener('touchmove', initRender as any);
                    if (this.rafId) cancelAnimationFrame(this.rafId);
                    this.images.forEach(img => img.destroy());
                };
            }

            destroy() { }

            render() {
                let distance = getMouseDistance(this.mousePos, this.lastMousePos);
                const lerpVal = variant === 6 || variant === 7 ? 0.3 : 0.1;
                this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, lerpVal);
                this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, lerpVal);

                if (distance > this.threshold) {
                    this.showNextImage();
                    this.lastMousePos = { ...this.mousePos };
                }
                if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
                this.rafId = requestAnimationFrame(() => this.render());
            }

            showNextImage() {
                ++this.zIndexVal;
                this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
                const img = this.images[this.imgPosition];
                if (!img.rect || !img.DOM.el) return;

                gsap.killTweensOf(img.DOM.el);

                // Variant Logic Switch
                switch (variant) {
                    case 2:
                        this.animateV2(img);
                        break;
                    case 3:
                        this.animateV3(img);
                        break;
                    case 4:
                        this.animateV4(img);
                        break;
                    case 5:
                        this.animateV5(img);
                        break;
                    case 6:
                        this.animateV6(img, getMouseDistance(this.mousePos, this.cacheMousePos));
                        break;
                    case 7:
                        this.animateV7(img);
                        break;
                    case 8:
                        this.animateV8(img);
                        break;
                    default:
                        this.animateV1(img);
                }
            }

            // Specific Animations
            animateV1(img: ImageItem) {
                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
                    .fromTo(img.DOM.el,
                        { opacity: 1, scale: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2 },
                        { duration: 0.4, ease: 'power1', x: this.mousePos.x - (img.rect?.width || 0) / 2, y: this.mousePos.y - (img.rect?.height || 0) / 2 }, 0)
                    .to(img.DOM.el, { duration: 0.4, ease: 'power3', opacity: 0, scale: 0.2 }, 0.4);
            }

            animateV2(img: ImageItem) {
                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
                    .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2 },
                        { duration: 0.4, ease: 'power1', scale: 1, x: this.mousePos.x - (img.rect?.width || 0) / 2, y: this.mousePos.y - (img.rect?.height || 0) / 2 }, 0)
                    .fromTo(img.DOM.inner, { scale: 2.8, filter: 'brightness(250%)' }, { duration: 0.4, ease: 'power1', scale: 1, filter: 'brightness(100%)' }, 0)
                    .to(img.DOM.el, { duration: 0.4, ease: 'power2', opacity: 0, scale: 0.2 }, 0.45);
            }

            animateV3(img: ImageItem) {
                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
                    .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, xPercent: 0, yPercent: 0, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2 },
                        { duration: 0.4, ease: 'power1', scale: 1, x: this.mousePos.x - (img.rect?.width || 0) / 2, y: this.mousePos.y - (img.rect?.height || 0) / 2 }, 0)
                    .to(img.DOM.el, { duration: 0.6, ease: 'power2', opacity: 0, scale: 0.2, xPercent: () => gsap.utils.random(-30, 30), yPercent: -200 }, 0.6);
            }

            animateV4(img: ImageItem) {
                let dx = this.mousePos.x - this.cacheMousePos.x;
                let dy = this.mousePos.y - this.cacheMousePos.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                dx = dist !== 0 ? (dx / dist) * (dist / 100) : 0;
                dy = dist !== 0 ? (dy / dist) * (dist / 100) : 0;

                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
                    .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2 },
                        { duration: 0.4, ease: 'power1', scale: 1, x: this.mousePos.x - (img.rect?.width || 0) / 2, y: this.mousePos.y - (img.rect?.height || 0) / 2 }, 0)
                    .fromTo(img.DOM.inner, { scale: 2, filter: `brightness(${Math.max((400 * dist) / 100, 100)}%)` }, { duration: 0.4, ease: 'power1', scale: 1, filter: 'brightness(100%)' }, 0)
                    .to(img.DOM.el, { duration: 0.4, ease: 'power3', opacity: 0 }, 0.4)
                    .to(img.DOM.el, { duration: 1.5, ease: 'power4', x: `+=${dx * 110}`, y: `+=${dy * 110}` }, 0.05);
            }

            animateV5(img: ImageItem) {
                let dx = this.mousePos.x - this.cacheMousePos.x;
                let dy = this.mousePos.y - this.cacheMousePos.y;
                let angle = Math.atan2(dy, dx) * (180 / Math.PI);
                if (angle < 0) angle += 360;
                if (angle > 90 && angle <= 270) angle += 180;
                const startAngle = angle >= this.lastAngle ? angle - 10 : angle + 10;
                this.lastAngle = angle;
                let d = Math.sqrt(dx * dx + dy * dy);
                dx = d !== 0 ? (dx / d) * (d / 150) : 0;
                dy = d !== 0 ? (dy / d) * (d / 150) : 0;

                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
                    .fromTo(img.DOM.el, { opacity: 1, scale: 0.1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2, rotation: startAngle },
                        { duration: 1, ease: 'power2', scale: 1, x: this.mousePos.x - (img.rect?.width || 0) / 2 + dx * 70, y: this.mousePos.y - (img.rect?.height || 0) / 2 + dy * 70, rotation: this.lastAngle }, 0)
                    .to(img.DOM.el, { duration: 0.4, ease: 'expo', opacity: 0 }, 0.5)
                    .to(img.DOM.el, { duration: 1.5, ease: 'power4', x: `+=${dx * 120}`, y: `+=${dy * 120}` }, 0.05);
            }

            animateV6(img: ImageItem, speed: number) {
                const scaleFactor = 0.3 + (1.7) * Math.min(speed / 200, 1);
                const grayscale = 1 - Math.min(speed / 90, 1);
                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
                    .fromTo(img.DOM.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2 },
                        { duration: 0.8, ease: 'power3', scale: scaleFactor, filter: `grayscale(${grayscale * 100}%)`, x: this.mousePos.x - (img.rect?.width || 0) / 2, y: this.mousePos.y - (img.rect?.height || 0) / 2 }, 0)
                    .to(img.DOM.el, { duration: 0.4, ease: 'power3.in', opacity: 0, scale: 0.2 }, 0.45);
            }

            animateV7(img: ImageItem) {
                this.visibleImagesCount++;
                const scaleValue = gsap.utils.random(0.5, 1.6);
                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => { } })
                    .fromTo(img.DOM.el, { scale: scaleValue - 0.4, opacity: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2 },
                        { duration: 0.4, ease: 'power3', scale: scaleValue, rotationZ: gsap.utils.random(-3, 3), x: this.mousePos.x - (img.rect?.width || 0) / 2, y: this.mousePos.y - (img.rect?.height || 0) / 2 }, 0);

                if (this.visibleImagesCount >= this.visibleImagesTotal) {
                    const idx = (this.imgPosition - this.visibleImagesTotal + this.imagesTotal) % this.imagesTotal;
                    const old = this.images[idx];
                    gsap.to(old.DOM.el, { duration: 0.4, ease: 'power4', opacity: 0, scale: 1.3 });
                }
            }

            animateV8(img: ImageItem) {
                const dx = this.mousePos.x - (this.container.offsetWidth / 2);
                const dy = this.mousePos.y - (this.container.offsetHeight / 2);
                const rotX = -(dy / (this.container.offsetHeight / 2)) * 30;
                const rotY = (dx / (this.container.offsetWidth / 2)) * 30;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const z = (dist / Math.sqrt(Math.pow(this.container.offsetWidth / 2, 2) + Math.pow(this.container.offsetHeight / 2, 2))) * 1200 - 600;

                gsap.timeline({ onStart: () => this.onImageActivated(), onComplete: () => this.onImageDeactivated() })
                    .set(this.container, { perspective: 1000 })
                    .fromTo(img.DOM.el, { opacity: 1, scale: 1 + z / 1000, zIndex: this.zIndexVal, x: this.cacheMousePos.x - (img.rect?.width || 0) / 2, y: this.cacheMousePos.y - (img.rect?.height || 0) / 2, rotationX: rotX, rotationY: rotY },
                        { duration: 1, ease: 'expo', x: this.mousePos.x - (img.rect?.width || 0) / 2, y: this.mousePos.y - (img.rect?.height || 0) / 2 }, 0)
                    .to(img.DOM.el, { duration: 0.4, ease: 'power2', opacity: 0, z: -800 }, 0.3);
            }

            onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
            onImageDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
        }

        variantInstanceRef.current = new TrailLogic(container, imageItems);

        return () => {
            variantInstanceRef.current?.destroy();
        };
    }, [variant, items]);

    return (
        <div className="content overflow-hidden" ref={containerRef}>
            {items.map((url, i) => (
                <div className="content__img" key={`${url}-${i}`}>
                    <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
                </div>
            ))}
        </div>
    );
}
