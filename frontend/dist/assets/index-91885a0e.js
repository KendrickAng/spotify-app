(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const G={},ve=(e,t)=>e===t,we=Symbol("solid-track"),V={equals:ve};let Ne=be;const k=1,$=2,he={owned:null,cleanups:null,context:null,owner:null},ee={};var I=null;let L=null,A=null,p=null,z=null,le=0;function H(e,t){const n=A,s=I,l=e.length===0,o=l?he:{owned:null,cleanups:null,context:null,owner:t||s},r=l?e:()=>e(()=>U(()=>oe(o)));I=o,A=null;try{return _(r,!0)}finally{A=n,I=s}}function B(e,t){t=t?Object.assign({},V,t):V;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=l=>(typeof l=="function"&&(l=l(n.value)),ge(n,l));return[Ae.bind(n),s]}function ce(e,t,n){const s=re(e,t,!0,k);J(s)}function D(e,t,n){const s=re(e,t,!1,k);J(s)}function j(e,t,n){n=n?Object.assign({},V,n):V;const s=re(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,J(s),Ae.bind(s)}function ue(e,t,n){let s,l,o;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,l=e,o=t||{}):(s=e,l=t,o=n||{});let r=null,i=ee,u=null,a=!1,c="initialValue"in o,g=typeof s=="function"&&j(s);const f=new Set,[M,y]=(o.storage||B)(o.initialValue),[S,E]=B(void 0),[W,Z]=B(void 0,{equals:!1}),[d,v]=B(c?"ready":"unresolved");if(G.context){u=`${G.context.id}${G.context.count++}`;let h;o.ssrLoadFrom==="initial"?i=o.initialValue:G.load&&(h=G.load(u))&&(i=h[0])}function R(h,b,m,P){return r===h&&(r=null,c=!0,(h===i||b===i)&&o.onHydrated&&queueMicrotask(()=>o.onHydrated(P,{value:b})),i=ee,x(b,m)),b}function x(h,b){_(()=>{b||y(()=>h),v(b?"errored":"ready"),E(b);for(const m of f.keys())m.decrement();f.clear()},!1)}function O(){const h=Re,b=M(),m=S();if(m&&!r)throw m;return A&&!A.user&&h&&ce(()=>{W(),r&&(h.resolved||f.has(h)||(h.increment(),f.add(h)))}),b}function Q(h=!0){if(h!==!1&&a)return;a=!1;const b=g?g():s;if(b==null||b===!1){R(r,U(M));return}const m=i!==ee?i:U(()=>l(b,{value:M(),refetching:h}));return typeof m!="object"||!(m&&"then"in m)?(R(r,m,void 0,b),m):(r=m,a=!0,queueMicrotask(()=>a=!1),_(()=>{v(c?"refreshing":"pending"),Z()},!1),m.then(P=>R(m,P,void 0,b),P=>R(m,void 0,Ie(P),b)))}return Object.defineProperties(O,{state:{get:()=>d()},error:{get:()=>S()},loading:{get(){const h=d();return h==="pending"||h==="refreshing"}},latest:{get(){if(!c)return O();const h=S();if(h&&!r)throw h;return M()}}}),g?ce(()=>Q(!1)):Q(!1),[O,{refetch:Q,mutate:y}]}function U(e){const t=A;A=null;try{return e()}finally{A=t}}function ye(e){return I===null||(I.cleanups===null?I.cleanups=[e]:I.cleanups.push(e)),e}function Ze(e){const t=j(e),n=j(()=>ie(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let Re;function Ae(){const e=L;if(this.sources&&(this.state||e))if(this.state===k||e)J(this);else{const t=p;p=null,_(()=>K(this),!1),p=t}if(A){const t=this.observers?this.observers.length:0;A.sources?(A.sources.push(this),A.sourceSlots.push(t)):(A.sources=[this],A.sourceSlots=[t]),this.observers?(this.observers.push(A),this.observerSlots.push(A.sources.length-1)):(this.observers=[A],this.observerSlots=[A.sources.length-1])}return this.value}function ge(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&_(()=>{for(let l=0;l<e.observers.length;l+=1){const o=e.observers[l],r=L&&L.running;r&&L.disposed.has(o),(r&&!o.tState||!r&&!o.state)&&(o.pure?p.push(o):z.push(o),o.observers&&me(o)),r||(o.state=k)}if(p.length>1e6)throw p=[],new Error},!1)),t}function J(e){if(!e.fn)return;oe(e);const t=I,n=A,s=le;A=I=e,De(e,e.value,s),A=n,I=t}function De(e,t,n){let s;try{s=e.fn(t)}catch(l){e.pure&&(e.state=k),pe(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ge(e,s):e.value=s,e.updatedAt=n)}function re(e,t,n,s=k,l){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:I,context:null,pure:n};return I===null||I!==he&&(I.owned?I.owned.push(o):I.owned=[o]),o}function Me(e){const t=L;if(e.state===0||t)return;if(e.state===$||t)return K(e);if(e.suspense&&U(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<le);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===k||t)J(e);else if(e.state===$||t){const l=p;p=null,_(()=>K(e,n[0]),!1),p=l}}function _(e,t){if(p)return e();let n=!1;t||(p=[]),z?n=!0:z=[],le++;try{const s=e();return Ge(n),s}catch(s){p||(z=null),pe(s)}}function Ge(e){if(p&&(be(p),p=null),e)return;const t=z;z=null,t.length&&_(()=>Ne(t),!1)}function be(e){for(let t=0;t<e.length;t++)Me(e[t])}function K(e,t){const n=L;e.state=0;for(let s=0;s<e.sources.length;s+=1){const l=e.sources[s];l.sources&&(l.state===k||n?l!==t&&Me(l):(l.state===$||n)&&K(l,t))}}function me(e){const t=L;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=$,s.pure?p.push(s):z.push(s),s.observers&&me(s))}}function oe(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const o=l.pop(),r=n.observerSlots.pop();s<l.length&&(o.sourceSlots[r]=s,l[s]=o,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)oe(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Ie(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function pe(e){throw e=Ie(e),e}function ie(e){if(typeof e=="function"&&!e.length)return ie(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=ie(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}const Se=Symbol("fallback");function ae(e){for(let t=0;t<e.length;t++)e[t]()}function Ye(e,t,n={}){let s=[],l=[],o=[],r=0,i=t.length>1?[]:null;return ye(()=>ae(o)),()=>{let u=e()||[],a,c;return u[we],U(()=>{let f=u.length,M,y,S,E,W,Z,d,v,R;if(f===0)r!==0&&(ae(o),o=[],s=[],l=[],r=0,i&&(i=[])),n.fallback&&(s=[Se],l[0]=H(x=>(o[0]=x,n.fallback())),r=1);else if(r===0){for(l=new Array(f),c=0;c<f;c++)s[c]=u[c],l[c]=H(g);r=f}else{for(S=new Array(f),E=new Array(f),i&&(W=new Array(f)),Z=0,d=Math.min(r,f);Z<d&&s[Z]===u[Z];Z++);for(d=r-1,v=f-1;d>=Z&&v>=Z&&s[d]===u[v];d--,v--)S[v]=l[d],E[v]=o[d],i&&(W[v]=i[d]);for(M=new Map,y=new Array(v+1),c=v;c>=Z;c--)R=u[c],a=M.get(R),y[c]=a===void 0?-1:a,M.set(R,c);for(a=Z;a<=d;a++)R=s[a],c=M.get(R),c!==void 0&&c!==-1?(S[c]=l[a],E[c]=o[a],i&&(W[c]=i[a]),c=y[c],M.set(R,c)):o[a]();for(c=Z;c<f;c++)c in S?(l[c]=S[c],o[c]=E[c],i&&(i[c]=W[c],i[c](c))):l[c]=H(g);l=l.slice(0,r=f),s=u.slice(0)}return l});function g(f){if(o[c]=f,i){const[M,y]=B(c);return i[c]=y,t(u[c],M)}return t(u[c])}}}function T(e,t){return U(()=>e(t||{}))}function Ee(e){const t="fallback"in e&&{fallback:()=>e.fallback};return j(Ye(()=>e.each,e.children,t||void 0))}function We(e){let t=!1;const n=e.keyed,s=j(()=>e.when,void 0,{equals:(l,o)=>t?l===o:!l==!o});return j(()=>{const l=s();if(l){const o=e.children,r=typeof o=="function"&&o.length>0;return t=n||r,r?U(()=>o(l)):o}return e.fallback},void 0,void 0)}function je(e){let t=!1,n=!1;const s=(r,i)=>r[0]===i[0]&&(t?r[1]===i[1]:!r[1]==!i[1])&&r[2]===i[2],l=Ze(()=>e.children),o=j(()=>{let r=l();Array.isArray(r)||(r=[r]);for(let i=0;i<r.length;i++){const u=r[i].when;if(u)return n=!!r[i].keyed,[i,u,r[i]]}return[-1]},void 0,{equals:s});return j(()=>{const[r,i,u]=o();if(r<0)return e.fallback;const a=u.children,c=typeof a=="function"&&a.length>0;return t=n||c,c?U(()=>a(i)):a},void 0,void 0)}function te(e){return e}function Ue(e,t,n){let s=n.length,l=t.length,o=s,r=0,i=0,u=t[l-1].nextSibling,a=null;for(;r<l||i<o;){if(t[r]===n[i]){r++,i++;continue}for(;t[l-1]===n[o-1];)l--,o--;if(l===r){const c=o<s?i?n[i-1].nextSibling:n[o-i]:u;for(;i<o;)e.insertBefore(n[i++],c)}else if(o===i)for(;r<l;)(!a||!a.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[o-1]&&n[i]===t[l-1]){const c=t[--l].nextSibling;e.insertBefore(n[i++],t[r++].nextSibling),e.insertBefore(n[--o],c),t[l]=n[o]}else{if(!a){a=new Map;let g=i;for(;g<o;)a.set(n[g],g++)}const c=a.get(t[r]);if(c!=null)if(i<c&&c<o){let g=r,f=1,M;for(;++g<l&&g<o&&!((M=a.get(t[g]))==null||M!==c+f);)f++;if(f>c-i){const y=t[r];for(;i<c;)e.insertBefore(n[i++],y)}else e.replaceChild(n[i++],t[r++])}else r++;else t[r++].remove()}}}const fe="_$DX_DELEGATE";function ke(e,t,n,s={}){let l;return H(o=>{l=o,t===document?e():C(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{l(),t.textContent=""}}function Y(e,t,n){const s=document.createElement("template");s.innerHTML=e;let l=s.content.firstChild;return n&&(l=l.firstChild),l}function Te(e,t=window.document){const n=t[fe]||(t[fe]=new Set);for(let s=0,l=e.length;s<l;s++){const o=e[s];n.has(o)||(n.add(o),t.addEventListener(o,Ce))}}function F(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function w(e,t){t==null?e.removeAttribute("class"):e.className=t}function C(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return q(e,t,s,n);D(l=>q(e,t(),l,n),s)}function Ce(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),G.registry&&!G.done&&(G.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n;){const s=n[t];if(s&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?s.call(n,l,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function q(e,t,n,s,l){for(G.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(G.context)return n;if(o==="number"&&(t=t.toString()),r){let i=n[0];i&&i.nodeType===3?i.data=t:i=document.createTextNode(t),n=X(e,n,s,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(G.context)return n;n=X(e,n,s)}else{if(o==="function")return D(()=>{let i=t();for(;typeof i=="function";)i=i();n=q(e,i,n,s)}),()=>n;if(Array.isArray(t)){const i=[],u=n&&Array.isArray(n);if(se(i,t,n,l))return D(()=>n=q(e,i,n,s,!0)),()=>n;if(G.context){if(!i.length)return n;for(let a=0;a<i.length;a++)if(i[a].parentNode)return n=i}if(i.length===0){if(n=X(e,n,s),r)return n}else u?n.length===0?de(e,i,s):Ue(e,n,i):(n&&X(e),de(e,i));n=i}else if(t instanceof Node){if(G.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=X(e,n,s,t);X(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function se(e,t,n,s){let l=!1;for(let o=0,r=t.length;o<r;o++){let i=t[o],u=n&&n[o];if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))l=se(e,i,u)||l;else if(typeof i=="function")if(s){for(;typeof i=="function";)i=i();l=se(e,Array.isArray(i)?i:[i],Array.isArray(u)?u:[u])||l}else e.push(i),l=!0;else{const a=String(i);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return l}function de(e,t,n=null){for(let s=0,l=t.length;s<l;s++)e.insertBefore(t[s],n)}function X(e,t,n,s){if(n===void 0)return e.textContent="";const l=s||document.createTextNode("");if(t.length){let o=!1;for(let r=t.length-1;r>=0;r--){const i=t[r];if(l!==i){const u=i.parentNode===e;!o&&!r?u?e.replaceChild(l,i):e.insertBefore(l,n):u&&i.remove()}else o=!0}}else e.insertBefore(l,n);return[l]}const Le="/spotify-app/assets/favicon-d28fd7f7.ico",ze="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAADddAAA3XQEZgEZdAAAF8mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuN2E3YTIzNiwgMjAyMS8wOC8xMi0wMDoyNToyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMS0xMVQxMzowMToyMCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDEtMTFUMTM6MDc6MzIrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDEtMTFUMTM6MDc6MzIrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZDQ0ODlkNTMtYWYxNi00NzRiLWEwZWItYTM5MDU1MGMwNDQwIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTU1ZDA0MzItZWI0ZC03NTRhLWI5ODUtMzQ1MmQ1YzMyNmQ0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MGIzOWExODEtMzNjYy00MzQxLWJmMzYtN2EzMzMxMDRlOGM2Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowYjM5YTE4MS0zM2NjLTQzNDEtYmYzNi03YTMzMzEwNGU4YzYiIHN0RXZ0OndoZW49IjIwMjMtMDEtMTFUMTM6MDE6MjArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDQ0ODlkNTMtYWYxNi00NzRiLWEwZWItYTM5MDU1MGMwNDQwIiBzdEV2dDp3aGVuPSIyMDIzLTAxLTExVDEzOjA3OjMyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+j+2Z+QAAASNJREFUOMuN008rhFEUx/FbQpSUmiKvwEaRfyUbdt4AU6RsKAsLWSsrC2WhbFgp5AXIzkpjIUlZWMtspKZJEWU+Nvep29NMPbdO3XvO7/ftds69ASEXXVjFKR7wiDOsozevz5uXUNV6fWCtFWBH8XWQByzGQhXnaLQwXuAl7jcyQDd+Y/I4AodQxgTGsIDxWNtOgKWArSRx1aSp+ThK9HsBt0miXAAwg7+ofwqxs/BewJzFc/TUAn6SBhYF3EfPd0jm3sBgQcBnduuA66QHNwXM+4m+ErAcDyeoxUnMoT8xlTCdmwBsZoI6LtGXFOcTwGiTR1VHeyaYjMlddGC4ydVrOcBs/i9kz7mCQ/QktTZ8JeaVVr9xBK9RNJDkO/GGO0ylnn9IY2zCu/btFgAAAABJRU5ErkJggg==",_e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAACXBIWXMAADddAAA3XQEZgEZdAAAF8mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuN2E3YTIzNiwgMjAyMS8wOC8xMi0wMDoyNToyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMS0xMVQxMzowMToyMCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDEtMTFUMTM6MDc6MDMrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDEtMTFUMTM6MDc6MDMrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NWUxMjUxNGEtODdkZC1hNDQwLTg1NDctZmUwZWI3MTNkZDczIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTE5ZWU5OWUtNTkwYy00MzRlLWFhOWQtNTQ3NjU3YWFhMWE4IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjYxMjI0NmYtZTU5NC0zZjQxLWE0ZjUtYWJjMGI3ZGIyNzZlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NjEyMjQ2Zi1lNTk0LTNmNDEtYTRmNS1hYmMwYjdkYjI3NmUiIHN0RXZ0OndoZW49IjIwMjMtMDEtMTFUMTM6MDE6MjArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NWUxMjUxNGEtODdkZC1hNDQwLTg1NDctZmUwZWI3MTNkZDczIiBzdEV2dDp3aGVuPSIyMDIzLTAxLTExVDEzOjA3OjAzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+J6ZchwAAAaVJREFUSMet1U2Ij1EUx/Hrb0NKyIJkMUrYjBRrJJuZhUJjqVh52XlpbJRhITaWWMo007BkhZStLSlvmZINI2Yx5WXmY3P/dTs9z//tcer21O859/e993Y6JyF1WTtwFvfwBE8xiXPY1W1/p59H8F73+IKT/QA24qX+4x22dQPswR/NYqQOMIwl/ycOREALb4qEKazBNSxk7S++Yw6/i9zbOfd6oc1hfQmYCCe4UNxsCw5hE1ZhZd48km/dzjsYPO60AWvzycq42kP5xnW04qm2J5yo+HF+AMDhCp/xhPtBfD2AeXs9CF7PEl4F8UoDwPHg9THhRxDPNACMBq+fCfNBvNgAcCx4zSe8DeJ0A8Dl4DWbMBPERQwNYN7Ch+D1IuF0RXk9HgBwq8JnImFzbgNwFw+Lct1XnK4VDJfn7048r+lJuyN9puY0l2rmRaeYKnvROnwtmlfCoyJ5fwVgqIP5IrbGdr23SBjt4c2XYbYGMFY3cMp+ciP39TGs7gNwqtvIHMa3YsNSLoSqsvxc5C2Ug6aXoT+e3/IXNtQAPmXzm1hR5fMPvsVg7mQ9wNYAAAAASUVORK5CYII=",xe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAACXBIWXMAADddAAA3XQEZgEZdAAAF8mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuN2E3YTIzNiwgMjAyMS8wOC8xMi0wMDoyNToyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMS0xMVQxMzowMToyMCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDEtMTFUMTM6MDY6MzcrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDEtMTFUMTM6MDY6MzcrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZDY2NWE2Y2QtMTZkNC1iMjQ2LWI1ODEtOWUzMzZjYWM1NjY4IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODBiNmIyZWItM2Y2ZC0zNjQ2LWIyMTEtNWJlYzcwMTE3ZGYyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZWQwNzk1NTctM2RmNy0zNDRmLTgwNjYtMWE1N2Q3OTIwMTc5Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplZDA3OTU1Ny0zZGY3LTM0NGYtODA2Ni0xYTU3ZDc5MjAxNzkiIHN0RXZ0OndoZW49IjIwMjMtMDEtMTFUMTM6MDE6MjArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDY2NWE2Y2QtMTZkNC1iMjQ2LWI1ODEtOWUzMzZjYWM1NjY4IiBzdEV2dDp3aGVuPSIyMDIzLTAxLTExVDEzOjA2OjM3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+urp0FQAAAkFJREFUSMe1l0tIlUEUxyfrilBuXJg9XLjxgtILMRcVFroxW0UgIlLhpkWLoEWLIBJCSILaCMWFWkRpm0CkJ0REEAgu1I0SYYsWRQ9Kix5I/dqcC8NwZr7HHf8wmzmP/3/mm+/MGQOYDGM90AYcBy4AN4ASMAwMAfuAmiw50zo2CdkvkvEXuAfsiiGgAXhGfswDLXkFnCYeRrMKKBEfj9IKuM3a4XmSgBEn4CfwpQLCr8CyMzfhE3BQSXBNbK3AVAbiGaBTYg8r9pOagEXFsdvZoW7gMtArp7sR2A4UZQHDwKATUw/8cfL+ADbbAoY8K2nPWKi0sQn4puS+aAuY9gg4FUFAqyf3R6DWAPsD3/JYBAHbZMs19BvgnMd4KwJ5eZzxcIwZ4K7H2BlRQA3wXuF46fv+74CqiAIM8FjhWTJSLFwsRCY3wLjCs2yAFU3ZGgjQCtmKAd4qhn9SZGIKmFF4PhjgoecQnohI3uzhmDNS7zU8iChgxMNx30jt9qEvAnkR+O3Jf94AWwMOAEcrIG8BPgVyd5Qdx6zJK3Lr2X3AC+AQUJD6UFDINshYB+wE7qTpkMrBuy3DtJV0SQl8Gljx1Qw9wxG3H7AP42erK3ZxNiDgQErySa0hqQbeWE4lmd8jRWQWuA5sDAiokjIewndpYtSecAewajm35Th4C2m2PtQVu9t4SYTsleDaBAGvA+QDad8FRelYXKwCW3IK6Mr6MioAN3PcEe6f8wSoq+Rx2i5lGbk56xP858X3FdCTlP8/aidCtUeuwScAAAAASUVORK5CYII=",Oe="/spotify-app/assets/spotify_black-e3e8fd51.ico",Qe="/spotify-app/assets/spotify_logo_green-8b469206.png",Xe="/spotify-app/assets/spotify_logo_green_500-171a4590.png",Be="_header_rm4ca_15",Pe="_subheader_rm4ca_25",Je="_center_rm4ca_32",Fe="_socials_rm4ca_39",He="_generate_rm4ca_64",Ve="_results_rm4ca_77",$e="_reminder_rm4ca_81",Ke="_track_rm4ca_89",qe="_trackImage_rm4ca_98",et="_trackContent_rm4ca_104",N={header:Be,subheader:Pe,center:Je,socials:Fe,generate:He,results:Ve,reminder:$e,track:Ke,trackImage:qe,trackContent:et},tt=Y('<div><img alt="spotify logo"></div>'),nt=Y("<div><div>song picker</div></div>"),it=Y('<div><div><a href="https://github.com/KendrickAng/spotify-app">github</a></div></div>'),st=Y("<button>generate</button>"),ne=Y("<div></div>"),lt=Y("<div>Loading...</div>"),rt=Y("<div><div>Sorry, we met an issue fetching songs... please try again later!</div><div>The following error occured: </div></div>"),ot=Y("<button disabled>Service Unavailable</button>"),ct=Y('<p>Click "Generate" to find songs!</p>'),ut=Y('<div><img height="150" alt="album image"><div><div></div><div>Popularity: </div><div><a target="_blank">Song Link</a></div><div><a target="_blank">Song Preview</a></div></div></div>'),at={height:64,width:64,url:"https://via.placeholder.com/64"},ft=async()=>{const e="https://spotify-app-backend-production.up.railway.app/v1/songs/generate";return console.log(e),await(await fetch(e,{method:"GET"})).json()},dt=async()=>{const e="https://spotify-app-backend-production.up.railway.app/v1/healthcheck";return console.log(e),await(await fetch(e,{method:"GET"})).text()},ht=e=>new URL(Object.assign({"/src/assets/favicon.ico":Le,"/src/assets/github-mark-white-16.png":ze,"/src/assets/github-mark-white-24.png":_e,"/src/assets/github-mark-white-32.png":xe,"/src/assets/spotify_black.ico":Oe,"/src/assets/spotify_logo_green.png":Qe,"/src/assets/spotify_logo_green_500.png":Xe})[`/src/assets/${e}`],self.location).href,At=()=>{const[e,t]=B(!1),[n,{refetch:s}]=ue(e,ft),[l]=ue(dt),o=()=>{e()?s():t(!0)};return[(()=>{const r=tt.cloneNode(!0),i=r.firstChild;return D(u=>{const a=N.header,c=ht("spotify_logo_green_500.png");return a!==u._v$&&w(r,u._v$=a),c!==u._v$2&&F(i,"src",u._v$2=c),u},{_v$:void 0,_v$2:void 0}),r})(),(()=>{const r=nt.cloneNode(!0),i=r.firstChild;return D(u=>{const a=N.center,c=N.subheader;return a!==u._v$3&&w(r,u._v$3=a),c!==u._v$4&&w(i,u._v$4=c),u},{_v$3:void 0,_v$4:void 0}),r})(),(()=>{const r=it.cloneNode(!0),i=r.firstChild;return i.firstChild,D(u=>{const a=N.center,c=N.socials;return a!==u._v$5&&w(r,u._v$5=a),c!==u._v$6&&w(i,u._v$6=c),u},{_v$5:void 0,_v$6:void 0}),r})(),(()=>{const r=ne.cloneNode(!0);return C(r,T(We,{get when(){return l()},get fallback(){return ot.cloneNode(!0)},get children(){const i=st.cloneNode(!0);return i.$$click=o,D(()=>w(i,N.generate)),i}})),D(()=>w(r,N.center)),r})(),(()=>{const r=ne.cloneNode(!0);return C(r,T(je,{get fallback(){return(()=>{const i=ct.cloneNode(!0);return D(()=>w(i,N.reminder)),i})()},get children(){return[T(te,{get when(){return n&&n.loading},get children(){const i=lt.cloneNode(!0);return D(()=>w(i,N.reminder)),i}}),T(te,{get when(){return n&&n.error},get children(){const i=rt.cloneNode(!0),u=i.firstChild,a=u.nextSibling;return a.firstChild,C(a,()=>n.error,null),D(()=>w(i,N.reminder)),i}}),T(te,{get when(){return n&&n()},get children(){const i=ne.cloneNode(!0);return C(i,T(Ee,{get each(){return n().tracks},children:u=>{const{url:a}=u.album.images.find(({height:c})=>c>100)||at;return(()=>{const c=ut.cloneNode(!0),g=c.firstChild,f=g.nextSibling,M=f.firstChild,y=M.nextSibling;y.firstChild;const S=y.nextSibling,E=S.firstChild,W=S.nextSibling,Z=W.firstChild;return F(g,"src",a),C(M,()=>u.name),C(y,()=>u.popularity,null),D(d=>{const v=N.track,R=N.trackImage,x=N.trackContent,O=u.external_url,Q=u.preview_url;return v!==d._v$7&&w(c,d._v$7=v),R!==d._v$8&&w(g,d._v$8=R),x!==d._v$9&&w(f,d._v$9=x),O!==d._v$10&&F(E,"href",d._v$10=O),Q!==d._v$11&&F(Z,"href",d._v$11=Q),d},{_v$7:void 0,_v$8:void 0,_v$9:void 0,_v$10:void 0,_v$11:void 0}),c})()}})),D(()=>w(i,N.center)),i}})]}})),D(()=>w(r,N.results)),r})()]};Te(["click"]);ke(()=>T(At,{}),document.getElementById("root"));
