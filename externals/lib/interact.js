const t=()=>"currentCSSZoom"in document.documentElement?document.documentElement.currentCSSZoom||1:parseFloat(document.documentElement.style.getPropertyValue("--scaling"))||1;let e=t()||1;document.documentElement.addEventListener("scaling",(()=>{e=t()||1})),document.documentElement.addEventListener("resize",(()=>{e=t()||1})),document.documentElement.classList.contains("__exp-use-zoom")||document.documentElement.classList.add("__exp-use-zoom"),addEventListener("resize",(()=>{e=t()||1}));const n=()=>e||1,o=(t=1)=>(document.documentElement.style.setProperty("--scaling",t),document.documentElement.dispatchEvent(new CustomEvent("scaling",{detail:{zoom:t},bubbles:1,cancelable:1})),t),i=()=>null!=document.documentElement?.currentCSSZoom?1:n(),s=()=>null==document.documentElement?.currentCSSZoom?1:n();class r{pointer=[0,0];results;constructor(t=[0,0]){this.pointer=t,this.results={left:0,top:0,bottom:0,right:0}}get left(){return this.results.left=10>Math.abs(this.pointer[0]-0)}get top(){return this.results.top=10>Math.abs(this.pointer[1]-0)}get right(){const t=10>Math.abs(this.pointer[0]-window.innerWidth);return this.results.right=t}get bottom(){const t=10>Math.abs(this.pointer[1]-window.innerHeight);return this.results.bottom=t}}const c=new Map([]);document.documentElement.addEventListener("pointerdown",(t=>{if(t.target==document.documentElement){const e={id:t.pointerId,event:t,current:[t.clientX,t.clientY],down:[t.clientX,t.clientY],movement:[0,0]},n=(c.has(t.pointerId)?c.get(t.pointerId):e)||e;e.movement[0]=e.current[0]-n.current[0],e.movement[1]=e.current[1]-n.current[1],n.holding||(n.holding=[]),n.holding.forEach((t=>{t.shifting=[...t.modified||t.shifting||[0,0]]})),n.edges||(n.edges=new r(e.current)),Object.assign(n,e),c.has(t.pointerId)||c.set(t.pointerId,n)}}),{capture:1}),CSS?.registerProperty?.({name:"--resize-x",syntax:"<number>",inherits:1,initialValue:"0"}),CSS?.registerProperty?.({name:"--resize-y",syntax:"<number>",inherits:1,initialValue:"0"}),CSS?.registerProperty?.({name:"--drag-x",syntax:"<number>",inherits:1,initialValue:"0"}),CSS?.registerProperty?.({name:"--drag-y",syntax:"<number>",inherits:1,initialValue:"0"});const a=(t,e,n,o="")=>{if("attributeStyleMap"in t){const o=t.attributeStyleMap.get(e),i=o?.[0]??o?.value;(parseFloat(i)!=n&&i!=n||null==i)&&t.attributeStyleMap.set(e,n)}else{const i=t?.style?.getPropertyValue?.(e);(parseFloat(i)!=n&&i!=n||null==i)&&t?.style?.setProperty?.(e,n,o)}},u=new Map([]);requestAnimationFrame((async()=>{for(;;){for(const t of u.entries())t[1]?.(),u.delete(t[0]);try{await new Promise((t=>requestAnimationFrame(t)))}catch(t){break}}})),document.documentElement.addEventListener("pointermove",(t=>{const e={id:t.pointerId,event:t,current:[t.clientX,t.clientY],movement:[0,0]},n=(c.has(t.pointerId)?c.get(t.pointerId):e)||e;e.movement[0]=e.current[0]-n.current[0],e.movement[1]=e.current[1]-n.current[1],n.holding||(n.holding=[]),(n.holding.length||0)>0&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault()),n.edges||(n.edges=new r(e.current)),Object.assign(n,e),c.has(t.pointerId)||c.set(t.pointerId,n),n.holding.forEach((t=>{t.shifting&&(t.shifting[0]+=e.movement[0],t.shifting[1]+=e.movement[1],t.modified=[...t.shifting])})),u.set(t.pointerId,(()=>{n?.holding?.forEach((t=>{if(t.modified&&Math.hypot(...e.movement)>=.001){const e=new CustomEvent("m-dragging",{bubbles:1,detail:{pointer:n,holding:t}}),o=t.element?.deref();o?.dispatchEvent?.(e),o&&(o[`@data-${t.propertyName||"drag"}-x`]=t.modified[0],o[`@data-${t.propertyName||"drag"}-y`]=t.modified[1]),a(o,`--${t.propertyName||"drag"}-x`,t.modified[0]),a(o,`--${t.propertyName||"drag"}-y`,t.modified[1])}}))})),["left","top","right","bottom"].forEach((t=>{if(n?.edges?.results?.[t]!=n?.edges?.[t]){const e=new CustomEvent((n.edges?.[t]?"m-contact-":"m-leave-")+t,{detail:n});document?.dispatchEvent?.(e)}}))}),{capture:1});const m=t=>{const e=c.get(t.pointerId);if(e){const n=t=>{t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault()},o=[n,{once:1}],i=[n,{once:1,capture:1}];(e.holding?.length||0)>0&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault(),document.documentElement.addEventListener("click",...i),document.documentElement.addEventListener("contextmenu",...i),setTimeout((()=>{document.documentElement.removeEventListener("click",...i),document.documentElement.removeEventListener("contextmenu",...i)}),100)),(e.holding||[]).forEach((t=>{const n=t.element?.deref();Math.hypot(...t.shifting||[0])>10&&n&&(n?.addEventListener?.("click",...o),n?.addEventListener?.("contextmenu",...o),setTimeout((()=>{n?.removeEventListener?.("click",...o),n?.removeEventListener?.("contextmenu",...o)}),100));const i=new CustomEvent("m-dragend",{bubbles:1,detail:{pointer:e,holding:t}});n?.dispatchEvent?.(i)})),c.delete(t.pointerId)}};document.documentElement.addEventListener("pointercancel",m,{capture:1}),document.documentElement.addEventListener("pointerup",m,{capture:1});const d=(t,e={pointerId:0},{shifting:n=[0,0],propertyName:o="drag"}={})=>{const i=c.get(e.pointerId);if(i){i.event=e;const s=(i.holding||[]).find((e=>e.element?.deref?.()==t&&e.propertyName==o))||{};(i.holding||[]).push(Object.assign(s||{},{propertyName:o,element:new WeakRef(t),shifting:[...s?.modified||s?.shifting||n||[]]}));const r=new CustomEvent("m-dragstart",{bubbles:1,detail:{pointer:i,holding:s}});t?.dispatchEvent?.(r)}},l=(t,e,n)=>Math.max(t,Math.min(e,n)),p=(t,e=1e3)=>new Promise(((n,o)=>{const i=setTimeout((()=>{o(Error(`Promise timed out after ${e} ms`))}),e);t((t=>{clearTimeout(i),n(t)}),(t=>{clearTimeout(i),o(t)}))})),h=Symbol(),g=Symbol(),b=Symbol(),f=Symbol(),w=(t,e)=>{if("computedStyleMap"in t){const n=t?.computedStyleMap();return n.get(e)?.value||0}if(t instanceof HTMLElement){const n=getComputedStyle(t,"");return parseFloat(n.getPropertyValue(e)?.replace?.("px",""))||0}return 0},v=new WeakMap,x=new WeakMap,M=(t=null)=>{const e=t=>{t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),document.documentElement.removeEventListener("click",e,n),document.documentElement.removeEventListener("contextmenu",e,n)},n={once:1,capture:1};document.documentElement.addEventListener("click",e,n),document.documentElement.addEventListener("contextmenu",e,n),setTimeout((()=>{document.documentElement.removeEventListener("click",e,n),document.documentElement.removeEventListener("contextmenu",e,n)}),100)};class y{#t;#e=0;constructor(t){if(!t)throw Error("Element is null...");this.#t=t,this.#t["@control"]=this,(t=>{if(t instanceof HTMLElement&&!v.has(t)){const e=new ResizeObserver((e=>{for(const o of e)if(o.borderBoxSize){const e=o.borderBoxSize[0];e&&(t[h]=e.inlineSize*n(),t[g]=e.blockSize*n(),t.style.setProperty("--border-width",e.inlineSize+"px"),t.style.setProperty("--border-height",e.blockSize+"px"))}}));t[h]=t.offsetWidth*n(),t[g]=t.offsetHeight*n(),t.style.setProperty("--border-width",t.offsetWidth+"px"),t.style.setProperty("--border-height",t.offsetHeight+"px"),v.set(t,e),e.observe(t,{box:"border-box"})}})(this.#t),this.#t.parentNode&&(t=>{if(t instanceof HTMLElement&&!x.has(t)){const e=new ResizeObserver((e=>{for(const o of e)if(o.contentBoxSize){const e=o.contentBoxSize[0];e&&(t[b]=e.inlineSize*n(),t[f]=e.blockSize*n())}}));t[b]=(t.clientWidth-(w(t,"padding-left")+w(t,"padding-right")))*n(),t[f]=(t.clientHeight-(w(t,"padding-top")+w(t,"padding-bottom")))*n(),x.set(t,e),e.observe(t,{box:"content-box"})}})(this.#t.parentNode),document.documentElement.addEventListener("scaling",(()=>{this.#n()}))}#n(){if(this.#t[h]=this.#t.offsetWidth*n(),this.#t[g]=this.#t.offsetHeight*n(),this.#t.style.setProperty("--border-width",this.#t.offsetWidth+"px"),this.#t.style.setProperty("--border-height",this.#t.offsetHeight+"px"),this.#t.parentNode){const t=this.#t.parentNode;t[b]=(t.clientWidth-(w(t,"padding-left")+w(t,"padding-right")))*n(),t[f]=(t.clientHeight-(w(t,"padding-top")+w(t,"padding-bottom")))*n()}}swipe(t){if(t?.handler){const e=new Map([]);document.documentElement.addEventListener("pointerdown",(n=>{n.target==t?.handler&&e.set(n.pointerId,{target:n.target,start:[n.clientX,n.clientY],current:[n.clientX,n.clientY],pointerId:n.pointerId,startTime:performance.now(),time:performance.now(),speed:0})}));const n=(t,e)=>(t-e+540)%360-180,o=o=>{if(e.has(o)){const i=e.get(o),s=[i.start[0]-i.current[0],i.start[1]-i.current[1]],r=performance.now()-i.startTime,c=Math.hypot(...s)/r;i.speed=c,i.speed>(t.threshold||.5)&&(i.swipeAngle=Math.atan2(i.current[1]-i.start[1],i.current[0]-i.start[0]),i.direction="name",Math.abs(n(i.swipeAngle*(180/Math.PI),0))>20||(i.direction="left"),Math.abs(n(i.swipeAngle*(180/Math.PI),180))>20||(i.direction="right"),Math.abs(n(i.swipeAngle*(180/Math.PI),270))>20||(i.direction="up"),Math.abs(n(i.swipeAngle*(180/Math.PI),90))>20||(i.direction="down"),t?.trigger?.(i)),e.delete(o)}};document.documentElement.addEventListener("pointermove",(t=>{if(e.has(t.pointerId)){t.stopPropagation();const n=e.get(t.pointerId);Object.assign(n||{},{current:[t.clientX,t.clientY],pointerId:t.pointerId,time:performance.now()})}}),{capture:1}),document.documentElement.addEventListener("pointerup",(t=>o(t.pointerId)),{capture:1}),document.documentElement.addEventListener("pointercancel",(t=>o(t.pointerId)),{capture:1})}}limitResize(t,e,o,i){const s=i[b]-(o[h]-(this.propGet("--resize-x")||0)+(this.#t.offsetLeft||0)*n()),r=i[f]-(o[g]-(this.propGet("--resize-y")||0)+(this.#t.offsetTop||0)*n());return t[0]=l(0,e[0],s),t[1]=l(0,e[1],r),t}limitDrag(t,e,n,o){const i=o[f]-n[g];return t[0]=l(0,e[0],o[b]-n[h]),t[1]=l(0,e[1],i),t}resizable(t){const e=t.handler??this.#t,n={pointerId:-1};document.documentElement.addEventListener("pointerdown",(t=>{if(t.target==e){n.pointerId=t.pointerId,this.#n();const e=[this.propGet("--resize-x")||0,this.propGet("--resize-y")||0];d(this.#t,t,{propertyName:"resize",shifting:this.limitResize(e,e,this.#t,this.#t.parentNode)})}})),this.#t.addEventListener("m-dragstart",(t=>{}),{capture:1,passive:0}),this.#t.addEventListener("m-dragging",(t=>{const e=t.detail;this.#t&&e.pointer.id==n.pointerId&&e.holding.element.deref()==this.#t&&"resize"==e.holding.propertyName&&this.limitResize(e.holding.modified,e.holding.shifting,this.#t,this.#t.parentNode)}),{capture:1,passive:0}),this.#t.addEventListener("m-dragend",(t=>{}),{capture:1,passive:0})}draggable(t){const e=t.handler??this.#t,o={pointerId:-1};document.documentElement.addEventListener("pointerdown",(t=>{if(t.target==e){o.pointerId=t.pointerId;const e=e=>{if(e.pointerId==t.pointerId){i(e),this.#n();const o=[(this.#t.offsetLeft||0)*n(),(this.#t.offsetTop||0)*n()];d(this.#t,t,{propertyName:"drag",shifting:this.limitDrag(o,o,this.#t,this.#t.parentNode)})}},i=n=>{n.pointerId==t.pointerId&&(document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",i),document.removeEventListener("pointercancel",i))};document.addEventListener("pointermove",e),document.addEventListener("pointerup",i),document.addEventListener("pointercancel",i)}})),this.#t.addEventListener("m-dragging",(t=>{const e=t.detail;this.#t&&e.pointer.id==o.pointerId&&e.holding.element.deref()==this.#t&&"drag"==e.holding.propertyName&&this.limitDrag(e.holding.modified,e.holding.shifting,this.#t,this.#t.parentNode)}),{capture:1,passive:0})}propGet(t){const e=this.#t.style.getPropertyValue(t);return(null!=e&&""!=e?parseFloat(e)||0:null)||null}propFloat(t,e){const n=this.#t.style.getPropertyValue(t);(parseFloat(n)!=e&&n!=e||null==n)&&this.#t.style.setProperty(t,e,"")}longHover(t,e=t=>{t.target.dispatchEvent(new CustomEvent("long-hover",{detail:t,bubbles:1}))}){const n=t.handler||this.#t,o={pointerId:-1,timer:null},i=n=>{n.target.matches(t.selector)&&0>o.pointerId&&(o.pointerId=n.pointerId,o.timer=setTimeout((()=>{e?.(n),matchMedia("(pointer: coarse) and (hover: none)").matches&&M()}),t.holdTime??300))};n.addEventListener("pointerover",i),n.addEventListener("pointerdown",i);const s=e=>{e.target?.matches(t.selector)&&o.pointerId==e.pointerId&&(o.timer&&clearTimeout(o.timer),o.timer=null,o.pointerId=-1)};document.documentElement.addEventListener("pointerout",s),document.documentElement.addEventListener("pointerup",s),document.documentElement.addEventListener("pointercancel",s)}longPress(t={},e=null){e||=t=>{this.#t.dispatchEvent(new CustomEvent("long-press",{detail:t,bubbles:1}))};const n=t.handler||this.#t,o={pointerId:-1,timer:null,cancelPromise:null,imTimer:null,pageCoord:[0,0],lastCoord:[0,0],ready:0,cancelRv(){}},i=()=>Math.hypot(...o.lastCoord.map(((t,e)=>(o?.pageCoord?.[e]||0)-t)))<=(t?.maxOffsetRadius??10),s=[null,{capture:1}],r=[null,{capture:1}],c=[t=>{t.pointerId==o.pointerId&&(o.lastCoord[0]=t.clientX,o.lastCoord[1]=t.clientY)},{capture:1,passive:1}];r[0]=t=>{t.pointerId==o.pointerId&&(o.lastCoord[0]=t.clientX,o.lastCoord[1]=t.clientY,t?.preventDefault(),t?.stopPropagation(),o.ready||o.cancelRv?.())},s[0]=t=>{t.pointerId==o.pointerId&&(o.lastCoord[0]=t.clientX,o.lastCoord[1]=t.clientY,t?.preventDefault(),t?.stopPropagation(),i()||o.cancelRv?.())},document.documentElement.addEventListener("pointerdown",(c=>{if(c.target==n&&0>o.pointerId&&(t.anyPointer||"touch"==c.pointerType)){c.preventDefault(),c.stopPropagation(),o.pageCoord=[c.clientX,c.clientY],o.lastCoord=[c.clientX,c.clientY],o.pointerId=c.pointerId;const n=Promise.withResolvers();o.cancelPromise=n.promise,o.cancelRv=()=>{document.documentElement.removeEventListener("pointerup",...r),document.documentElement.removeEventListener("pointercancel",...r),document.documentElement.removeEventListener("pointermove",...s),clearTimeout(o.timer),clearTimeout(o.imTimer),o.ready=0,o.timer=null,o.imTimer=null,o.cancelRv=null,o.cancelPromise=null,o.pointerId=-1,n.resolve(1)},"mouse"==c.pointerType&&t.mouseImmediate?(e?.(c),o?.cancelRv?.()):Promise.any([p(((e,n)=>o.timer=setTimeout(((t,e,n)=>async()=>{e.pointerId==n.pointerId&&t?.()})(e,o,c),t?.minHoldTime??300)),5e3).then((()=>o.ready=1)),p(((n,s)=>o.imTimer=setTimeout(((t,n,o)=>async()=>{n.pointerId==o.pointerId&&(i()&&(t?.(),e?.(o),M(o)),n.cancelRv?.())})(n,o,c),t?.maxHoldTime??600)),1e3),o.cancelPromise]).catch((()=>{}).bind()).then(o.cancelRv),document.documentElement.addEventListener("pointerup",...r),document.documentElement.addEventListener("pointercancel",...r),document.documentElement.addEventListener("pointermove",...s)}}),{passive:0,capture:0}),document.documentElement.addEventListener("pointerup",...c),document.documentElement.addEventListener("pointercancel",...c),document.documentElement.addEventListener("pointermove",...c)}}export{o as changeZoom,y as default,i as fixedClientZoom,t as getZoom,d as grabForDrag,c as pointerMap,m as releasePointer,s as unfixedClientZoom,n as zoomOf};