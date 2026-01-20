var Lr=Object.defineProperty;var Br=(v,l,d)=>l in v?Lr(v,l,{enumerable:!0,configurable:!0,writable:!0,value:d}):v[l]=d;var He=(v,l,d)=>Br(v,typeof l!="symbol"?l+"":l,d);function Pr(v,l){for(var d=0;d<l.length;d++){const u=l[d];if(typeof u!="string"&&!Array.isArray(u)){for(const M in u)if(M!=="default"&&!(M in v)){const g=Object.getOwnPropertyDescriptor(u,M);g&&Object.defineProperty(v,M,g.get?g:{enumerable:!0,get:()=>u[M]})}}}return Object.freeze(Object.defineProperty(v,Symbol.toStringTag,{value:"Module"}))}(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const M of document.querySelectorAll('link[rel="modulepreload"]'))u(M);new MutationObserver(M=>{for(const g of M)if(g.type==="childList")for(const C of g.addedNodes)C.tagName==="LINK"&&C.rel==="modulepreload"&&u(C)}).observe(document,{childList:!0,subtree:!0});function d(M){const g={};return M.integrity&&(g.integrity=M.integrity),M.referrerPolicy&&(g.referrerPolicy=M.referrerPolicy),M.crossOrigin==="use-credentials"?g.credentials="include":M.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function u(M){if(M.ep)return;M.ep=!0;const g=d(M);fetch(M.href,g)}})();const Hr="CalorieTrackerDB",Fr=3;let Vr=class{constructor(){He(this,"db",null)}async init(){return new Promise((l,d)=>{const u=indexedDB.open(Hr,Fr);u.onerror=()=>{d(new Error("Failed to open database"))},u.onsuccess=()=>{this.db=u.result,l()},u.onupgradeneeded=M=>{const g=M.target.result,C=M.oldVersion;if(!g.objectStoreNames.contains("foodEntries")){const b=g.createObjectStore("foodEntries",{keyPath:"id",autoIncrement:!0});b.createIndex("date","date",{unique:!1}),b.createIndex("timestamp","timestamp",{unique:!1})}if(!g.objectStoreNames.contains("weightEntries")){const b=g.createObjectStore("weightEntries",{keyPath:"id",autoIncrement:!0});b.createIndex("date","date",{unique:!0}),b.createIndex("timestamp","timestamp",{unique:!1})}if(C<2&&!g.objectStoreNames.contains("goalWeight")&&g.createObjectStore("goalWeight",{keyPath:"id",autoIncrement:!0}).createIndex("createdAt","createdAt",{unique:!1}),C<3&&!g.objectStoreNames.contains("calorieGoals")){const b=g.createObjectStore("calorieGoals",{keyPath:"id",autoIncrement:!0});b.createIndex("goalType","goalType",{unique:!1}),b.createIndex("startDate","startDate",{unique:!1}),b.createIndex("endDate","endDate",{unique:!1}),b.createIndex("createdAt","createdAt",{unique:!1})}}})}async addFoodEntry(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const C=this.db.transaction(["foodEntries"],"readwrite").objectStore("foodEntries").add(l);C.onsuccess=()=>d(C.result),C.onerror=()=>u(new Error("Failed to add food entry"))})}async getFoodEntriesByDate(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const b=this.db.transaction(["foodEntries"],"readonly").objectStore("foodEntries").index("date").getAll(l);b.onsuccess=()=>d(b.result),b.onerror=()=>u(new Error("Failed to get food entries"))})}async getFoodEntriesInRange(l,d){return new Promise((u,M)=>{if(!this.db){M(new Error("Database not initialized"));return}const b=this.db.transaction(["foodEntries"],"readonly").objectStore("foodEntries").index("date"),N=IDBKeyRange.bound(l,d),w=b.getAll(N);w.onsuccess=()=>u(w.result),w.onerror=()=>M(new Error("Failed to get food entries"))})}async getAllFoodEntries(){return new Promise((l,d)=>{if(!this.db){d(new Error("Database not initialized"));return}const g=this.db.transaction(["foodEntries"],"readonly").objectStore("foodEntries").getAll();g.onsuccess=()=>l(g.result),g.onerror=()=>d(new Error("Failed to get all food entries"))})}async deleteFoodEntry(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const C=this.db.transaction(["foodEntries"],"readwrite").objectStore("foodEntries").delete(l);C.onsuccess=()=>d(),C.onerror=()=>u(new Error("Failed to delete food entry"))})}async addOrUpdateWeightEntry(l){const d=await this.getWeightEntryByDate(l.date);return new Promise((u,M)=>{if(!this.db){M(new Error("Database not initialized"));return}const C=this.db.transaction(["weightEntries"],"readwrite").objectStore("weightEntries");let b;d?b=C.put({...l,id:d.id}):b=C.add(l),b.onsuccess=()=>u(b.result),b.onerror=()=>M(new Error("Failed to save weight entry"))})}async getWeightEntryByDate(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const b=this.db.transaction(["weightEntries"],"readonly").objectStore("weightEntries").index("date").get(l);b.onsuccess=()=>d(b.result||null),b.onerror=()=>u(new Error("Failed to get weight entry"))})}async getAllWeightEntries(){return new Promise((l,d)=>{if(!this.db){d(new Error("Database not initialized"));return}const g=this.db.transaction(["weightEntries"],"readonly").objectStore("weightEntries").getAll();g.onsuccess=()=>{const C=g.result;C.sort((b,N)=>new Date(N.date).getTime()-new Date(b.date).getTime()),l(C)},g.onerror=()=>d(new Error("Failed to get weight entries"))})}async deleteWeightEntry(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const C=this.db.transaction(["weightEntries"],"readwrite").objectStore("weightEntries").delete(l);C.onsuccess=()=>d(),C.onerror=()=>u(new Error("Failed to delete weight entry"))})}async setGoalWeight(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const g=this.db.transaction(["goalWeight"],"readwrite").objectStore("goalWeight"),C=g.clear();C.onsuccess=()=>{const b=g.add(l);b.onsuccess=()=>d(b.result),b.onerror=()=>u(new Error("Failed to set goal weight"))},C.onerror=()=>u(new Error("Failed to clear previous goals"))})}async getGoalWeight(){return new Promise((l,d)=>{if(!this.db){d(new Error("Database not initialized"));return}const g=this.db.transaction(["goalWeight"],"readonly").objectStore("goalWeight").getAll();g.onsuccess=()=>{const C=g.result;l(C.length>0?C[0]:null)},g.onerror=()=>d(new Error("Failed to get goal weight"))})}async deleteGoalWeight(){return new Promise((l,d)=>{if(!this.db){d(new Error("Database not initialized"));return}const g=this.db.transaction(["goalWeight"],"readwrite").objectStore("goalWeight").clear();g.onsuccess=()=>l(),g.onerror=()=>d(new Error("Failed to delete goal weight"))})}async exportAllData(){const[l,d,u,M]=await Promise.all([this.getAllFoodEntries(),this.getAllWeightEntries(),this.getGoalWeight(),this.getAllCalorieGoals()]),g={version:3,exportDate:new Date().toISOString(),data:{foodEntries:l,weightEntries:d,goalWeight:u,calorieGoals:M}};return JSON.stringify(g,null,2)}async importData(l){try{const d=JSON.parse(l);if(!d.data)throw new Error("Invalid backup format");const{foodEntries:u,weightEntries:M,goalWeight:g,calorieGoals:C}=d.data;if(u&&Array.isArray(u))for(const b of u){const{id:N,...w}=b;await this.addFoodEntry(w)}if(M&&Array.isArray(M))for(const b of M){const{id:N,...w}=b;await this.addOrUpdateWeightEntry(w)}if(g){const{id:b,...N}=g;await this.setGoalWeight(N)}if(C&&Array.isArray(C))for(const b of C){const{id:N,...w}=b;await this.addCalorieGoal(w)}}catch(d){throw new Error("Failed to import data: "+d.message)}}async addCalorieGoal(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const C=this.db.transaction(["calorieGoals"],"readwrite").objectStore("calorieGoals").add(l);C.onsuccess=()=>d(C.result),C.onerror=()=>u(new Error("Failed to add calorie goal"))})}async getCalorieGoal(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const C=this.db.transaction(["calorieGoals"],"readonly").objectStore("calorieGoals").get(l);C.onsuccess=()=>d(C.result||null),C.onerror=()=>u(new Error("Failed to get calorie goal"))})}async getAllCalorieGoals(){return new Promise((l,d)=>{if(!this.db){d(new Error("Database not initialized"));return}const g=this.db.transaction(["calorieGoals"],"readonly").objectStore("calorieGoals").getAll();g.onsuccess=()=>{const C=g.result;C.sort((b,N)=>N.createdAt-b.createdAt),l(C)},g.onerror=()=>d(new Error("Failed to get calorie goals"))})}async getActiveCalorieGoalForDate(l){const d=await this.getAllCalorieGoals();for(const u of d){if(u.goalType==="permanent")return u;if(u.goalType==="specific-date"){if(u.startDate===l)return u}else if(u.goalType==="date-range"&&u.startDate&&u.endDate&&l>=u.startDate&&l<=u.endDate)return u}return null}async updateCalorieGoal(l,d){return new Promise(async(u,M)=>{if(!this.db){M(new Error("Database not initialized"));return}const g=await this.getCalorieGoal(l);if(!g){M(new Error("Calorie goal not found"));return}const C={...g,...d},w=this.db.transaction(["calorieGoals"],"readwrite").objectStore("calorieGoals").put(C);w.onsuccess=()=>u(),w.onerror=()=>M(new Error("Failed to update calorie goal"))})}async deleteCalorieGoal(l){return new Promise((d,u)=>{if(!this.db){u(new Error("Database not initialized"));return}const C=this.db.transaction(["calorieGoals"],"readwrite").objectStore("calorieGoals").delete(l);C.onsuccess=()=>d(),C.onerror=()=>u(new Error("Failed to delete calorie goal"))})}};const Rt=new Vr;function B1(v){return v.toISOString().split("T")[0]}function n1(){return B1(new Date)}function Fe(v){return new Date(v+"T00:00:00")}function kr(v){const l=v.getDay(),d=l===0?-6:1-l,u=new Date(v);u.setDate(v.getDate()+d);const M=new Date(u);return M.setDate(u.getDate()+6),{start:B1(u),end:B1(M)}}function D2(v,l){const d=v.filter(u=>u.date===l);return{date:l,totalCalories:d.reduce((u,M)=>u+M.calories,0),totalProtein:d.reduce((u,M)=>u+(M.protein||0),0),totalCost:d.reduce((u,M)=>u+(M.cost||0),0),entries:d}}function Ur(v,l,d){const u=v.filter(N=>N.date>=l&&N.date<=d),M=new Map;for(const N of u){const w=M.get(N.date)||{calories:0,cost:0};M.set(N.date,{calories:w.calories+N.calories,cost:w.cost+(N.cost||0)})}const g=M.size,C=Array.from(M.values()).reduce((N,w)=>N+w.calories,0),b=Array.from(M.values()).reduce((N,w)=>N+w.cost,0);return{weekStart:l,weekEnd:d,avgCalories:g>0?Math.round(C/g):0,avgCost:g>0?Math.round(b/g*100)/100:0,totalDays:g}}function Zr(v,l,d){const u=`${l}-${String(d+1).padStart(2,"0")}`,M=v.filter(_=>_.date.startsWith(u)),g=new Map;for(const _ of M){const D=g.get(_.date)||{calories:0,cost:0};g.set(_.date,{calories:D.calories+_.calories,cost:D.cost+(_.cost||0)})}const C=g.size,b=Array.from(g.values()).reduce((_,D)=>_+D.calories,0),N=Array.from(g.values()).reduce((_,D)=>_+D.cost,0);return{month:["January","February","March","April","May","June","July","August","September","October","November","December"][d],year:l,avgCalories:C>0?Math.round(b/C):0,avgCost:C>0?Math.round(N/C*100)/100:0,totalDays:C}}function _1(v){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(v)}function y1(v){return Fe(v).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function Gr(v,l,d,u,M,g){const C=new Date,b=Fe(d),N=Fe(M),w=Math.ceil((b.getTime()-N.getTime())/(1e3*60*60*24)),_=Math.ceil((C.getTime()-N.getTime())/(1e3*60*60*24)),D=Math.ceil((b.getTime()-C.getTime())/(1e3*60*60*24)),j=l-u,z=w>0?j/w*7:0,pt=v||u,q=pt-u,ct=j!==0?Math.min(100,Math.max(0,q/j*100)):0;let Tt=null;if(g.length>=2){const Y=[...g].sort((le,ut)=>new Date(ut.date).getTime()-new Date(le.date).getTime()),et=Y.slice(0,Math.min(14,Y.length));if(et.length>=2){const le=et[0].weight,ut=et[et.length-1].weight,k=Math.ceil((Fe(et[0].date).getTime()-Fe(et[et.length-1].date).getTime())/(1e3*60*60*24));k>0&&(Tt=(le-ut)/k*7)}}let st="insufficient-data";if(v&&Tt!==null&&g.length>=3){const Y=u+z*_/7,et=Math.abs(j)*.1;Math.abs(pt-Y)<=et?st="on-track":j>0?st=pt>=Y?"ahead":"behind":st=pt<=Y?"ahead":"behind"}else v&&g.length>=1&&(st="on-track");return{status:st,currentWeight:v,goalWeight:l,targetDate:d,daysRemaining:D,requiredWeeklyChange:z,actualWeeklyChange:Tt,percentComplete:ct}}function Wr(v,l){const d=v.targetCalories-l,u=v.targetCalories>0?Math.round(l/v.targetCalories*100):0,M=l>v.targetCalories;return{goal:v,remainingCalories:d,percentConsumed:u,isOverGoal:M}}function _2(v){return v.goalType==="permanent"?"Always active":v.goalType==="specific-date"&&v.startDate?y1(v.startDate):v.goalType==="date-range"&&v.startDate&&v.endDate?`${y1(v.startDate)} - ${y1(v.endDate)}`:"Unknown"}function zr(v,l){return v.goalType==="permanent"?!0:v.goalType==="specific-date"?v.startDate===l:v.goalType==="date-range"&&v.startDate&&v.endDate?l>=v.startDate&&l<=v.endDate:!1}/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qn=(v,l,d=[])=>{const u=document.createElementNS("http://www.w3.org/2000/svg",v);return Object.keys(l).forEach(M=>{u.setAttribute(M,String(l[M]))}),d.length&&d.forEach(M=>{const g=Qn(...M);u.appendChild(g)}),u};var Xr=([v,l,d])=>Qn(v,l,d);/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qr=v=>Array.from(v.attributes).reduce((l,d)=>(l[d.name]=d.value,l),{}),Yr=v=>typeof v=="string"?v:!v||!v.class?"":v.class&&typeof v.class=="string"?v.class.split(" "):v.class&&Array.isArray(v.class)?v.class:"",jr=v=>v.flatMap(Yr).map(d=>d.trim()).filter(Boolean).filter((d,u,M)=>M.indexOf(d)===u).join(" "),Kr=v=>v.replace(/(\w)(\w*)(_|-|\s*)/g,(l,d,u)=>d.toUpperCase()+u.toLowerCase()),L2=(v,{nameAttr:l,icons:d,attrs:u})=>{var pt;const M=v.getAttribute(l);if(M==null)return;const g=Kr(M),C=d[g];if(!C)return console.warn(`${v.outerHTML} icon name was not found in the provided icons object.`);const b=qr(v),[N,w,_]=C,D={...w,"data-lucide":M,...u,...b},j=jr(["lucide",`lucide-${M}`,b,u]);j&&Object.assign(D,{class:j});const z=Xr([N,D,_]);return(pt=v.parentNode)==null?void 0:pt.replaceChild(z,v)};/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qr=["svg",i,[["path",{d:"M3.5 13h6"}],["path",{d:"m2 16 4.5-9 4.5 9"}],["path",{d:"M18 7v9"}],["path",{d:"m14 12 4 4 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jr=["svg",i,[["path",{d:"M3.5 13h6"}],["path",{d:"m2 16 4.5-9 4.5 9"}],["path",{d:"M18 16V7"}],["path",{d:"m14 11 4-4 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r=["svg",i,[["path",{d:"M21 14h-5"}],["path",{d:"M16 16v-3.5a2.5 2.5 0 0 1 5 0V16"}],["path",{d:"M4.5 13h6"}],["path",{d:"m3 16 4.5-9 4.5 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ti=["svg",i,[["circle",{cx:"16",cy:"4",r:"1"}],["path",{d:"m18 19 1-7-6 1"}],["path",{d:"m5 8 3-3 5.5 3-2.36 3.5"}],["path",{d:"M4.24 14.5a5 5 0 0 0 6.88 6"}],["path",{d:"M13.76 17.5a5 5 0 0 0-6.88-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ei=["svg",i,[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ai=["svg",i,[["path",{d:"M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 8h12"}],["path",{d:"M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"}],["path",{d:"M6.6 15.6A2 2 0 1 0 10 17v-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ni=["svg",i,[["path",{d:"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}],["path",{d:"m12 15 5 6H7Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2=["svg",i,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}],["path",{d:"m9 13 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P2=["svg",i,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}],["path",{d:"M9 13h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ri=["svg",i,[["path",{d:"M6.87 6.87a8 8 0 1 0 11.26 11.26"}],["path",{d:"M19.9 14.25a8 8 0 0 0-9.15-9.15"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.26 18.67 4 21"}],["path",{d:"m2 2 20 20"}],["path",{d:"M4 4 2 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H2=["svg",i,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}],["path",{d:"M12 10v6"}],["path",{d:"M9 13h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ii=["svg",i,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M12 9v4l2 2"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const si=["svg",i,[["path",{d:"M11 21c0-2.5 2-2.5 2-5"}],["path",{d:"M16 21c0-2.5 2-2.5 2-5"}],["path",{d:"m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8"}],["path",{d:"M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z"}],["path",{d:"M6 21c0-2.5 2-2.5 2-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hi=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["polyline",{points:"11 3 11 11 14 8 17 11 17 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oi=["svg",i,[["path",{d:"M2 12h20"}],["path",{d:"M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"}],["path",{d:"M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"}],["path",{d:"M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1"}],["path",{d:"M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ci=["svg",i,[["path",{d:"M12 2v20"}],["path",{d:"M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4"}],["path",{d:"M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"}],["path",{d:"M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1"}],["path",{d:"M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const di=["svg",i,[["line",{x1:"21",x2:"3",y1:"6",y2:"6"}],["line",{x1:"17",x2:"7",y1:"12",y2:"12"}],["line",{x1:"19",x2:"5",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const li=["svg",i,[["rect",{width:"6",height:"16",x:"4",y:"2",rx:"2"}],["rect",{width:"6",height:"9",x:"14",y:"9",rx:"2"}],["path",{d:"M22 22H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pi=["svg",i,[["rect",{width:"16",height:"6",x:"2",y:"4",rx:"2"}],["rect",{width:"9",height:"6",x:"9",y:"14",rx:"2"}],["path",{d:"M22 22V2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ui=["svg",i,[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2"}],["path",{d:"M17 22v-5"}],["path",{d:"M17 7V2"}],["path",{d:"M7 22v-3"}],["path",{d:"M7 5V2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gi=["svg",i,[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2"}],["path",{d:"M10 2v20"}],["path",{d:"M20 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fi=["svg",i,[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2"}],["path",{d:"M4 2v20"}],["path",{d:"M14 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xi=["svg",i,[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2"}],["path",{d:"M12 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi=["svg",i,[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"12",y:"7",rx:"2"}],["path",{d:"M22 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vi=["svg",i,[["rect",{width:"6",height:"14",x:"6",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2"}],["path",{d:"M2 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yi=["svg",i,[["rect",{width:"6",height:"10",x:"9",y:"7",rx:"2"}],["path",{d:"M4 22V2"}],["path",{d:"M20 22V2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mi=["svg",i,[["rect",{width:"6",height:"14",x:"3",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"15",y:"7",rx:"2"}],["path",{d:"M3 2v20"}],["path",{d:"M21 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wi=["svg",i,[["line",{x1:"3",x2:"21",y1:"6",y2:"6"}],["line",{x1:"3",x2:"21",y1:"12",y2:"12"}],["line",{x1:"3",x2:"21",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ai=["svg",i,[["line",{x1:"21",x2:"3",y1:"6",y2:"6"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12"}],["line",{x1:"17",x2:"3",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ci=["svg",i,[["line",{x1:"21",x2:"3",y1:"6",y2:"6"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12"}],["line",{x1:"21",x2:"7",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ei=["svg",i,[["rect",{width:"6",height:"16",x:"4",y:"6",rx:"2"}],["rect",{width:"6",height:"9",x:"14",y:"6",rx:"2"}],["path",{d:"M22 2H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ii=["svg",i,[["rect",{width:"9",height:"6",x:"6",y:"14",rx:"2"}],["rect",{width:"16",height:"6",x:"6",y:"4",rx:"2"}],["path",{d:"M2 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bi=["svg",i,[["path",{d:"M22 17h-3"}],["path",{d:"M22 7h-5"}],["path",{d:"M5 17H2"}],["path",{d:"M7 7H2"}],["rect",{x:"5",y:"14",width:"14",height:"6",rx:"2"}],["rect",{x:"7",y:"4",width:"10",height:"6",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Si=["svg",i,[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2"}],["path",{d:"M2 20h20"}],["path",{d:"M2 10h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ti=["svg",i,[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2"}],["path",{d:"M2 14h20"}],["path",{d:"M2 4h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ni=["svg",i,[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2"}],["path",{d:"M2 12h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ri=["svg",i,[["rect",{width:"14",height:"6",x:"5",y:"12",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2"}],["path",{d:"M2 22h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oi=["svg",i,[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"6",rx:"2"}],["path",{d:"M2 2h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=["svg",i,[["rect",{width:"10",height:"6",x:"7",y:"9",rx:"2"}],["path",{d:"M22 20H2"}],["path",{d:"M22 4H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _i=["svg",i,[["rect",{width:"14",height:"6",x:"5",y:"15",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"3",rx:"2"}],["path",{d:"M2 21h20"}],["path",{d:"M2 3h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Li=["svg",i,[["path",{d:"M10 10H6"}],["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"}],["path",{d:"M8 8v4"}],["path",{d:"M9 18h6"}],["circle",{cx:"17",cy:"18",r:"2"}],["circle",{cx:"7",cy:"18",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bi=["svg",i,[["path",{d:"M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"}],["path",{d:"M16 12h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=["svg",i,[["path",{d:"M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"}],["path",{d:"M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hi=["svg",i,[["path",{d:"M12 22V8"}],["path",{d:"M5 12H2a10 10 0 0 0 20 0h-3"}],["circle",{cx:"12",cy:"5",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fi=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2"}],["path",{d:"M7.5 8 10 9"}],["path",{d:"m14 9 2.5-1"}],["path",{d:"M9 10h0"}],["path",{d:"M15 10h0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vi=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 15h8"}],["path",{d:"M8 9h2"}],["path",{d:"M14 9h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ki=["svg",i,[["path",{d:"M2 12 7 2"}],["path",{d:"m7 12 5-10"}],["path",{d:"m12 12 5-10"}],["path",{d:"m17 12 5-10"}],["path",{d:"M4.5 7h15"}],["path",{d:"M12 16v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ui=["svg",i,[["path",{d:"M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4"}],["path",{d:"M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z"}],["path",{d:"M9 12v5"}],["path",{d:"M15 12v5"}],["path",{d:"M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zi=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m14.31 8 5.74 9.94"}],["path",{d:"M9.69 8h11.48"}],["path",{d:"m7.38 12 5.74-9.94"}],["path",{d:"M9.69 16 3.95 6.06"}],["path",{d:"M14.31 16H2.83"}],["path",{d:"m16.62 12-5.74 9.94"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gi=["svg",i,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M6 8h.01"}],["path",{d:"M10 8h.01"}],["path",{d:"M14 8h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wi=["svg",i,[["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}],["path",{d:"M10 4v4"}],["path",{d:"M2 8h20"}],["path",{d:"M6 4v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zi=["svg",i,[["path",{d:"M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"}],["path",{d:"M10 2c1 .5 2 2 2 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xi=["svg",i,[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h2"}],["path",{d:"M20 8v11a2 2 0 0 1-2 2h-2"}],["path",{d:"m9 15 3-3 3 3"}],["path",{d:"M12 12v9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qi=["svg",i,[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"m9.5 17 5-5"}],["path",{d:"m9.5 12 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yi=["svg",i,[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ji=["svg",i,[["path",{d:"M3 3v18h18"}],["path",{d:"M7 12v5h12V8l-5 5-4-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ki=["svg",i,[["path",{d:"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"}],["path",{d:"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"}],["path",{d:"M5 18v2"}],["path",{d:"M19 18v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qi=["svg",i,[["path",{d:"M15 5H9"}],["path",{d:"M15 9v3h4l-7 7-7-7h4V9z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ji=["svg",i,[["path",{d:"M15 6v6h4l-7 7-7-7h4V6h6z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $i=["svg",i,[["path",{d:"M19 15V9"}],["path",{d:"M15 15h-3v4l-7-7 7-7v4h3v6z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ts=["svg",i,[["path",{d:"M18 15h-6v4l-7-7 7-7v4h6v6z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const es=["svg",i,[["path",{d:"M5 9v6"}],["path",{d:"M9 9h3V5l7 7-7 7v-4H9V9z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=["svg",i,[["path",{d:"M6 9h6V5l7 7-7 7v-4H6V9z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=["svg",i,[["path",{d:"M9 19h6"}],["path",{d:"M9 15v-3H5l7-7 7 7h-4v3H9z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=["svg",i,[["path",{d:"M9 18v-6H5l7-7 7 7h-4v6H9z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const is=["svg",i,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["rect",{x:"15",y:"4",width:"4",height:"6",ry:"2"}],["path",{d:"M17 20v-6h-2"}],["path",{d:"M15 20h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss=["svg",i,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M17 10V4h-2"}],["path",{d:"M15 10h4"}],["rect",{x:"15",y:"14",width:"4",height:"6",ry:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F2=["svg",i,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M20 8h-5"}],["path",{d:"M15 10V6.5a2.5 2.5 0 0 1 5 0V10"}],["path",{d:"M15 14h5l-5 6h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hs=["svg",i,[["path",{d:"M19 3H5"}],["path",{d:"M12 21V7"}],["path",{d:"m6 15 6 6 6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const os=["svg",i,[["path",{d:"M17 7 7 17"}],["path",{d:"M17 17H7V7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=["svg",i,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M11 4h4"}],["path",{d:"M11 8h7"}],["path",{d:"M11 12h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=["svg",i,[["path",{d:"m7 7 10 10"}],["path",{d:"M17 7v10H7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ls=["svg",i,[["path",{d:"M12 2v14"}],["path",{d:"m19 9-7 7-7-7"}],["circle",{cx:"12",cy:"21",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=["svg",i,[["path",{d:"M12 17V3"}],["path",{d:"m6 11 6 6 6-6"}],["path",{d:"M19 21H5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=["svg",i,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"m21 8-4-4-4 4"}],["path",{d:"M17 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2=["svg",i,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M11 4h10"}],["path",{d:"M11 8h7"}],["path",{d:"M11 12h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k2=["svg",i,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 4v16"}],["path",{d:"M15 4h5l-5 6h5"}],["path",{d:"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"}],["path",{d:"M20 18h-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gs=["svg",i,[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=["svg",i,[["path",{d:"m9 6-6 6 6 6"}],["path",{d:"M3 12h14"}],["path",{d:"M21 19V5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=["svg",i,[["path",{d:"M8 3 4 7l4 4"}],["path",{d:"M4 7h16"}],["path",{d:"m16 21 4-4-4-4"}],["path",{d:"M20 17H4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=["svg",i,[["path",{d:"M3 19V5"}],["path",{d:"m13 6-6 6 6 6"}],["path",{d:"M7 12h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=["svg",i,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=["svg",i,[["path",{d:"M3 5v14"}],["path",{d:"M21 12H7"}],["path",{d:"m15 18 6-6-6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=["svg",i,[["path",{d:"m16 3 4 4-4 4"}],["path",{d:"M20 7H4"}],["path",{d:"m8 21-4-4 4-4"}],["path",{d:"M4 17h16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=["svg",i,[["path",{d:"M17 12H3"}],["path",{d:"m11 18 6-6-6-6"}],["path",{d:"M21 5v14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=["svg",i,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cs=["svg",i,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["rect",{x:"15",y:"4",width:"4",height:"6",ry:"2"}],["path",{d:"M17 20v-6h-2"}],["path",{d:"M15 20h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=["svg",i,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M17 10V4h-2"}],["path",{d:"M15 10h4"}],["rect",{x:"15",y:"14",width:"4",height:"6",ry:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U2=["svg",i,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M20 8h-5"}],["path",{d:"M15 10V6.5a2.5 2.5 0 0 1 5 0V10"}],["path",{d:"M15 14h5l-5 6h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Is=["svg",i,[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=["svg",i,[["path",{d:"m5 9 7-7 7 7"}],["path",{d:"M12 16V2"}],["circle",{cx:"12",cy:"21",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ss=["svg",i,[["path",{d:"m18 9-6-6-6 6"}],["path",{d:"M12 3v14"}],["path",{d:"M5 21h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ts=["svg",i,[["path",{d:"M7 17V7h10"}],["path",{d:"M17 17 7 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z2=["svg",i,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M11 12h4"}],["path",{d:"M11 16h7"}],["path",{d:"M11 20h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ns=["svg",i,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=["svg",i,[["path",{d:"M5 3h14"}],["path",{d:"m18 13-6-6-6 6"}],["path",{d:"M12 7v14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os=["svg",i,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M11 12h10"}],["path",{d:"M11 16h7"}],["path",{d:"M11 20h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G2=["svg",i,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M15 4h5l-5 6h5"}],["path",{d:"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"}],["path",{d:"M20 18h-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=["svg",i,[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=["svg",i,[["path",{d:"m4 6 3-3 3 3"}],["path",{d:"M7 17V3"}],["path",{d:"m14 6 3-3 3 3"}],["path",{d:"M17 17V3"}],["path",{d:"M4 21h16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls=["svg",i,[["path",{d:"M12 6v12"}],["path",{d:"M17.196 9 6.804 15"}],["path",{d:"m6.804 9 10.392 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=["svg",i,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=["svg",i,[["circle",{cx:"12",cy:"12",r:"1"}],["path",{d:"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"}],["path",{d:"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs=["svg",i,[["path",{d:"M2 10v3"}],["path",{d:"M6 6v11"}],["path",{d:"M10 3v18"}],["path",{d:"M14 8v7"}],["path",{d:"M18 5v13"}],["path",{d:"M22 10v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=["svg",i,[["path",{d:"M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=["svg",i,[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ks=["svg",i,[["path",{d:"m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"}],["path",{d:"M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W2=["svg",i,[["path",{d:"M4 4v16h16"}],["path",{d:"m4 20 7-7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=["svg",i,[["path",{d:"M9 12h.01"}],["path",{d:"M15 12h.01"}],["path",{d:"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"}],["path",{d:"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zs=["svg",i,[["path",{d:"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"}],["path",{d:"M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"}],["path",{d:"M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"}],["path",{d:"M8 10h8"}],["path",{d:"M8 18h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M12 7v10"}],["path",{d:"M15.4 10a4 4 0 1 0 0 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{d:"M12 18V6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xs=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M7 12h5"}],["path",{d:"M15 9.4a4 4 0 1 0 0 5.2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qs=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["line",{x1:"12",x2:"12.01",y1:"17",y2:"17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ys=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M8 8h8"}],["path",{d:"M8 12h8"}],["path",{d:"m13 17-5-1h1a4 4 0 0 0 0-8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"12",x2:"12",y1:"16",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"8",y2:"8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ks=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"m9 8 3 3v7"}],["path",{d:"m12 11 3-3"}],["path",{d:"M9 12h6"}],["path",{d:"M9 16h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"m15 9-6 6"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 15h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"12",x2:"12",y1:"8",y2:"16"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const th=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M8 12h4"}],["path",{d:"M10 16V9.5a2.5 2.5 0 0 1 5 0"}],["path",{d:"M8 16h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eh=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M9 16h5"}],["path",{d:"M9 12h5a2 2 0 1 0 0-4h-3v9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ah=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M11 17V8h4"}],["path",{d:"M11 12h3"}],["path",{d:"M9 16h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nh=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"15",x2:"9",y1:"9",y2:"15"}],["line",{x1:"9",x2:"15",y1:"9",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rh=["svg",i,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ih=["svg",i,[["path",{d:"M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"}],["path",{d:"M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"}],["rect",{width:"13",height:"8",x:"8",y:"6",rx:"1"}],["circle",{cx:"18",cy:"20",r:"2"}],["circle",{cx:"9",cy:"20",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sh=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m4.9 4.9 14.2 14.2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hh=["svg",i,[["path",{d:"M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"}],["path",{d:"M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oh=["svg",i,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M6 12h.01M18 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ch=["svg",i,[["line",{x1:"18",x2:"18",y1:"20",y2:"10"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dh=["svg",i,[["path",{d:"M3 3v18h18"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lh=["svg",i,[["path",{d:"M3 3v18h18"}],["path",{d:"M13 17V9"}],["path",{d:"M18 17V5"}],["path",{d:"M8 17v-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ph=["svg",i,[["path",{d:"M3 3v18h18"}],["rect",{width:"4",height:"7",x:"7",y:"10",rx:"1"}],["rect",{width:"4",height:"12",x:"15",y:"5",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uh=["svg",i,[["path",{d:"M3 3v18h18"}],["rect",{width:"12",height:"4",x:"7",y:"5",rx:"1"}],["rect",{width:"7",height:"4",x:"7",y:"13",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gh=["svg",i,[["path",{d:"M3 3v18h18"}],["path",{d:"M7 16h8"}],["path",{d:"M7 11h12"}],["path",{d:"M7 6h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fh=["svg",i,[["line",{x1:"12",x2:"12",y1:"20",y2:"10"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xh=["svg",i,[["path",{d:"M3 5v14"}],["path",{d:"M8 5v14"}],["path",{d:"M12 5v14"}],["path",{d:"M17 5v14"}],["path",{d:"M21 5v14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mh=["svg",i,[["path",{d:"M4 20h16"}],["path",{d:"m6 16 6-12 6 12"}],["path",{d:"M8 12h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vh=["svg",i,[["path",{d:"M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"}],["line",{x1:"10",x2:"8",y1:"5",y2:"7"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["line",{x1:"7",x2:"7",y1:"19",y2:"21"}],["line",{x1:"17",x2:"17",y1:"19",y2:"21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yh=["svg",i,[["path",{d:"M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"}],["path",{d:"m11 7-3 5h4l-3 5"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mh=["svg",i,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13"}],["line",{x1:"10",x2:"10",y1:"11",y2:"13"}],["line",{x1:"14",x2:"14",y1:"11",y2:"13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wh=["svg",i,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ah=["svg",i,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13"}],["line",{x1:"10",x2:"10",y1:"11",y2:"13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ch=["svg",i,[["path",{d:"M14 7h2a2 2 0 0 1 2 2v6c0 1-1 2-2 2h-2"}],["path",{d:"M6 7H4a2 2 0 0 0-2 2v6c0 1 1 2 2 2h2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"10",x2:"10",y1:"7",y2:"13"}],["line",{x1:"10",x2:"10",y1:"17",y2:"17.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eh=["svg",i,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ih=["svg",i,[["path",{d:"M4.5 3h15"}],["path",{d:"M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"}],["path",{d:"M6 14h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bh=["svg",i,[["path",{d:"M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1"}],["path",{d:"M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66"}],["path",{d:"M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sh=["svg",i,[["path",{d:"M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"}],["path",{d:"M5.341 10.62a4 4 0 1 0 5.279-5.28"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Th=["svg",i,[["path",{d:"M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"}],["path",{d:"M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"}],["path",{d:"M12 4v6"}],["path",{d:"M2 18h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nh=["svg",i,[["path",{d:"M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"}],["path",{d:"M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"}],["path",{d:"M3 18h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rh=["svg",i,[["path",{d:"M2 4v16"}],["path",{d:"M2 8h18a2 2 0 0 1 2 2v10"}],["path",{d:"M2 17h20"}],["path",{d:"M6 8v9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oh=["svg",i,[["circle",{cx:"12.5",cy:"8.5",r:"2.5"}],["path",{d:"M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"}],["path",{d:"m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dh=["svg",i,[["path",{d:"M13 13v5"}],["path",{d:"M17 11.47V8"}],["path",{d:"M17 11h1a3 3 0 0 1 2.745 4.211"}],["path",{d:"m2 2 20 20"}],["path",{d:"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"}],["path",{d:"M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268"}],["path",{d:"M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"}],["path",{d:"M9 14.6V18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _h=["svg",i,[["path",{d:"M17 11h1a3 3 0 0 1 0 6h-1"}],["path",{d:"M9 12v6"}],["path",{d:"M13 12v6"}],["path",{d:"M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"}],["path",{d:"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lh=["svg",i,[["path",{d:"M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["circle",{cx:"18",cy:"8",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bh=["svg",i,[["path",{d:"M18.8 4A6.3 8.7 0 0 1 20 9"}],["path",{d:"M9 9h.01"}],["circle",{cx:"9",cy:"9",r:"7"}],["rect",{width:"10",height:"6",x:"4",y:"16",rx:"2"}],["path",{d:"M14 19c3 0 4.6-1.6 4.6-1.6"}],["circle",{cx:"20",cy:"16",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ph=["svg",i,[["path",{d:"M18.4 12c.8 3.8 2.6 5 2.6 5H3s3-2 3-9c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"M15 8h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hh=["svg",i,[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fh=["svg",i,[["path",{d:"M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"M15 8h6"}],["path",{d:"M18 5v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vh=["svg",i,[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"M4 2C2.8 3.7 2 5.7 2 8"}],["path",{d:"M22 8c0-2.3-.8-4.3-2-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kh=["svg",i,[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X2=["svg",i,[["rect",{width:"13",height:"7",x:"3",y:"3",rx:"1"}],["path",{d:"m22 15-3-3 3-3"}],["rect",{width:"13",height:"7",x:"3",y:"14",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2=["svg",i,[["rect",{width:"13",height:"7",x:"8",y:"3",rx:"1"}],["path",{d:"m2 9 3 3-3 3"}],["rect",{width:"13",height:"7",x:"8",y:"14",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uh=["svg",i,[["rect",{width:"7",height:"13",x:"3",y:"3",rx:"1"}],["path",{d:"m9 22 3-3 3 3"}],["rect",{width:"7",height:"13",x:"14",y:"3",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zh=["svg",i,[["rect",{width:"7",height:"13",x:"3",y:"8",rx:"1"}],["path",{d:"m15 2-3 3-3-3"}],["rect",{width:"7",height:"13",x:"14",y:"8",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gh=["svg",i,[["circle",{cx:"18.5",cy:"17.5",r:"3.5"}],["circle",{cx:"5.5",cy:"17.5",r:"3.5"}],["circle",{cx:"15",cy:"5",r:"1"}],["path",{d:"M12 17.5V14l-3-3 4-3 2 3h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wh=["svg",i,[["rect",{x:"14",y:"14",width:"4",height:"6",rx:"2"}],["rect",{x:"6",y:"4",width:"4",height:"6",rx:"2"}],["path",{d:"M6 20h4"}],["path",{d:"M14 10h4"}],["path",{d:"M6 14h2v6"}],["path",{d:"M14 4h2v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zh=["svg",i,[["circle",{cx:"12",cy:"11.9",r:"2"}],["path",{d:"M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"}],["path",{d:"m8.9 10.1 1.4.8"}],["path",{d:"M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"}],["path",{d:"m15.1 10.1-1.4.8"}],["path",{d:"M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"}],["path",{d:"M12 13.9v1.6"}],["path",{d:"M13.5 5.4c-1-.2-2-.2-3 0"}],["path",{d:"M17 16.4c.7-.7 1.2-1.6 1.5-2.5"}],["path",{d:"M5.5 13.9c.3.9.8 1.8 1.5 2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xh=["svg",i,[["path",{d:"M16 7h.01"}],["path",{d:"M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"}],["path",{d:"m20 7 2 .5-2 .5"}],["path",{d:"M10 18v3"}],["path",{d:"M14 17.75V21"}],["path",{d:"M7 18a6 6 0 0 0 3.84-10.61"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qh=["svg",i,[["path",{d:"M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yh=["svg",i,[["circle",{cx:"9",cy:"9",r:"7"}],["circle",{cx:"15",cy:"15",r:"7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jh=["svg",i,[["path",{d:"M3 3h18"}],["path",{d:"M20 7H8"}],["path",{d:"M20 11H8"}],["path",{d:"M10 19h10"}],["path",{d:"M8 15h12"}],["path",{d:"M4 3v14"}],["circle",{cx:"4",cy:"19",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kh=["svg",i,[["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["path",{d:"M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qh=["svg",i,[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17"}],["line",{x1:"18",x2:"21",y1:"12",y2:"12"}],["line",{x1:"3",x2:"6",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jh=["svg",i,[["path",{d:"m17 17-5 5V12l-5 5"}],["path",{d:"m2 2 20 20"}],["path",{d:"M14.5 9.5 17 7l-5-5v4.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $h=["svg",i,[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17"}],["path",{d:"M20.83 14.83a4 4 0 0 0 0-5.66"}],["path",{d:"M18 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=["svg",i,[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=["svg",i,[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ao=["svg",i,[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}],["circle",{cx:"12",cy:"12",r:"4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=["svg",i,[["circle",{cx:"11",cy:"13",r:"9"}],["path",{d:"M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95"}],["path",{d:"m22 2-1.5 1.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ro=["svg",i,[["path",{d:"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"m8 13 4-7 4 7"}],["path",{d:"M9.1 11h5.7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const so=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M8 8v3"}],["path",{d:"M12 6v7"}],["path",{d:"M16 8v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"m9 9.5 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=["svg",i,[["path",{d:"M2 16V4a2 2 0 0 1 2-2h11"}],["path",{d:"M5 14H4a2 2 0 1 0 0 4h1"}],["path",{d:"M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y2=["svg",i,[["path",{d:"M20 22h-2"}],["path",{d:"M20 15v2h-2"}],["path",{d:"M4 19.5V15"}],["path",{d:"M20 8v3"}],["path",{d:"M18 2h2v2"}],["path",{d:"M4 11V9"}],["path",{d:"M12 2h2"}],["path",{d:"M12 22h2"}],["path",{d:"M12 17h2"}],["path",{d:"M8 22H6.5a2.5 2.5 0 0 1 0-5H8"}],["path",{d:"M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M12 13V7"}],["path",{d:"m9 10 3 3 3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"9",cy:"12",r:"1"}],["path",{d:"M8 12v-2a4 4 0 0 1 8 0v2"}],["circle",{cx:"15",cy:"12",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const po=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M16 8.2C16 7 15 6 13.8 6c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9C9 6 8 7 8 8.2c0 .6.3 1.2.7 1.6h0C10 11.1 12 13 12 13s2-1.9 3.3-3.1h0c.4-.4.7-1 .7-1.7z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"10",cy:"8",r:"2"}],["path",{d:"m20 13.7-2.1-2.1c-.8-.8-2-.8-2.8 0L9.7 17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const go=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H14"}],["path",{d:"M20 8v14H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"14",cy:"8",r:"2"}],["path",{d:"m20 2-4.5 4.5"}],["path",{d:"m19 3 1 1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10"}],["path",{d:"M20 15v7H6.5a2.5 2.5 0 0 1 0-5H20"}],["rect",{width:"8",height:"5",x:"12",y:"6",rx:"1"}],["path",{d:"M18 6V4a2 2 0 1 0-4 0v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["polyline",{points:"10 2 10 10 13 7 16 10 16 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M9 10h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vo=["svg",i,[["path",{d:"M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"}],["path",{d:"m16 12 2 2 4-4"}],["path",{d:"M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=["svg",i,[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}],["path",{d:"M6 8h2"}],["path",{d:"M6 12h2"}],["path",{d:"M16 8h2"}],["path",{d:"M16 12h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=["svg",i,[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M9 10h6"}],["path",{d:"M12 7v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ao=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M8 7h6"}],["path",{d:"M8 11h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M16 8V6H8v2"}],["path",{d:"M12 6v7"}],["path",{d:"M10 13h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2"}],["path",{d:"M18 2h2v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M12 13V7"}],["path",{d:"m9 10 3-3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Io=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M12 13V7"}],["path",{d:"m9 10 3-3 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bo=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M15 13a3 3 0 1 0-6 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"m14.5 7-5 5"}],["path",{d:"m9.5 7 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const To=["svg",i,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const No=["svg",i,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"}],["path",{d:"m9 10 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ro=["svg",i,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}],["line",{x1:"15",x2:"9",y1:"10",y2:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=["svg",i,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}],["line",{x1:"12",x2:"12",y1:"7",y2:"13"}],["line",{x1:"15",x2:"9",y1:"10",y2:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=["svg",i,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"}],["path",{d:"m14.5 7.5-5 5"}],["path",{d:"m9.5 7.5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _o=["svg",i,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lo=["svg",i,[["path",{d:"M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"}],["path",{d:"M8 8v1"}],["path",{d:"M12 8v1"}],["path",{d:"M16 8v1"}],["rect",{width:"20",height:"12",x:"2",y:"9",rx:"2"}],["circle",{cx:"8",cy:"15",r:"2"}],["circle",{cx:"16",cy:"15",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bo=["svg",i,[["path",{d:"M12 6V2H8"}],["path",{d:"m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"}],["path",{d:"M2 12h2"}],["path",{d:"M9 11v2"}],["path",{d:"M15 11v2"}],["path",{d:"M20 12h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Po=["svg",i,[["path",{d:"M13.67 8H18a2 2 0 0 1 2 2v4.33"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M22 22 2 2"}],["path",{d:"M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586"}],["path",{d:"M9 13v2"}],["path",{d:"M9.67 4H12v2.33"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ho=["svg",i,[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fo=["svg",i,[["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"M21 19a2 2 0 0 1-2 2"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M9 3h1"}],["path",{d:"M9 21h1"}],["path",{d:"M14 3h1"}],["path",{d:"M14 21h1"}],["path",{d:"M3 9v1"}],["path",{d:"M21 9v1"}],["path",{d:"M3 14v1"}],["path",{d:"M21 14v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vo=["svg",i,[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ko=["svg",i,[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j2=["svg",i,[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uo=["svg",i,[["path",{d:"M16 3h3v18h-3"}],["path",{d:"M8 21H5V3h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zo=["svg",i,[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Go=["svg",i,[["path",{d:"M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .164-.546c.028-.13.306-.13.335 0a3.2 3.2 0 0 0 .163.546 4 4 0 0 0 7.636-2.106 4 4 0 0 0 .556-6.588 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"m15.7 10.4-.9.4"}],["path",{d:"m9.2 13.2-.9.4"}],["path",{d:"m13.6 15.7-.4-.9"}],["path",{d:"m10.8 9.2-.4-.9"}],["path",{d:"m15.7 13.5-.9-.4"}],["path",{d:"m9.2 10.9-.9-.4"}],["path",{d:"m10.5 15.7.4-.9"}],["path",{d:"m13.1 9.2.4-.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wo=["svg",i,[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zo=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 9v6"}],["path",{d:"M16 15v6"}],["path",{d:"M16 3v6"}],["path",{d:"M3 15h18"}],["path",{d:"M3 9h18"}],["path",{d:"M8 15v6"}],["path",{d:"M8 3v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xo=["svg",i,[["path",{d:"M12 12h.01"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qo=["svg",i,[["path",{d:"M12 11v4"}],["path",{d:"M14 13h-4"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"}],["path",{d:"M18 6v14"}],["path",{d:"M6 6v14"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yo=["svg",i,[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jo=["svg",i,[["rect",{x:"8",y:"8",width:"8",height:"8",rx:"2"}],["path",{d:"M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"}],["path",{d:"M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ko=["svg",i,[["path",{d:"m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"}],["path",{d:"M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qo=["svg",i,[["path",{d:"M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2"}],["path",{d:"M14.12 3.88 16 2"}],["path",{d:"M22 13h-4v-2a4 4 0 0 0-4-4h-1.3"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4"}],["path",{d:"m2 2 20 20"}],["path",{d:"M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13"}],["path",{d:"M12 20v-8"}],["path",{d:"M6 13H2"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jo=["svg",i,[["path",{d:"M12.765 21.522a.5.5 0 0 1-.765-.424v-8.196a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"}],["path",{d:"M14.12 3.88 16 2"}],["path",{d:"M18 11a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v3a6.1 6.1 0 0 0 2 4.5"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4"}],["path",{d:"M6 13H2"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5"}],["path",{d:"m8 2 1.88 1.88"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=["svg",i,[["path",{d:"m8 2 1.88 1.88"}],["path",{d:"M14.12 3.88 16 2"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"}],["path",{d:"M12 20v-9"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5"}],["path",{d:"M6 13H2"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4"}],["path",{d:"M22 13h-4"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tc=["svg",i,[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"}],["path",{d:"M10 6h4"}],["path",{d:"M10 10h4"}],["path",{d:"M10 14h4"}],["path",{d:"M10 18h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ec=["svg",i,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2"}],["path",{d:"M9 22v-4h6v4"}],["path",{d:"M8 6h.01"}],["path",{d:"M16 6h.01"}],["path",{d:"M12 6h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 10h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M8 14h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ac=["svg",i,[["path",{d:"M4 6 2 7"}],["path",{d:"M10 6h4"}],["path",{d:"m22 7-2-1"}],["rect",{width:"16",height:"16",x:"4",y:"3",rx:"2"}],["path",{d:"M4 11h16"}],["path",{d:"M8 15h.01"}],["path",{d:"M16 15h.01"}],["path",{d:"M6 19v2"}],["path",{d:"M18 21v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nc=["svg",i,[["path",{d:"M8 6v6"}],["path",{d:"M15 6v6"}],["path",{d:"M2 12h19.6"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"}],["circle",{cx:"7",cy:"18",r:"2"}],["path",{d:"M9 18h5"}],["circle",{cx:"16",cy:"18",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rc=["svg",i,[["path",{d:"M10 3h.01"}],["path",{d:"M14 2h.01"}],["path",{d:"m2 9 20-5"}],["path",{d:"M12 12V6.5"}],["rect",{width:"16",height:"10",x:"4",y:"12",rx:"3"}],["path",{d:"M9 12v5"}],["path",{d:"M15 12v5"}],["path",{d:"M4 17h16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ic=["svg",i,[["path",{d:"M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"}],["path",{d:"M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"}],["path",{d:"M21 21v-2h-4"}],["path",{d:"M3 5h4V3"}],["path",{d:"M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sc=["svg",i,[["circle",{cx:"9",cy:"7",r:"2"}],["path",{d:"M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6"}],["path",{d:"M16 13H3"}],["path",{d:"M16 17H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hc=["svg",i,[["path",{d:"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"}],["path",{d:"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"}],["path",{d:"M2 21h20"}],["path",{d:"M7 8v3"}],["path",{d:"M12 8v3"}],["path",{d:"M17 8v3"}],["path",{d:"M7 4h0.01"}],["path",{d:"M12 4h0.01"}],["path",{d:"M17 4h0.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oc=["svg",i,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"m16 20 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lc=["svg",i,[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"}],["path",{d:"M16 2v4"}],["path",{d:"M8 2v4"}],["path",{d:"M3 10h5"}],["path",{d:"M17.5 17.5 16 16.3V14"}],["circle",{cx:"16",cy:"16",r:"6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"}],["path",{d:"M3 10h18"}],["path",{d:"M15 22v-4a2 2 0 0 1 2-2h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gc=["svg",i,[["path",{d:"M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"}],["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M10 16h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"M16 19h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mc=["svg",i,[["path",{d:"M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"}],["path",{d:"M21 15.5V6a2 2 0 0 0-2-2H9.5"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h7"}],["path",{d:"M21 10h-5.5"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M10 16h4"}],["path",{d:"M12 14v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"M16 19h6"}],["path",{d:"M19 16v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mc=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=["svg",i,[["path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5"}],["path",{d:"M16 2v4"}],["path",{d:"M8 2v4"}],["path",{d:"M3 10h18"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m22 22-1.5-1.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ac=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"m17 22 5-5"}],["path",{d:"m17 17 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cc=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m14 14-4 4"}],["path",{d:"m10 14 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ec=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ic=["svg",i,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16"}],["path",{d:"M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5"}],["path",{d:"M14.121 15.121A3 3 0 1 1 9.88 10.88"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bc=["svg",i,[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"}],["circle",{cx:"12",cy:"13",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sc=["svg",i,[["path",{d:"M9 5v4"}],["rect",{width:"4",height:"6",x:"7",y:"9",rx:"1"}],["path",{d:"M9 15v2"}],["path",{d:"M17 3v2"}],["rect",{width:"4",height:"8",x:"15",y:"5",rx:"1"}],["path",{d:"M17 13v3"}],["path",{d:"M3 3v18h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tc=["svg",i,[["path",{d:"M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z"}],["path",{d:"M17.75 7 15 2.1"}],["path",{d:"M10.9 4.8 13 9"}],["path",{d:"m7.9 9.7 2 4.4"}],["path",{d:"M4.9 14.7 7 18.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nc=["svg",i,[["path",{d:"m8.5 8.5-1 1a4.95 4.95 0 0 0 7 7l1-1"}],["path",{d:"M11.843 6.187A4.947 4.947 0 0 1 16.5 7.5a4.947 4.947 0 0 1 1.313 4.657"}],["path",{d:"M14 16.5V14"}],["path",{d:"M14 6.5v1.843"}],["path",{d:"M10 10v7.5"}],["path",{d:"m16 7 1-5 1.367.683A3 3 0 0 0 19.708 3H21v1.292a3 3 0 0 0 .317 1.341L22 7l-5 1"}],["path",{d:"m8 17-1 5-1.367-.683A3 3 0 0 0 4.292 21H3v-1.292a3 3 0 0 0-.317-1.341L2 17l5-1"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rc=["svg",i,[["path",{d:"m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z"}],["path",{d:"M14 6.5v10"}],["path",{d:"M10 7.5v10"}],["path",{d:"m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1"}],["path",{d:"m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oc=["svg",i,[["path",{d:"M12 22v-4"}],["path",{d:"M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dc=["svg",i,[["path",{d:"M10.5 5H19a2 2 0 0 1 2 2v8.5"}],["path",{d:"M17 11h-.5"}],["path",{d:"M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2"}],["path",{d:"m2 2 20 20"}],["path",{d:"M7 11h4"}],["path",{d:"M7 15h2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K2=["svg",i,[["rect",{width:"18",height:"14",x:"3",y:"5",rx:"2",ry:"2"}],["path",{d:"M7 15h4M15 15h2M7 11h2M13 11h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=["svg",i,[["path",{d:"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 14h.01"}],["rect",{width:"18",height:"8",x:"3",y:"10",rx:"2"}],["path",{d:"M5 18v2"}],["path",{d:"M19 18v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lc=["svg",i,[["path",{d:"M10 2h4"}],["path",{d:"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 14h.01"}],["rect",{width:"18",height:"8",x:"3",y:"10",rx:"2"}],["path",{d:"M5 18v2"}],["path",{d:"M19 18v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bc=["svg",i,[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"}],["circle",{cx:"7",cy:"17",r:"2"}],["path",{d:"M9 17h6"}],["circle",{cx:"17",cy:"17",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pc=["svg",i,[["rect",{width:"4",height:"4",x:"2",y:"9"}],["rect",{width:"4",height:"10",x:"10",y:"9"}],["path",{d:"M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2"}],["circle",{cx:"8",cy:"19",r:"2"}],["path",{d:"M10 19h12v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hc=["svg",i,[["path",{d:"M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"}],["path",{d:"M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z"}],["path",{d:"M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fc=["svg",i,[["circle",{cx:"7",cy:"12",r:"3"}],["path",{d:"M10 9v6"}],["circle",{cx:"17",cy:"12",r:"3"}],["path",{d:"M14 7v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vc=["svg",i,[["path",{d:"m3 15 4-8 4 8"}],["path",{d:"M4 13h6"}],["circle",{cx:"18",cy:"12",r:"3"}],["path",{d:"M21 9v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kc=["svg",i,[["path",{d:"m3 15 4-8 4 8"}],["path",{d:"M4 13h6"}],["path",{d:"M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uc=["svg",i,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["circle",{cx:"8",cy:"10",r:"2"}],["path",{d:"M8 12h8"}],["circle",{cx:"16",cy:"10",r:"2"}],["path",{d:"m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zc=["svg",i,[["path",{d:"M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"}],["path",{d:"M2 12a9 9 0 0 1 8 8"}],["path",{d:"M2 16a5 5 0 0 1 4 4"}],["line",{x1:"2",x2:"2.01",y1:"20",y2:"20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gc=["svg",i,[["path",{d:"M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"}],["path",{d:"M18 11V4H6v7"}],["path",{d:"M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4"}],["path",{d:"M22 11V9"}],["path",{d:"M2 11V9"}],["path",{d:"M6 4V2"}],["path",{d:"M18 4V2"}],["path",{d:"M10 4V2"}],["path",{d:"M14 4V2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wc=["svg",i,[["path",{d:"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"}],["path",{d:"M8 14v.5"}],["path",{d:"M16 14v.5"}],["path",{d:"M11.25 16.25h1.5L12 17l-.75-.75Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zc=["svg",i,[["path",{d:"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"}],["path",{d:"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"}],["path",{d:"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"}],["path",{d:"M2 21v-4"}],["path",{d:"M7 9h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xc=["svg",i,[["path",{d:"M18 6 7 17l-5-5"}],["path",{d:"m22 10-7.5 7.5L13 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qc=["svg",i,[["path",{d:"M20 6 9 17l-5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yc=["svg",i,[["path",{d:"M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"}],["path",{d:"M6 17h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jc=["svg",i,[["path",{d:"M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"}],["path",{d:"M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"}],["path",{d:"M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"}],["path",{d:"M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kc=["svg",i,[["path",{d:"m6 9 6 6 6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qc=["svg",i,[["path",{d:"m17 18-6-6 6-6"}],["path",{d:"M7 6v12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=["svg",i,[["path",{d:"m7 18 6-6-6-6"}],["path",{d:"M17 6v12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $c=["svg",i,[["path",{d:"m15 18-6-6 6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const td=["svg",i,[["path",{d:"m9 18 6-6-6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ed=["svg",i,[["path",{d:"m18 15-6-6-6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ad=["svg",i,[["path",{d:"m7 20 5-5 5 5"}],["path",{d:"m7 4 5 5 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nd=["svg",i,[["path",{d:"m7 6 5 5 5-5"}],["path",{d:"m7 13 5 5 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rd=["svg",i,[["path",{d:"m9 7-5 5 5 5"}],["path",{d:"m15 7 5 5-5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const id=["svg",i,[["path",{d:"m11 17-5-5 5-5"}],["path",{d:"m18 17-5-5 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sd=["svg",i,[["path",{d:"m20 17-5-5 5-5"}],["path",{d:"m4 17 5-5-5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hd=["svg",i,[["path",{d:"m6 17 5-5-5-5"}],["path",{d:"m13 17 5-5-5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const od=["svg",i,[["path",{d:"m7 15 5 5 5-5"}],["path",{d:"m7 9 5-5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cd=["svg",i,[["path",{d:"m17 11-5-5-5 5"}],["path",{d:"m17 18-5-5-5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"4"}],["line",{x1:"21.17",x2:"12",y1:"8",y2:"8"}],["line",{x1:"3.95",x2:"8.54",y1:"6.06",y2:"14"}],["line",{x1:"10.88",x2:"15.46",y1:"21.94",y2:"14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ld=["svg",i,[["path",{d:"m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"}],["path",{d:"M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"}],["path",{d:"M18 22V5l-6-3-6 3v17"}],["path",{d:"M12 7v5"}],["path",{d:"M10 9h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pd=["svg",i,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M12 12H2v4h14"}],["path",{d:"M22 12v4"}],["path",{d:"M18 12h-.5"}],["path",{d:"M7 12v4"}],["path",{d:"M18 8c0-2.5-2-2.5-2-5"}],["path",{d:"M22 8c0-2.5-2-2.5-2-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ud=["svg",i,[["path",{d:"M18 12H2v4h16"}],["path",{d:"M22 12v4"}],["path",{d:"M7 12v4"}],["path",{d:"M18 8c0-2.5-2-2.5-2-5"}],["path",{d:"M22 8c0-2.5-2-2.5-2-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q2=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J2=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 8v8"}],["path",{d:"m8 12 4 4 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $2=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 12H8"}],["path",{d:"m12 8-4 4 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=["svg",i,[["path",{d:"M2 12a10 10 0 1 1 10 10"}],["path",{d:"m2 22 10-10"}],["path",{d:"M8 22H2v-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=["svg",i,[["path",{d:"M12 22a10 10 0 1 1 10-10"}],["path",{d:"M22 22 12 12"}],["path",{d:"M22 16v6h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=["svg",i,[["path",{d:"M2 8V2h6"}],["path",{d:"m2 2 10 10"}],["path",{d:"M12 2A10 10 0 1 1 2 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=["svg",i,[["path",{d:"M22 12A10 10 0 1 1 12 2"}],["path",{d:"M22 2 12 12"}],["path",{d:"M16 2h6v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"m12 16 4-4-4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 12-4-4-4 4"}],["path",{d:"M12 16V8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=["svg",i,[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}],["path",{d:"m9 11 3 3L22 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 10-4 4-4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m14 16-4-4 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m10 8 4 4-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m8 14 4-4 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gd=["svg",i,[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=["svg",i,[["line",{x1:"8",x2:"16",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"16",y2:"16"}],["line",{x1:"12",x2:"12",y1:"8",y2:"8"}],["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{d:"M12 18V6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=["svg",i,[["path",{d:"M10.1 2.18a9.93 9.93 0 0 1 3.8 0"}],["path",{d:"M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7"}],["path",{d:"M21.82 10.1a9.93 9.93 0 0 1 0 3.8"}],["path",{d:"M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69"}],["path",{d:"M13.9 21.82a9.94 9.94 0 0 1-3.8 0"}],["path",{d:"M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7"}],["path",{d:"M2.18 13.9a9.93 9.93 0 0 1 0-3.8"}],["path",{d:"M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69"}],["circle",{cx:"12",cy:"12",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Md=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M17 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M7 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yd=["svg",i,[["path",{d:"M7 10h10"}],["path",{d:"M7 14h10"}],["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const md=["svg",i,[["path",{d:"M12 2a10 10 0 0 1 7.38 16.75"}],["path",{d:"M12 8v8"}],["path",{d:"M16 12H8"}],["path",{d:"M2.5 8.875a10 10 0 0 0-.5 3"}],["path",{d:"M2.83 16a10 10 0 0 0 2.43 3.4"}],["path",{d:"M4.636 5.235a10 10 0 0 1 .891-.857"}],["path",{d:"M8.644 21.42a10 10 0 0 0 7.631-.38"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0=["svg",i,[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M13.4 10.6 19 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=["svg",i,[["path",{d:"m2 2 20 20"}],["path",{d:"M8.35 2.69A10 10 0 0 1 21.3 15.65"}],["path",{d:"M19.08 19.08A10 10 0 1 1 4.92 4.92"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m5 5 14 14"}],["path",{d:"M13 13a3 3 0 1 0 0-6H9v2"}],["path",{d:"M9 17v-2.34"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9 17V7h4a3 3 0 0 1 0 6H9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 15h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polygon",{points:"10 8 16 12 10 16 10 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 12V7"}],["path",{d:"M16 9a5 5 0 1 1-8 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M22 2 2 22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ad=["svg",i,[["line",{x1:"9",x2:"15",y1:"15",y2:"9"}],["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["rect",{width:"6",height:"6",x:"9",y:"9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I0=["svg",i,[["path",{d:"M18 20a6 6 0 0 0-12 0"}],["circle",{cx:"12",cy:"10",r:"4"}],["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S0=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ed=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M11 9h4a2 2 0 0 0 2-2V3"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"M7 21v-4a2 2 0 0 1 2-2h4"}],["circle",{cx:"15",cy:"15",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Id=["svg",i,[["path",{d:"M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"}],["path",{d:"M19.65 15.66A8 8 0 0 1 8.35 4.34"}],["path",{d:"m14 10-5.5 5.5"}],["path",{d:"M14 17.85V10H6.15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd=["svg",i,[["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"}],["path",{d:"m6.2 5.3 3.1 3.9"}],["path",{d:"m12.4 3.4 3.1 4"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sd=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"m9 14 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Td=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v4"}],["path",{d:"M21 14H11"}],["path",{d:"m15 10-4 4 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nd=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M12 11h4"}],["path",{d:"M12 16h4"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 16h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rd=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M9 14h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Od=["svg",i,[["path",{d:"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"}],["path",{d:"m17 10 4 4-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T0=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5"}],["path",{d:"M16 4h2a2 2 0 0 1 1.73 1"}],["path",{d:"M8 18h1"}],["path",{d:"M18.4 9.6a2 2 0 0 1 3 3L17 17l-4 1 1-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N0=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1"}],["path",{d:"M10.4 12.6a2 2 0 0 1 3 3L8 21l-4 1 1-4Z"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"}],["path",{d:"M4 13.5V6a2 2 0 0 1 2-2h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dd=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M9 14h6"}],["path",{d:"M12 17v-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _d=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M9 12v-1h6v1"}],["path",{d:"M11 17h2"}],["path",{d:"M12 11v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ld=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"m15 11-6 6"}],["path",{d:"m9 11 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=["svg",i,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 14.5 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 8 10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 9.5 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ud=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16.5 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 14.5 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 12 16.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 9.5 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 8 14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 7.5 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yd=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=["svg",i,[["circle",{cx:"12",cy:"17",r:"3"}],["path",{d:"M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2"}],["path",{d:"m15.7 18.4-.9-.3"}],["path",{d:"m9.2 15.9-.9-.3"}],["path",{d:"m10.6 20.7.3-.9"}],["path",{d:"m13.1 14.2.3-.9"}],["path",{d:"m13.6 20.7-.4-1"}],["path",{d:"m10.8 14.3-.4-1"}],["path",{d:"m8.3 18.6 1-.4"}],["path",{d:"m14.7 15.8 1-.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R0=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M12 12v9"}],["path",{d:"m8 17 4 4 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M8 19v1"}],["path",{d:"M8 14v1"}],["path",{d:"M16 19v1"}],["path",{d:"M16 14v1"}],["path",{d:"M12 21v1"}],["path",{d:"M12 16v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qd=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 17H7"}],["path",{d:"M17 21H9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jd=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 14v2"}],["path",{d:"M8 14v2"}],["path",{d:"M16 20h.01"}],["path",{d:"M8 20h.01"}],["path",{d:"M12 16v2"}],["path",{d:"M12 22h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d=["svg",i,[["path",{d:"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"}],["path",{d:"m13 12-3 5h4l-3 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tl=["svg",i,[["path",{d:"M10.083 9A6.002 6.002 0 0 1 16 4a4.243 4.243 0 0 0 6 6c0 2.22-1.206 4.16-3 5.197"}],["path",{d:"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"}],["path",{d:"M11 20v2"}],["path",{d:"M7 19v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const el=["svg",i,[["path",{d:"M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z"}],["path",{d:"M10.1 9A6 6 0 0 1 16 4a4.24 4.24 0 0 0 6 6 6 6 0 0 1-3 5.197"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const al=["svg",i,[["path",{d:"m2 2 20 20"}],["path",{d:"M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193"}],["path",{d:"M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nl=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"m9.2 22 3-7"}],["path",{d:"m9 13-3 7"}],["path",{d:"m17 13-3 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rl=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 14v6"}],["path",{d:"M8 14v6"}],["path",{d:"M12 16v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const il=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M8 15h.01"}],["path",{d:"M8 19h.01"}],["path",{d:"M12 17h.01"}],["path",{d:"M12 21h.01"}],["path",{d:"M16 15h.01"}],["path",{d:"M16 19h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sl=["svg",i,[["path",{d:"M12 2v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"M20 12h2"}],["path",{d:"m19.07 4.93-1.41 1.41"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128"}],["path",{d:"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"}],["path",{d:"M11 20v2"}],["path",{d:"M7 19v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hl=["svg",i,[["path",{d:"M12 2v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"M20 12h2"}],["path",{d:"m19.07 4.93-1.41 1.41"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128"}],["path",{d:"M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O0=["svg",i,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M12 12v9"}],["path",{d:"m16 16-4-4-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ol=["svg",i,[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cl=["svg",i,[["path",{d:"M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}],["path",{d:"M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dl=["svg",i,[["path",{d:"M16.17 7.83 2 22"}],["path",{d:"M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"}],["path",{d:"m7.83 7.83 8.34 8.34"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ll=["svg",i,[["path",{d:"M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z"}],["path",{d:"M12 17.66L12 22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D0=["svg",i,[["path",{d:"m18 16 4-4-4-4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"m14.5 4-5 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pl=["svg",i,[["polyline",{points:"16 18 22 12 16 6"}],["polyline",{points:"8 6 2 12 8 18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ul=["svg",i,[["polygon",{points:"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"}],["line",{x1:"12",x2:"12",y1:"22",y2:"15.5"}],["polyline",{points:"22 8.5 12 15.5 2 8.5"}],["polyline",{points:"2 15.5 12 8.5 22 15.5"}],["line",{x1:"12",x2:"12",y1:"2",y2:"8.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gl=["svg",i,[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}],["polyline",{points:"7.5 4.21 12 6.81 16.5 4.21"}],["polyline",{points:"7.5 19.79 7.5 14.6 3 12"}],["polyline",{points:"21 12 16.5 14.6 16.5 19.79"}],["polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}],["line",{x1:"12",x2:"12",y1:"22.08",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fl=["svg",i,[["path",{d:"M10 2v2"}],["path",{d:"M14 2v2"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"}],["path",{d:"M6 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xl=["svg",i,[["path",{d:"M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"}],["path",{d:"M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"}],["path",{d:"M12 2v2"}],["path",{d:"M12 22v-2"}],["path",{d:"m17 20.66-1-1.73"}],["path",{d:"M11 10.27 7 3.34"}],["path",{d:"m20.66 17-1.73-1"}],["path",{d:"m3.34 7 1.73 1"}],["path",{d:"M14 12h8"}],["path",{d:"M2 12h2"}],["path",{d:"m20.66 7-1.73 1"}],["path",{d:"m3.34 17 1.73-1"}],["path",{d:"m17 3.34-1 1.73"}],["path",{d:"m11 13.73-4 6.93"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ml=["svg",i,[["circle",{cx:"8",cy:"8",r:"6"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18"}],["path",{d:"M7 6h1v4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _0=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L0=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"M15 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vl=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7.5 3v18"}],["path",{d:"M12 3v18"}],["path",{d:"M16.5 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yl=["svg",i,[["rect",{width:"8",height:"8",x:"2",y:"2",rx:"2"}],["path",{d:"M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}],["path",{d:"M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}],["path",{d:"M10 18H5c-1.7 0-3-1.3-3-3v-1"}],["polyline",{points:"7 21 10 18 7 15"}],["rect",{width:"8",height:"8",x:"14",y:"14",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml=["svg",i,[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wl=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polygon",{points:"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Al=["svg",i,[["path",{d:"M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"}],["path",{d:"m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"}],["path",{d:"M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"}],["path",{d:"m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cl=["svg",i,[["rect",{width:"14",height:"8",x:"5",y:"2",rx:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6 18h2"}],["path",{d:"M12 18h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const El=["svg",i,[["path",{d:"M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z"}],["path",{d:"M20 16a8 8 0 1 0-16 0"}],["path",{d:"M12 4v4"}],["path",{d:"M10 4h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Il=["svg",i,[["path",{d:"m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98"}],["ellipse",{cx:"12",cy:"19",rx:"9",ry:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=["svg",i,[["rect",{x:"2",y:"6",width:"20",height:"8",rx:"1"}],["path",{d:"M17 14v7"}],["path",{d:"M7 14v7"}],["path",{d:"M17 3v3"}],["path",{d:"M7 3v3"}],["path",{d:"M10 14 2.3 6.3"}],["path",{d:"m14 6 7.7 7.7"}],["path",{d:"m8 6 8 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B0=["svg",i,[["path",{d:"M16 18a4 4 0 0 0-8 0"}],["circle",{cx:"12",cy:"11",r:"3"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["line",{x1:"8",x2:"8",y1:"2",y2:"4"}],["line",{x1:"16",x2:"16",y1:"2",y2:"4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sl=["svg",i,[["path",{d:"M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["circle",{cx:"12",cy:"10",r:"2"}],["line",{x1:"8",x2:"8",y1:"2",y2:"4"}],["line",{x1:"16",x2:"16",y1:"2",y2:"4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tl=["svg",i,[["path",{d:"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"}],["path",{d:"M10 21.9V14L2.1 9.1"}],["path",{d:"m10 14 11.9-6.9"}],["path",{d:"M14 19.8v-8.1"}],["path",{d:"M18 17.5V9.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nl=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rl=["svg",i,[["path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"}],["path",{d:"M8.5 8.5v.01"}],["path",{d:"M16 15.5v.01"}],["path",{d:"M12 12v.01"}],["path",{d:"M11 17v.01"}],["path",{d:"M7 14v.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ol=["svg",i,[["path",{d:"M2 12h20"}],["path",{d:"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"}],["path",{d:"m4 8 16-4"}],["path",{d:"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dl=["svg",i,[["path",{d:"m12 15 2 2 4-4"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _l=["svg",i,[["line",{x1:"12",x2:"18",y1:"15",y2:"15"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ll=["svg",i,[["line",{x1:"15",x2:"15",y1:"12",y2:"18"}],["line",{x1:"12",x2:"18",y1:"15",y2:"15"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bl=["svg",i,[["line",{x1:"12",x2:"18",y1:"18",y2:"12"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pl=["svg",i,[["line",{x1:"12",x2:"18",y1:"12",y2:"18"}],["line",{x1:"12",x2:"18",y1:"18",y2:"12"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hl=["svg",i,[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fl=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.17 14.83a4 4 0 1 0 0-5.66"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vl=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M14.83 14.83a4 4 0 1 1 0-5.66"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kl=["svg",i,[["polyline",{points:"9 10 4 15 9 20"}],["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ul=["svg",i,[["polyline",{points:"15 10 20 15 15 20"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zl=["svg",i,[["polyline",{points:"14 15 9 20 4 15"}],["path",{d:"M20 4h-7a4 4 0 0 0-4 4v12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gl=["svg",i,[["polyline",{points:"14 9 9 4 4 9"}],["path",{d:"M20 20h-7a4 4 0 0 1-4-4V4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wl=["svg",i,[["polyline",{points:"10 15 15 20 20 15"}],["path",{d:"M4 4h7a4 4 0 0 1 4 4v12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zl=["svg",i,[["polyline",{points:"10 9 15 4 20 9"}],["path",{d:"M4 20h7a4 4 0 0 0 4-4V4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xl=["svg",i,[["polyline",{points:"9 14 4 9 9 4"}],["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ql=["svg",i,[["polyline",{points:"15 14 20 9 15 4"}],["path",{d:"M4 20v-7a4 4 0 0 1 4-4h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yl=["svg",i,[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1"}],["path",{d:"M15 2v2"}],["path",{d:"M15 20v2"}],["path",{d:"M2 15h2"}],["path",{d:"M2 9h2"}],["path",{d:"M20 15h2"}],["path",{d:"M20 9h2"}],["path",{d:"M9 2v2"}],["path",{d:"M9 20v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jl=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"}],["path",{d:"M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kl=["svg",i,[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ql=["svg",i,[["path",{d:"m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"}],["path",{d:"m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"}],["path",{d:"M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"}],["path",{d:"m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"}],["path",{d:"M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jl=["svg",i,[["path",{d:"M6 2v14a2 2 0 0 0 2 2h14"}],["path",{d:"M18 22V8a2 2 0 0 0-2-2H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $l=["svg",i,[["path",{d:"M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t4=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e4=["svg",i,[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"}],["path",{d:"M5 21h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a4=["svg",i,[["path",{d:"m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"}],["path",{d:"M10 22v-8L2.25 9.15"}],["path",{d:"m10 14 11.77-6.87"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n4=["svg",i,[["path",{d:"m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"}],["path",{d:"M5 8h14"}],["path",{d:"M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}],["path",{d:"m12 8 1-6h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r4=["svg",i,[["circle",{cx:"12",cy:"12",r:"8"}],["line",{x1:"3",x2:"6",y1:"3",y2:"6"}],["line",{x1:"21",x2:"18",y1:"3",y2:"6"}],["line",{x1:"3",x2:"6",y1:"21",y2:"18"}],["line",{x1:"21",x2:"18",y1:"21",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i4=["svg",i,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5v14a9 3 0 0 0 18 0V5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s4=["svg",i,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 12a9 3 0 0 0 5 2.69"}],["path",{d:"M21 9.3V5"}],["path",{d:"M3 5v14a9 3 0 0 0 6.47 2.88"}],["path",{d:"M12 12v4h4"}],["path",{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h4=["svg",i,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 15 21.84"}],["path",{d:"M21 5V8"}],["path",{d:"M21 12L18 17H22L19 22"}],["path",{d:"M3 12A9 3 0 0 0 14.59 14.87"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o4=["svg",i,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c4=["svg",i,[["path",{d:"M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"}],["line",{x1:"18",x2:"12",y1:"9",y2:"15"}],["line",{x1:"12",x2:"18",y1:"9",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d4=["svg",i,[["circle",{cx:"12",cy:"4",r:"2"}],["path",{d:"M10.2 3.2C5.5 4 2 8.1 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4 0c0-4.9-3.5-9-8.2-9.8"}],["path",{d:"M3.2 14.8a9 9 0 0 0 17.6 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l4=["svg",i,[["circle",{cx:"19",cy:"19",r:"2"}],["circle",{cx:"5",cy:"5",r:"2"}],["path",{d:"M6.48 3.66a10 10 0 0 1 13.86 13.86"}],["path",{d:"m6.41 6.41 11.18 11.18"}],["path",{d:"M3.66 6.48a10 10 0 0 0 13.86 13.86"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p4=["svg",i,[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"}],["path",{d:"M8 12h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P0=["svg",i,[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"}],["path",{d:"M9.2 9.2h.01"}],["path",{d:"m14.5 9.5-5 5"}],["path",{d:"M14.7 14.8h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u4=["svg",i,[["path",{d:"M12 8v8"}],["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"}],["path",{d:"M8 12h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g4=["svg",i,[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f4=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M12 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x4=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M15 9h.01"}],["path",{d:"M9 15h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M4=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M8 16h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v4=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M8 8h.01"}],["path",{d:"M8 16h.01"}],["path",{d:"M16 16h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y4=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M8 8h.01"}],["path",{d:"M8 16h.01"}],["path",{d:"M16 16h.01"}],["path",{d:"M12 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m4=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M16 16h.01"}],["path",{d:"M8 8h.01"}],["path",{d:"M8 12h.01"}],["path",{d:"M8 16h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w4=["svg",i,[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 14h.01"}],["path",{d:"M15 6h.01"}],["path",{d:"M18 9h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A4=["svg",i,[["path",{d:"M12 3v14"}],["path",{d:"M5 10h14"}],["path",{d:"M5 21h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C4=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E4=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M6 12c0-1.7.7-3.2 1.8-4.2"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M18 12c0 1.7-.7 3.2-1.8 4.2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I4=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"12",cy:"12",r:"5"}],["path",{d:"M12 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b4=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S4=["svg",i,[["circle",{cx:"12",cy:"6",r:"1"}],["line",{x1:"5",x2:"19",y1:"12",y2:"12"}],["circle",{cx:"12",cy:"18",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T4=["svg",i,[["path",{d:"M15 2c-1.35 1.5-2.092 3-2.5 4.5M9 22c1.35-1.5 2.092-3 2.5-4.5"}],["path",{d:"M2 15c3.333-3 6.667-3 10-3m10-3c-1.5 1.35-3 2.092-4.5 2.5"}],["path",{d:"m17 6-2.5-2.5"}],["path",{d:"m14 8-1.5-1.5"}],["path",{d:"m7 18 2.5 2.5"}],["path",{d:"m3.5 14.5.5.5"}],["path",{d:"m20 9 .5.5"}],["path",{d:"m6.5 12.5 1 1"}],["path",{d:"m16.5 10.5 1 1"}],["path",{d:"m10 16 1.5 1.5"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N4=["svg",i,[["path",{d:"M2 15c6.667-6 13.333 0 20-6"}],["path",{d:"M9 22c1.798-1.998 2.518-3.995 2.807-5.993"}],["path",{d:"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"}],["path",{d:"m17 6-2.5-2.5"}],["path",{d:"m14 8-1-1"}],["path",{d:"m7 18 2.5 2.5"}],["path",{d:"m3.5 14.5.5.5"}],["path",{d:"m20 9 .5.5"}],["path",{d:"m6.5 12.5 1 1"}],["path",{d:"m16.5 10.5 1 1"}],["path",{d:"m10 16 1.5 1.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R4=["svg",i,[["path",{d:"M2 8h20"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M6 16h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O4=["svg",i,[["path",{d:"M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"}],["path",{d:"M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"}],["path",{d:"M8 14v.5"}],["path",{d:"M16 14v.5"}],["path",{d:"M11.25 16.25h1.5L12 17l-.75-.75Z"}],["path",{d:"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D4=["svg",i,[["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _4=["svg",i,[["path",{d:"M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"}],["circle",{cx:"12",cy:"12",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L4=["svg",i,[["path",{d:"M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"}],["path",{d:"M2 20h20"}],["path",{d:"M14 12v.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B4=["svg",i,[["path",{d:"M13 4h3a2 2 0 0 1 2 2v14"}],["path",{d:"M2 20h3"}],["path",{d:"M13 20h9"}],["path",{d:"M10 12v.01"}],["path",{d:"M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P4=["svg",i,[["circle",{cx:"12.1",cy:"12.1",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H4=["svg",i,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F4=["svg",i,[["circle",{cx:"12",cy:"5",r:"2"}],["path",{d:"m3 21 8.02-14.26"}],["path",{d:"m12.99 6.74 1.93 3.44"}],["path",{d:"M19 12c-3.87 4-10.13 4-14 0"}],["path",{d:"m21 21-2.16-3.84"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V4=["svg",i,[["path",{d:"M10 11h.01"}],["path",{d:"M14 6h.01"}],["path",{d:"M18 6h.01"}],["path",{d:"M6.5 13.1h.01"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k4=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"}],["path",{d:"M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"}],["path",{d:"M8.56 2.75c4.37 6 6 9.42 8 17.72"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U4=["svg",i,[["path",{d:"M14 9c0 .6-.4 1-1 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9c.6 0 1 .4 1 1Z"}],["path",{d:"M18 6h4"}],["path",{d:"M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3"}],["path",{d:"m5 10-2 8"}],["path",{d:"M12 10v3c0 .6-.4 1-1 1H8"}],["path",{d:"m7 18 2-8"}],["path",{d:"M5 22c-1.7 0-3-1.3-3-3 0-.6.4-1 1-1h7c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z4=["svg",i,[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G4=["svg",i,[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W4=["svg",i,[["path",{d:"m2 2 8 8"}],["path",{d:"m22 2-8 8"}],["ellipse",{cx:"12",cy:"9",rx:"10",ry:"5"}],["path",{d:"M7 13.4v7.9"}],["path",{d:"M12 14v8"}],["path",{d:"M17 13.4v7.9"}],["path",{d:"M2 9v8a10 5 0 0 0 20 0V9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z4=["svg",i,[["path",{d:"M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23"}],["path",{d:"m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X4=["svg",i,[["path",{d:"M14.4 14.4 9.6 9.6"}],["path",{d:"M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"}],["path",{d:"m21.5 21.5-1.4-1.4"}],["path",{d:"M3.9 3.9 2.5 2.5"}],["path",{d:"M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q4=["svg",i,[["path",{d:"M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46"}],["path",{d:"M6 8.5c0-.75.13-1.47.36-2.14"}],["path",{d:"M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76"}],["path",{d:"M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y4=["svg",i,[["path",{d:"M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"}],["path",{d:"M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j4=["svg",i,[["path",{d:"M7 3.34V5a3 3 0 0 0 3 3"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],["path",{d:"M12 2a10 10 0 1 0 9.54 13"}],["path",{d:"M20 6V4a2 2 0 1 0-4 0v2"}],["rect",{width:"8",height:"5",x:"14",y:"6",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H0=["svg",i,[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K4=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a7 7 0 1 0 10 10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q4=["svg",i,[["circle",{cx:"11.5",cy:"12.5",r:"3.5"}],["path",{d:"M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J4=["svg",i,[["path",{d:"M6.399 6.399C5.362 8.157 4.65 10.189 4.5 12c-.37 4.43 1.27 9.95 7.5 10 3.256-.026 5.259-1.547 6.375-3.625"}],["path",{d:"M19.532 13.875A14.07 14.07 0 0 0 19.5 12c-.36-4.34-3.95-9.96-7.5-10-1.04.012-2.082.502-3.046 1.297"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $4=["svg",i,[["path",{d:"M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F0=["svg",i,[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V0=["svg",i,[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t3=["svg",i,[["line",{x1:"5",x2:"19",y1:"9",y2:"9"}],["line",{x1:"5",x2:"19",y1:"15",y2:"15"}],["line",{x1:"19",x2:"5",y1:"5",y2:"19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e3=["svg",i,[["line",{x1:"5",x2:"19",y1:"9",y2:"9"}],["line",{x1:"5",x2:"19",y1:"15",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a3=["svg",i,[["path",{d:"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"}],["path",{d:"M22 21H7"}],["path",{d:"m5 11 9 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n3=["svg",i,[["path",{d:"M4 10h12"}],["path",{d:"M4 14h9"}],["path",{d:"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r3=["svg",i,[["path",{d:"m21 21-6-6m6 6v-4.8m0 4.8h-4.8"}],["path",{d:"M3 16.2V21m0 0h4.8M3 21l6-6"}],["path",{d:"M21 7.8V3m0 0h-4.8M21 3l-6 6"}],["path",{d:"M3 7.8V3m0 0h4.8M3 3l6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i3=["svg",i,[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s3=["svg",i,[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h3=["svg",i,[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}],["circle",{cx:"12",cy:"12",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o3=["svg",i,[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c3=["svg",i,[["path",{d:"M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M17 18h1"}],["path",{d:"M12 18h1"}],["path",{d:"M7 18h1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d3=["svg",i,[["path",{d:"M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"}],["path",{d:"M12 12v.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l3=["svg",i,[["polygon",{points:"13 19 22 12 13 5 13 19"}],["polygon",{points:"2 19 11 12 2 5 2 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p3=["svg",i,[["path",{d:"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"}],["path",{d:"M16 8 2 22"}],["path",{d:"M17.5 15H9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u3=["svg",i,[["path",{d:"M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}],["path",{d:"M6 8h4"}],["path",{d:"M6 18h4"}],["path",{d:"m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}],["path",{d:"M14 8h4"}],["path",{d:"M14 18h4"}],["path",{d:"m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g3=["svg",i,[["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M12 2v4"}],["path",{d:"m6.8 15-3.5 2"}],["path",{d:"m20.7 7-3.5 2"}],["path",{d:"M6.8 9 3.3 7"}],["path",{d:"m20.7 17-3.5-2"}],["path",{d:"m9 22 3-8 3 8"}],["path",{d:"M8 22h8"}],["path",{d:"M18 18.7a9 9 0 1 0-12 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f3=["svg",i,[["path",{d:"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"}],["path",{d:"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"}],["path",{d:"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"}],["path",{d:"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"}],["path",{d:"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x3=["svg",i,[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"10",cy:"20",r:"2"}],["path",{d:"M10 7V6"}],["path",{d:"M10 12v-1"}],["path",{d:"M10 18v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"3",cy:"17",r:"1"}],["path",{d:"M2 17v-3a4 4 0 0 1 8 0v3"}],["circle",{cx:"9",cy:"17",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v3=["svg",i,[["path",{d:"M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k0=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m8 18 4-4"}],["path",{d:"M8 10v8h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m14 12.5 1 5.5-3-1-3 1 1-5.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m3=["svg",i,[["path",{d:"M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}],["path",{d:"M7 16.5 8 22l-3-1-3 1 1-5.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 18v-1"}],["path",{d:"M12 18v-6"}],["path",{d:"M16 18v-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 18v-2"}],["path",{d:"M12 18v-4"}],["path",{d:"M16 18v-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C3=["svg",i,[["path",{d:"M14.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M3 13.1a2 2 0 0 0-1 1.76v3.24a2 2 0 0 0 .97 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01Z"}],["path",{d:"M7 17v5"}],["path",{d:"M11.7 14.2 7 17l-4.7-2.8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m3 15 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m9 15 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b3=["svg",i,[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"8",cy:"16",r:"6"}],["path",{d:"M9.5 17.5 8 16.25V14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m5 12-3 3 3 3"}],["path",{d:"m9 18 3-3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T3=["svg",i,[["path",{d:"M10 12.5 8 15l2 2.5"}],["path",{d:"m14 12.5 2 2.5-2 2.5"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U0=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"6",cy:"14",r:"3"}],["path",{d:"M6 10v1"}],["path",{d:"M6 17v1"}],["path",{d:"M10 14H9"}],["path",{d:"M3 14H2"}],["path",{d:"m9 11-.88.88"}],["path",{d:"M3.88 16.12 3 17"}],["path",{d:"m9 17-.88-.88"}],["path",{d:"M3.88 11.88 3 11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M9 10h6"}],["path",{d:"M12 13V7"}],["path",{d:"M9 17h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["rect",{width:"4",height:"6",x:"2",y:"12",rx:"2"}],["path",{d:"M10 12h2v6"}],["path",{d:"M10 18h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M12 18v-6"}],["path",{d:"m9 15 3 3 3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10.29 10.7a2.43 2.43 0 0 0-2.66-.52c-.29.12-.56.3-.78.53l-.35.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L6.5 18l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"10",cy:"12",r:"2"}],["path",{d:"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M2 15h10"}],["path",{d:"m9 18 3-3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v6"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"4",cy:"16",r:"2"}],["path",{d:"m10 10-4.5 4.5"}],["path",{d:"m9 11 1 1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["circle",{cx:"10",cy:"16",r:"2"}],["path",{d:"m16 10-4.5 4.5"}],["path",{d:"m15 11 1 1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m16 13-3.5 3.5-2-2L8 17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["rect",{width:"8",height:"5",x:"2",y:"13",rx:"1"}],["path",{d:"M8 13v-2a2 2 0 1 0-4 0v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["rect",{width:"8",height:"6",x:"8",y:"12",rx:"1"}],["path",{d:"M10 12v-2a2 2 0 1 1 4 0v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M3 15h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M9 15h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W3=["svg",i,[["circle",{cx:"14",cy:"16",r:"2"}],["circle",{cx:"6",cy:"18",r:"2"}],["path",{d:"M4 12.4V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-7.5"}],["path",{d:"M8 18v-7.7L16 9v7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z3=["svg",i,[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2"}],["path",{d:"M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6"}],["path",{d:"m5 11-3 3"}],["path",{d:"m5 17-3-3h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z0=["svg",i,[["path",{d:"m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"}],["path",{d:"M8 18h1"}],["path",{d:"M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G0=["svg",i,[["path",{d:"M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X3=["svg",i,[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5"}],["path",{d:"M4.017 11.512a6 6 0 1 0 8.466 8.475"}],["path",{d:"M8 16v-6a6 6 0 0 1 6 6z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q3=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M3 15h6"}],["path",{d:"M6 12v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M9 15h6"}],["path",{d:"M12 18v-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j3=["svg",i,[["path",{d:"M12 17h.01"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K3=["svg",i,[["path",{d:"M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M16 14a2 2 0 0 0-2 2"}],["path",{d:"M20 14a2 2 0 0 1 2 2"}],["path",{d:"M20 22a2 2 0 0 0 2-2"}],["path",{d:"M16 22a2 2 0 0 1-2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"11.5",cy:"14.5",r:"2.5"}],["path",{d:"M13.3 16.3 15 18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J3=["svg",i,[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"m9 18-1.5-1.5"}],["circle",{cx:"5",cy:"14",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $3=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 12h8"}],["path",{d:"M10 11v2"}],["path",{d:"M8 17h8"}],["path",{d:"M14 16v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 13h2"}],["path",{d:"M14 13h2"}],["path",{d:"M8 17h2"}],["path",{d:"M14 17h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e5=["svg",i,[["path",{d:"M21 7h-3a2 2 0 0 1-2-2V2"}],["path",{d:"M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z"}],["path",{d:"M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15"}],["path",{d:"M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a5=["svg",i,[["path",{d:"m10 18 3-3-3-3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m8 16 2-2-2-2"}],["path",{d:"M12 18h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i5=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M2 13v-1h6v1"}],["path",{d:"M5 12v6"}],["path",{d:"M4 18h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M9 13v-1h6v1"}],["path",{d:"M12 12v6"}],["path",{d:"M11 18h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M12 12v6"}],["path",{d:"m15 15-3-3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o5=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["rect",{width:"8",height:"6",x:"2",y:"12",rx:"1"}],["path",{d:"m10 15.5 4 2.5v-6l-4 2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m10 11 5 3-5 3v-6Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 15h.01"}],["path",{d:"M11.5 13.5a2.5 2.5 0 0 1 0 3"}],["path",{d:"M15 12a5 5 0 0 1 0 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l5=["svg",i,[["path",{d:"M11 11a5 5 0 0 1 0 6"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4.268 21A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"m7 10-3 2H2v4h2l3 2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u5=["svg",i,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m8 12.5-5 5"}],["path",{d:"m3 12.5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m14.5 12.5-5 5"}],["path",{d:"m9.5 12.5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f5=["svg",i,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x5=["svg",i,[["path",{d:"M20 7h-3a2 2 0 0 1-2-2V2"}],["path",{d:"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"}],["path",{d:"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M5=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 3v18"}],["path",{d:"M3 7.5h4"}],["path",{d:"M3 12h18"}],["path",{d:"M3 16.5h4"}],["path",{d:"M17 3v18"}],["path",{d:"M17 7.5h4"}],["path",{d:"M17 16.5h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v5=["svg",i,[["path",{d:"M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"}],["path",{d:"m22 3-5 5"}],["path",{d:"m17 3 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y5=["svg",i,[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m5=["svg",i,[["path",{d:"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"}],["path",{d:"M14 13.12c0 2.38 0 6.38-1 8.88"}],["path",{d:"M17.29 21.02c.12-.6.43-2.3.5-3.02"}],["path",{d:"M2 12a10 10 0 0 1 18-6"}],["path",{d:"M2 16h.01"}],["path",{d:"M21.8 16c.2-2 .131-5.354 0-6"}],["path",{d:"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"}],["path",{d:"M8.65 22c.21-.66.45-1.32.57-2"}],["path",{d:"M9 6.8a6 6 0 0 1 9 5.2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w5=["svg",i,[["path",{d:"M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"}],["path",{d:"M9 18h8"}],["path",{d:"M18 3h-3"}],["path",{d:"M11 3a6 6 0 0 0-6 6v11"}],["path",{d:"M5 13h4"}],["path",{d:"M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A5=["svg",i,[["path",{d:"M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C5=["svg",i,[["path",{d:"M2 16s9-15 20-4C11 23 2 8 2 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E5=["svg",i,[["path",{d:"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"}],["path",{d:"M18 12v.5"}],["path",{d:"M16 17.93a9.77 9.77 0 0 1 0-11.86"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"}],["path",{d:"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I5=["svg",i,[["path",{d:"M8 2c3 0 5 2 8 2s4-1 4-1v11"}],["path",{d:"M4 22V4"}],["path",{d:"M4 15s1-1 4-1 5 2 8 2"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b5=["svg",i,[["path",{d:"M17 22V2L7 7l10 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S5=["svg",i,[["path",{d:"M7 22V2l10 5-10 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T5=["svg",i,[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N5=["svg",i,[["path",{d:"M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"}],["path",{d:"m5 22 14-4"}],["path",{d:"m5 18 14 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R5=["svg",i,[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O5=["svg",i,[["path",{d:"M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4"}],["path",{d:"M7 2h11v4c0 2-2 2-2 4v1"}],["line",{x1:"11",x2:"18",y1:"6",y2:"6"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D5=["svg",i,[["path",{d:"M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"}],["line",{x1:"6",x2:"18",y1:"6",y2:"6"}],["line",{x1:"12",x2:"12",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _5=["svg",i,[["path",{d:"M10 10 4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-1.272-2.542"}],["path",{d:"M10 2v2.343"}],["path",{d:"M14 2v6.343"}],["path",{d:"M8.5 2h7"}],["path",{d:"M7 16h9"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L5=["svg",i,[["path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"}],["path",{d:"M8.5 2h7"}],["path",{d:"M7 16h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B5=["svg",i,[["path",{d:"M10 2v7.31"}],["path",{d:"M14 9.3V1.99"}],["path",{d:"M8.5 2h7"}],["path",{d:"M14 9.3a6.5 6.5 0 1 1-4 0"}],["path",{d:"M5.52 16h12.96"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P5=["svg",i,[["path",{d:"m3 7 5 5-5 5V7"}],["path",{d:"m21 7-5 5 5 5V7"}],["path",{d:"M12 20v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H5=["svg",i,[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"}],["path",{d:"M12 20v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F5=["svg",i,[["path",{d:"m17 3-5 5-5-5h10"}],["path",{d:"m17 21-5-5-5 5h10"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V5=["svg",i,[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k5=["svg",i,[["path",{d:"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M12 10v12"}],["path",{d:"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"}],["path",{d:"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U5=["svg",i,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"}],["path",{d:"M12 7.5V9"}],["path",{d:"M7.5 12H9"}],["path",{d:"M16.5 12H15"}],["path",{d:"M12 16.5V15"}],["path",{d:"m8 8 1.88 1.88"}],["path",{d:"M14.12 9.88 16 8"}],["path",{d:"m8 16 1.88-1.88"}],["path",{d:"M14.12 14.12 16 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z5=["svg",i,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G5=["svg",i,[["path",{d:"M2 12h6"}],["path",{d:"M22 12h-6"}],["path",{d:"M12 2v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 20v2"}],["path",{d:"m19 9-3 3 3 3"}],["path",{d:"m5 15 3-3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W5=["svg",i,[["path",{d:"M12 22v-6"}],["path",{d:"M12 8V2"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}],["path",{d:"m15 19-3-3-3 3"}],["path",{d:"m15 5-3 3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z5=["svg",i,[["circle",{cx:"15",cy:"19",r:"2"}],["path",{d:"M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"}],["path",{d:"M15 11v-1"}],["path",{d:"M15 17v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X5=["svg",i,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"m9 13 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q5=["svg",i,[["circle",{cx:"16",cy:"16",r:"6"}],["path",{d:"M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"}],["path",{d:"M16 14v2l1 1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y5=["svg",i,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M2 10h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W0=["svg",i,[["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3"}],["path",{d:"m21.7 19.4-.9-.3"}],["path",{d:"m15.2 16.9-.9-.3"}],["path",{d:"m16.6 21.7.3-.9"}],["path",{d:"m19.1 15.2.3-.9"}],["path",{d:"m19.6 21.7-.4-1"}],["path",{d:"m16.8 15.3-.4-1"}],["path",{d:"m14.3 19.6 1-.4"}],["path",{d:"m20.7 16.8 1-.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j5=["svg",i,[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["circle",{cx:"12",cy:"13",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K5=["svg",i,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M12 10v6"}],["path",{d:"m15 13-3 3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q5=["svg",i,[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"}],["circle",{cx:"13",cy:"12",r:"2"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8"}],["circle",{cx:"20",cy:"19",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J5=["svg",i,[["circle",{cx:"12",cy:"13",r:"2"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M14 13h3"}],["path",{d:"M7 13h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $5=["svg",i,[["path",{d:"M11 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.5"}],["path",{d:"M13.9 17.45c-1.2-1.2-1.14-2.8-.2-3.73a2.43 2.43 0 0 1 3.44 0l.36.34.34-.34a2.43 2.43 0 0 1 3.45-.01v0c.95.95 1 2.53-.2 3.74L17.5 21Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tp=["svg",i,[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ep=["svg",i,[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["path",{d:"M8 10v4"}],["path",{d:"M12 10v2"}],["path",{d:"M16 10v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ap=["svg",i,[["circle",{cx:"16",cy:"20",r:"2"}],["path",{d:"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2"}],["path",{d:"m22 14-4.5 4.5"}],["path",{d:"m21 15 1 1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const np=["svg",i,[["rect",{width:"8",height:"5",x:"14",y:"17",rx:"1"}],["path",{d:"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5"}],["path",{d:"M20 17v-2a2 2 0 1 0-4 0v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=["svg",i,[["path",{d:"M9 13h6"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ip=["svg",i,[["path",{d:"m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"}],["circle",{cx:"14",cy:"15",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sp=["svg",i,[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=["svg",i,[["path",{d:"M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5"}],["path",{d:"M2 13h10"}],["path",{d:"m5 10-3 3 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z0=["svg",i,[["path",{d:"M8.4 10.6a2 2 0 0 1 3 3L6 19l-4 1 1-4Z"}],["path",{d:"M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const op=["svg",i,[["path",{d:"M12 10v6"}],["path",{d:"M9 13h6"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=["svg",i,[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["circle",{cx:"12",cy:"13",r:"2"}],["path",{d:"M12 15v5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=["svg",i,[["circle",{cx:"11.5",cy:"12.5",r:"2.5"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M13.3 14.3 15 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lp=["svg",i,[["circle",{cx:"17",cy:"17",r:"3"}],["path",{d:"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1"}],["path",{d:"m21 21-1.5-1.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=["svg",i,[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"}],["path",{d:"m8 16 3-3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=["svg",i,[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5"}],["path",{d:"M12 10v4h4"}],["path",{d:"m12 14 1.535-1.605a5 5 0 0 1 8 1.5"}],["path",{d:"M22 22v-4h-4"}],["path",{d:"m22 18-1.535 1.605a5 5 0 0 1-8-1.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gp=["svg",i,[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=["svg",i,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M12 10v6"}],["path",{d:"m9 13 3-3 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xp=["svg",i,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"m9.5 10.5 5 5"}],["path",{d:"m14.5 10.5-5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mp=["svg",i,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=["svg",i,[["path",{d:"M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z"}],["path",{d:"M2 8v11a2 2 0 0 0 2 2h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=["svg",i,[["path",{d:"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"}],["path",{d:"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"}],["path",{d:"M16 17h4"}],["path",{d:"M4 13h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mp=["svg",i,[["path",{d:"M12 12H5a2 2 0 0 0-2 2v5"}],["circle",{cx:"13",cy:"19",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}],["path",{d:"M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wp=["svg",i,[["polyline",{points:"15 17 20 12 15 7"}],["path",{d:"M4 18v-2a4 4 0 0 1 4-4h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ap=["svg",i,[["line",{x1:"22",x2:"2",y1:"6",y2:"6"}],["line",{x1:"22",x2:"2",y1:"18",y2:"18"}],["line",{x1:"6",x2:"6",y1:"2",y2:"22"}],["line",{x1:"18",x2:"18",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cp=["svg",i,[["path",{d:"M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ep=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ip=["svg",i,[["line",{x1:"3",x2:"15",y1:"22",y2:"22"}],["line",{x1:"4",x2:"14",y1:"9",y2:"9"}],["path",{d:"M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"}],["path",{d:"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["rect",{width:"10",height:"8",x:"7",y:"8",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=["svg",i,[["path",{d:"M2 7v10"}],["path",{d:"M6 5v14"}],["rect",{width:"12",height:"18",x:"10",y:"3",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=["svg",i,[["path",{d:"M2 3v18"}],["rect",{width:"12",height:"18",x:"6",y:"3",rx:"2"}],["path",{d:"M22 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Np=["svg",i,[["rect",{width:"18",height:"14",x:"3",y:"3",rx:"2"}],["path",{d:"M4 21h1"}],["path",{d:"M9 21h1"}],["path",{d:"M14 21h1"}],["path",{d:"M19 21h1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rp=["svg",i,[["path",{d:"M7 2h10"}],["path",{d:"M5 6h14"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Op=["svg",i,[["path",{d:"M3 2h18"}],["rect",{width:"18",height:"12",x:"3",y:"6",rx:"2"}],["path",{d:"M3 22h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=["svg",i,[["line",{x1:"6",x2:"10",y1:"11",y2:"11"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _p=["svg",i,[["line",{x1:"6",x2:"10",y1:"12",y2:"12"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14"}],["line",{x1:"15",x2:"15.01",y1:"13",y2:"13"}],["line",{x1:"18",x2:"18.01",y1:"11",y2:"11"}],["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lp=["svg",i,[["path",{d:"M8 6h10"}],["path",{d:"M6 12h9"}],["path",{d:"M11 18h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=["svg",i,[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pp=["svg",i,[["path",{d:"m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"}],["path",{d:"m16 16 6-6"}],["path",{d:"m8 8 6-6"}],["path",{d:"m9 7 8 8"}],["path",{d:"m21 11-8-8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=["svg",i,[["path",{d:"M6 3h12l4 6-10 13L2 9Z"}],["path",{d:"M11 3 8 9l4 13 4-13-3-6"}],["path",{d:"M2 9h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=["svg",i,[["path",{d:"M9 10h.01"}],["path",{d:"M15 10h.01"}],["path",{d:"M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=["svg",i,[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1"}],["path",{d:"M12 8v13"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kp=["svg",i,[["path",{d:"M6 3v12"}],["path",{d:"M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}],["path",{d:"M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}],["path",{d:"M15 6a9 9 0 0 0-9 9"}],["path",{d:"M18 15v6"}],["path",{d:"M21 18h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=["svg",i,[["line",{x1:"6",x2:"6",y1:"3",y2:"15"}],["circle",{cx:"18",cy:"6",r:"3"}],["circle",{cx:"6",cy:"18",r:"3"}],["path",{d:"M18 9a9 9 0 0 1-9 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X0=["svg",i,[["circle",{cx:"12",cy:"12",r:"3"}],["line",{x1:"3",x2:"9",y1:"12",y2:"12"}],["line",{x1:"15",x2:"21",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zp=["svg",i,[["path",{d:"M12 3v6"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M12 15v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=["svg",i,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=["svg",i,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=["svg",i,[["circle",{cx:"12",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["circle",{cx:"18",cy:"6",r:"3"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"}],["path",{d:"M12 12v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=["svg",i,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M5 9v6"}],["circle",{cx:"5",cy:"18",r:"3"}],["path",{d:"M12 3v18"}],["circle",{cx:"19",cy:"6",r:"3"}],["path",{d:"M16 15.7A9 9 0 0 0 19 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qp=["svg",i,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M6 21V9a9 9 0 0 0 9 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=["svg",i,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M5 9v12"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"m15 9-3-3 3-3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jp=["svg",i,[["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M6 9v12"}],["path",{d:"m21 3-6 6"}],["path",{d:"m21 9-6-6"}],["path",{d:"M18 11.5V15"}],["circle",{cx:"18",cy:"18",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=["svg",i,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M5 9v12"}],["path",{d:"m15 9-3-3 3-3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v3"}],["path",{d:"M19 15v6"}],["path",{d:"M22 18h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qp=["svg",i,[["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M6 9v12"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v3"}],["path",{d:"M18 15v6"}],["path",{d:"M21 18h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=["svg",i,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M18 6V5"}],["path",{d:"M18 11v-1"}],["line",{x1:"6",x2:"6",y1:"9",y2:"21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=["svg",i,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}],["line",{x1:"6",x2:"6",y1:"9",y2:"21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t8=["svg",i,[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e8=["svg",i,[["path",{d:"m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a8=["svg",i,[["path",{d:"M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"}],["path",{d:"M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n8=["svg",i,[["circle",{cx:"6",cy:"15",r:"4"}],["circle",{cx:"18",cy:"15",r:"4"}],["path",{d:"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"}],["path",{d:"M2.5 13 5 7c.7-1.3 1.4-2 3-2"}],["path",{d:"M21.5 13 19 7c-.7-1.3-1.5-2-3-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r8=["svg",i,[["path",{d:"M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"}],["path",{d:"M2 12h8.5"}],["path",{d:"M20 6V4a2 2 0 1 0-4 0v2"}],["rect",{width:"8",height:"5",x:"14",y:"6",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i8=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s8=["svg",i,[["path",{d:"M12 13V2l8 4-8 4"}],["path",{d:"M20.561 10.222a9 9 0 1 1-12.55-5.29"}],["path",{d:"M8.002 9.997a5 5 0 1 0 8.9 2.02"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h8=["svg",i,[["path",{d:"M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4"}],["path",{d:"M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"}],["path",{d:"M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"}],["path",{d:"M6 14v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"}],["path",{d:"M18 11v0a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o8=["svg",i,[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"}],["path",{d:"M22 10v6"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c8=["svg",i,[["path",{d:"M22 5V2l-5.89 5.89"}],["circle",{cx:"16.6",cy:"15.89",r:"3"}],["circle",{cx:"8.11",cy:"7.4",r:"3"}],["circle",{cx:"12.35",cy:"11.65",r:"3"}],["circle",{cx:"13.91",cy:"5.85",r:"3"}],["circle",{cx:"18.15",cy:"10.09",r:"3"}],["circle",{cx:"6.56",cy:"13.2",r:"3"}],["circle",{cx:"10.8",cy:"17.44",r:"3"}],["circle",{cx:"5",cy:"19",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d8=["svg",i,[["path",{d:"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"}],["path",{d:"m16 19 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l8=["svg",i,[["path",{d:"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"}],["path",{d:"m16 16 5 5"}],["path",{d:"m16 21 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q0=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 12h18"}],["path",{d:"M12 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}],["path",{d:"M9 3v18"}],["path",{d:"M15 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p8=["svg",i,[["circle",{cx:"12",cy:"9",r:"1"}],["circle",{cx:"19",cy:"9",r:"1"}],["circle",{cx:"5",cy:"9",r:"1"}],["circle",{cx:"12",cy:"15",r:"1"}],["circle",{cx:"19",cy:"15",r:"1"}],["circle",{cx:"5",cy:"15",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u8=["svg",i,[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g8=["svg",i,[["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"19",cy:"5",r:"1"}],["circle",{cx:"5",cy:"5",r:"1"}],["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}],["circle",{cx:"19",cy:"19",r:"1"}],["circle",{cx:"5",cy:"19",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f8=["svg",i,[["path",{d:"M3 7V5c0-1.1.9-2 2-2h2"}],["path",{d:"M17 3h2c1.1 0 2 .9 2 2v2"}],["path",{d:"M21 17v2c0 1.1-.9 2-2 2h-2"}],["path",{d:"M7 21H5c-1.1 0-2-.9-2-2v-2"}],["rect",{width:"7",height:"5",x:"7",y:"7",rx:"1"}],["rect",{width:"7",height:"5",x:"10",y:"12",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x8=["svg",i,[["path",{d:"m20 7 1.7-1.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L17 4v3Z"}],["path",{d:"m17 7-5.1 5.1"}],["circle",{cx:"11.5",cy:"12.5",r:".5",fill:"currentColor"}],["path",{d:"M6 12a2 2 0 0 0 1.8-1.2l.4-.9C8.7 8.8 9.8 8 11 8c2.8 0 5 2.2 5 5 0 1.2-.8 2.3-1.9 2.8l-.9.4A2 2 0 0 0 12 18a4 4 0 0 1-4 4c-3.3 0-6-2.7-6-6a4 4 0 0 1 4-4"}],["path",{d:"m6 16 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M8=["svg",i,[["path",{d:"M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856"}],["path",{d:"M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288"}],["path",{d:"M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"}],["path",{d:"m8.5 16.5-1-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v8=["svg",i,[["path",{d:"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"}],["path",{d:"m18 15 4-4"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y8=["svg",i,[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{d:"m2 16 6 6"}],["circle",{cx:"16",cy:"9",r:"2.9"}],["circle",{cx:"6",cy:"5",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m8=["svg",i,[["path",{d:"M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"}],["path",{d:"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{d:"m2 15 6 6"}],["path",{d:"M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y0=["svg",i,[["path",{d:"M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"}],["path",{d:"m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{d:"m2 13 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w8=["svg",i,[["path",{d:"M18 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4"}],["path",{d:"M14 11V9a2 2 0 1 0-4 0v2"}],["path",{d:"M10 10.5V5a2 2 0 1 0-4 0v9"}],["path",{d:"m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A8=["svg",i,[["path",{d:"M12 3V2"}],["path",{d:"M5 10a7.1 7.1 0 0 1 14 0"}],["path",{d:"M4 10h16"}],["path",{d:"M2 14h12a2 2 0 1 1 0 4h-2"}],["path",{d:"m15.4 17.4 3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18"}],["path",{d:"M5 14v7H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C8=["svg",i,[["path",{d:"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E8=["svg",i,[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"}],["path",{d:"m21 3 1 11h-2"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"}],["path",{d:"M3 4h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I8=["svg",i,[["path",{d:"M12 2v8"}],["path",{d:"m16 6-4 4-4-4"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 18h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b8=["svg",i,[["path",{d:"m16 6-4-4-4 4"}],["path",{d:"M12 2v8"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 18h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S8=["svg",i,[["line",{x1:"22",x2:"2",y1:"12",y2:"12"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T8=["svg",i,[["path",{d:"M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"}],["path",{d:"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"}],["path",{d:"M4 15v-3a6 6 0 0 1 6-6h0"}],["path",{d:"M14 6h0a6 6 0 0 1 6 6v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N8=["svg",i,[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R8=["svg",i,[["path",{d:"m5.2 6.2 1.4 1.4"}],["path",{d:"M2 13h2"}],["path",{d:"M20 13h2"}],["path",{d:"m17.4 7.6 1.4-1.4"}],["path",{d:"M22 17H2"}],["path",{d:"M22 21H2"}],["path",{d:"M16 13a4 4 0 0 0-8 0"}],["path",{d:"M12 5V2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O8=["svg",i,[["path",{d:"M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z"}],["path",{d:"M7.5 12h9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D8=["svg",i,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"m17 12 3-2v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _8=["svg",i,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L8=["svg",i,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"}],["path",{d:"M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B8=["svg",i,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M17 10v4h4"}],["path",{d:"M21 10v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P8=["svg",i,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M17 13v-3h4"}],["path",{d:"M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H8=["svg",i,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["circle",{cx:"19",cy:"16",r:"2"}],["path",{d:"M20 10c-2 2-3 3.5-3 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F8=["svg",i,[["path",{d:"M6 12h12"}],["path",{d:"M6 20V4"}],["path",{d:"M18 20V4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V8=["svg",i,[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k8=["svg",i,[["path",{d:"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"}],["path",{d:"M21 16v2a4 4 0 0 1-4 4h-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U8=["svg",i,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["path",{d:"m12 13-1-1 2-2-3-3 2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z8=["svg",i,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["path",{d:"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"}],["path",{d:"m18 15-2-2"}],["path",{d:"m15 18-2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G8=["svg",i,[["line",{x1:"2",y1:"2",x2:"22",y2:"22"}],["path",{d:"M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35"}],["path",{d:"M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W8=["svg",i,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z8=["svg",i,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X8=["svg",i,[["path",{d:"M11 8c2-3-2-3 0-6"}],["path",{d:"M15.5 8c2-3-2-3 0-6"}],["path",{d:"M6 10h.01"}],["path",{d:"M6 14h.01"}],["path",{d:"M10 16v-4"}],["path",{d:"M14 16v-4"}],["path",{d:"M18 16v-4"}],["path",{d:"M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"}],["path",{d:"M5 20v2"}],["path",{d:"M19 20v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q8=["svg",i,[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y8=["svg",i,[["path",{d:"m9 11-6 6v3h9l3-3"}],["path",{d:"m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j8=["svg",i,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K8=["svg",i,[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],["polyline",{points:"9 22 9 12 15 12 15 22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q8=["svg",i,[["path",{d:"M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27"}],["path",{d:"M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28"}],["path",{d:"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26"}],["path",{d:"M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25"}],["path",{d:"M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75"}],["path",{d:"M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24"}],["path",{d:"M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28"}],["path",{d:"M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J8=["svg",i,[["path",{d:"M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18"}],["path",{d:"M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88"}],["path",{d:"M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36"}],["path",{d:"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87"}],["path",{d:"M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08"}],["path",{d:"M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57"}],["path",{d:"M4.93 4.93 3 3a.7.7 0 0 1 0-1"}],["path",{d:"M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $8=["svg",i,[["path",{d:"M12 6v4"}],["path",{d:"M14 14h-4"}],["path",{d:"M14 18h-4"}],["path",{d:"M14 8h-4"}],["path",{d:"M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"}],["path",{d:"M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t6=["svg",i,[["path",{d:"M10 22v-6.57"}],["path",{d:"M12 11h.01"}],["path",{d:"M12 7h.01"}],["path",{d:"M14 15.43V22"}],["path",{d:"M15 16a5 5 0 0 0-6 0"}],["path",{d:"M16 11h.01"}],["path",{d:"M16 7h.01"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 7h.01"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e6=["svg",i,[["path",{d:"M5 22h14"}],["path",{d:"M5 2h14"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j0=["svg",i,[["path",{d:"M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0"}],["path",{d:"M12.14 11a3.5 3.5 0 1 1 6.71 0"}],["path",{d:"M15.5 6.5a3.5 3.5 0 1 0-7 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K0=["svg",i,[["path",{d:"m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"}],["path",{d:"M17 7A5 5 0 0 0 7 7"}],["path",{d:"M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a6=["svg",i,[["path",{d:"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"}],["path",{d:"m14 19 3 3v-5.5"}],["path",{d:"m17 22 3-3"}],["circle",{cx:"9",cy:"9",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n6=["svg",i,[["path",{d:"M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r6=["svg",i,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i6=["svg",i,[["path",{d:"m11 16-5 5"}],["path",{d:"M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6.5"}],["path",{d:"M15.765 22a.5.5 0 0 1-.765-.424V13.38a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"}],["circle",{cx:"9",cy:"9",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s6=["svg",i,[["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5"}],["line",{x1:"19",x2:"19",y1:"2",y2:"8"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h6=["svg",i,[["path",{d:"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"}],["path",{d:"m14 19.5 3-3 3 3"}],["path",{d:"M17 22v-5.5"}],["circle",{cx:"9",cy:"9",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o6=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c6=["svg",i,[["path",{d:"M18 22H4a2 2 0 0 1-2-2V6"}],["path",{d:"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"}],["circle",{cx:"12",cy:"8",r:"2"}],["rect",{width:"16",height:"16",x:"6",y:"2",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d6=["svg",i,[["path",{d:"M12 3v12"}],["path",{d:"m8 11 4 4 4-4"}],["path",{d:"M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l6=["svg",i,[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q0=["svg",i,[["polyline",{points:"7 8 3 12 7 16"}],["line",{x1:"21",x2:"11",y1:"12",y2:"12"}],["line",{x1:"21",x2:"11",y1:"6",y2:"6"}],["line",{x1:"21",x2:"11",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J0=["svg",i,[["polyline",{points:"3 8 7 12 3 16"}],["line",{x1:"21",x2:"11",y1:"12",y2:"12"}],["line",{x1:"21",x2:"11",y1:"6",y2:"6"}],["line",{x1:"21",x2:"11",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p6=["svg",i,[["path",{d:"M6 3h12"}],["path",{d:"M6 8h12"}],["path",{d:"m6 13 8.5 8"}],["path",{d:"M6 13h3"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u6=["svg",i,[["path",{d:"M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g6=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f6=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 7h.01"}],["path",{d:"M17 7h.01"}],["path",{d:"M7 17h.01"}],["path",{d:"M17 17h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x6=["svg",i,[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M6=["svg",i,[["line",{x1:"19",x2:"10",y1:"4",y2:"4"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v6=["svg",i,[["path",{d:"M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8"}],["polyline",{points:"16 14 20 18 16 22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y6=["svg",i,[["path",{d:"M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8H4"}],["polyline",{points:"8 22 4 18 8 14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m6=["svg",i,[["path",{d:"M12 9.5V21m0-11.5L6 3m6 6.5L18 3"}],["path",{d:"M6 15h12"}],["path",{d:"M6 11h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w6=["svg",i,[["path",{d:"M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z"}],["path",{d:"M6 15v-2"}],["path",{d:"M12 15V9"}],["circle",{cx:"12",cy:"6",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A6=["svg",i,[["path",{d:"M6 5v11"}],["path",{d:"M12 5v6"}],["path",{d:"M18 5v14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C6=["svg",i,[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E6=["svg",i,[["path",{d:"M12.4 2.7c.9-.9 2.5-.9 3.4 0l5.5 5.5c.9.9.9 2.5 0 3.4l-3.7 3.7c-.9.9-2.5.9-3.4 0L8.7 9.8c-.9-.9-.9-2.5 0-3.4Z"}],["path",{d:"m14 7 3 3"}],["path",{d:"M9.4 10.6 2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I6=["svg",i,[["circle",{cx:"7.5",cy:"15.5",r:"5.5"}],["path",{d:"m21 2-9.6 9.6"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b6=["svg",i,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M6 8h4"}],["path",{d:"M14 8h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M2 12h20"}],["path",{d:"M6 12v4"}],["path",{d:"M10 12v4"}],["path",{d:"M14 12v4"}],["path",{d:"M18 12v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S6=["svg",i,[["path",{d:"M 20 4 A2 2 0 0 1 22 6"}],["path",{d:"M 22 6 L 22 16.41"}],["path",{d:"M 7 16 L 16 16"}],["path",{d:"M 9.69 4 L 20 4"}],["path",{d:"M14 8h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"m2 2 20 20"}],["path",{d:"M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"}],["path",{d:"M6 8h.01"}],["path",{d:"M8 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T6=["svg",i,[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N6=["svg",i,[["path",{d:"M12 2v5"}],["path",{d:"M6 7h12l4 9H2l4-9Z"}],["path",{d:"M9.17 16a3 3 0 1 0 5.66 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R6=["svg",i,[["path",{d:"m14 5-3 3 2 7 8-8-7-2Z"}],["path",{d:"m14 5-3 3-3-3 3-3 3 3Z"}],["path",{d:"M9.5 6.5 4 12l3 6"}],["path",{d:"M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O6=["svg",i,[["path",{d:"M9 2h6l3 7H6l3-7Z"}],["path",{d:"M12 9v13"}],["path",{d:"M9 22h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D6=["svg",i,[["path",{d:"M11 13h6l3 7H8l3-7Z"}],["path",{d:"M14 13V8a2 2 0 0 0-2-2H8"}],["path",{d:"M4 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4v6Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _6=["svg",i,[["path",{d:"M11 4h6l3 7H8l3-7Z"}],["path",{d:"M14 11v5a2 2 0 0 1-2 2H8"}],["path",{d:"M4 15h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4v-6Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L6=["svg",i,[["path",{d:"M8 2h8l4 10H4L8 2Z"}],["path",{d:"M12 12v6"}],["path",{d:"M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B6=["svg",i,[["path",{d:"m12 8 6-3-6-3v10"}],["path",{d:"m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"}],["path",{d:"m6.49 12.85 11.02 6.3"}],["path",{d:"M17.51 12.85 6.5 19.15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P6=["svg",i,[["line",{x1:"3",x2:"21",y1:"22",y2:"22"}],["line",{x1:"6",x2:"6",y1:"18",y2:"11"}],["line",{x1:"10",x2:"10",y1:"18",y2:"11"}],["line",{x1:"14",x2:"14",y1:"18",y2:"11"}],["line",{x1:"18",x2:"18",y1:"18",y2:"11"}],["polygon",{points:"12 2 20 7 4 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H6=["svg",i,[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $0=["svg",i,[["rect",{width:"18",height:"12",x:"3",y:"4",rx:"2",ry:"2"}],["line",{x1:"2",x2:"22",y1:"20",y2:"20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F6=["svg",i,[["path",{d:"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V6=["svg",i,[["path",{d:"M7 22a5 5 0 0 1-2-4"}],["path",{d:"M7 16.93c.96.43 1.96.74 2.99.91"}],["path",{d:"M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"}],["path",{d:"M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}],["path",{d:"M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14v0z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k6=["svg",i,[["path",{d:"M7 22a5 5 0 0 1-2-4"}],["path",{d:"M3.3 14A6.8 6.8 0 0 1 2 10c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8a12 12 0 0 1-5-1"}],["path",{d:"M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U6=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z6=["svg",i,[["path",{d:"m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12"}],["path",{d:"M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G6=["svg",i,[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"}],["path",{d:"m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"}],["path",{d:"m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W6=["svg",i,[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z6=["svg",i,[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X6=["svg",i,[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q6=["svg",i,[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}],["path",{d:"M14 4h7"}],["path",{d:"M14 9h7"}],["path",{d:"M14 15h7"}],["path",{d:"M14 20h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y6=["svg",i,[["rect",{width:"7",height:"18",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j6=["svg",i,[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K6=["svg",i,[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q6=["svg",i,[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J6=["svg",i,[["path",{d:"M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"}],["path",{d:"M2 22 17 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $6=["svg",i,[["rect",{width:"8",height:"18",x:"3",y:"3",rx:"1"}],["path",{d:"M7 3v18"}],["path",{d:"M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tu=["svg",i,[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m4.93 4.93 4.24 4.24"}],["path",{d:"m14.83 9.17 4.24-4.24"}],["path",{d:"m14.83 14.83 4.24 4.24"}],["path",{d:"m9.17 14.83-4.24 4.24"}],["circle",{cx:"12",cy:"12",r:"4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=["svg",i,[["path",{d:"M8 20V8c0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.5 2"}],["path",{d:"M6 12h4"}],["path",{d:"M14 12h2v8"}],["path",{d:"M6 20h4"}],["path",{d:"M14 20h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nu=["svg",i,[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5"}],["path",{d:"m2 2 20 20"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ru=["svg",i,[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=["svg",i,[["path",{d:"M3 3v18h18"}],["path",{d:"m19 9-5 5-4-4-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const su=["svg",i,[["path",{d:"M9 17H7A5 5 0 0 1 7 7"}],["path",{d:"M15 7h2a5 5 0 0 1 4 8"}],["line",{x1:"8",x2:"12",y1:"12",y2:"12"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hu=["svg",i,[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ou=["svg",i,[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cu=["svg",i,[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const du=["svg",i,[["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}],["path",{d:"M13 6h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 18h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lu=["svg",i,[["path",{d:"m3 10 2.5-2.5L3 5"}],["path",{d:"m3 19 2.5-2.5L3 14"}],["path",{d:"M10 6h11"}],["path",{d:"M10 12h11"}],["path",{d:"M10 18h11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pu=["svg",i,[["path",{d:"M16 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M10 18H3"}],["path",{d:"M21 6v10a2 2 0 0 1-2 2h-5"}],["path",{d:"m16 16-2 2 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uu=["svg",i,[["path",{d:"M3 6h18"}],["path",{d:"M7 12h10"}],["path",{d:"M10 18h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gu=["svg",i,[["path",{d:"M11 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M16 18H3"}],["path",{d:"M21 12h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fu=["svg",i,[["path",{d:"M21 15V6"}],["path",{d:"M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"}],["path",{d:"M12 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M12 18H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xu=["svg",i,[["line",{x1:"10",x2:"21",y1:"6",y2:"6"}],["line",{x1:"10",x2:"21",y1:"12",y2:"12"}],["line",{x1:"10",x2:"21",y1:"18",y2:"18"}],["path",{d:"M4 6h1v4"}],["path",{d:"M4 10h2"}],["path",{d:"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mu=["svg",i,[["path",{d:"M11 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M16 18H3"}],["path",{d:"M18 9v6"}],["path",{d:"M21 12h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vu=["svg",i,[["path",{d:"M21 6H3"}],["path",{d:"M7 12H3"}],["path",{d:"M7 18H3"}],["path",{d:"M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"}],["path",{d:"M11 10v4h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yu=["svg",i,[["path",{d:"M16 12H3"}],["path",{d:"M16 18H3"}],["path",{d:"M10 6H3"}],["path",{d:"M21 18V8a2 2 0 0 0-2-2h-5"}],["path",{d:"m16 8-2-2 2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mu=["svg",i,[["rect",{x:"3",y:"5",width:"6",height:"6",rx:"1"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"M13 6h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 18h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wu=["svg",i,[["path",{d:"M21 12h-8"}],["path",{d:"M21 6H8"}],["path",{d:"M21 18h-8"}],["path",{d:"M3 6v4c0 1.1.9 2 2 2h3"}],["path",{d:"M3 10v6c0 1.1.9 2 2 2h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Au=["svg",i,[["path",{d:"M12 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M12 18H3"}],["path",{d:"m16 12 5 3-5 3v-6Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cu=["svg",i,[["path",{d:"M11 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M16 18H3"}],["path",{d:"m19 10-4 4"}],["path",{d:"m15 10 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eu=["svg",i,[["line",{x1:"8",x2:"21",y1:"6",y2:"6"}],["line",{x1:"8",x2:"21",y1:"12",y2:"12"}],["line",{x1:"8",x2:"21",y1:"18",y2:"18"}],["line",{x1:"3",x2:"3.01",y1:"6",y2:"6"}],["line",{x1:"3",x2:"3.01",y1:"12",y2:"12"}],["line",{x1:"3",x2:"3.01",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=["svg",i,[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iu=["svg",i,[["path",{d:"M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5"}],["path",{d:"M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"}],["path",{d:"M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"}],["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bu=["svg",i,[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Su=["svg",i,[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["circle",{cx:"12",cy:"12",r:"7"}],["circle",{cx:"12",cy:"12",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tu=["svg",i,[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["path",{d:"M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11"}],["path",{d:"M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nu=["svg",i,[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["circle",{cx:"12",cy:"12",r:"7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea=["svg",i,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 9.33-2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ru=["svg",i,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=["svg",i,[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ou=["svg",i,[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Du=["svg",i,[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}],["polyline",{points:"10 17 15 12 10 7"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _u=["svg",i,[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}],["polyline",{points:"16 17 21 12 16 7"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lu=["svg",i,[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}],["path",{d:"M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bu=["svg",i,[["path",{d:"M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0"}],["path",{d:"M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"}],["path",{d:"M10 20h4"}],["circle",{cx:"16",cy:"20",r:"2"}],["circle",{cx:"8",cy:"20",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pu=["svg",i,[["path",{d:"m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"}],["path",{d:"m5 8 4 4"}],["path",{d:"m12 15 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hu=["svg",i,[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"m16 19 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fu=["svg",i,[["path",{d:"M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M16 19h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vu=["svg",i,[["path",{d:"M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"}],["path",{d:"m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ku=["svg",i,[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M19 16v6"}],["path",{d:"M16 19h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uu=["svg",i,[["path",{d:"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"}],["path",{d:"M20 22v.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zu=["svg",i,[["path",{d:"M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m22 22-1.5-1.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gu=["svg",i,[["path",{d:"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M20 14v4"}],["path",{d:"M20 22v.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wu=["svg",i,[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"m17 17 4 4"}],["path",{d:"m21 17-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zu=["svg",i,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xu=["svg",i,[["path",{d:"M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"}],["polyline",{points:"15,9 18,9 18,11"}],["path",{d:"M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"}],["line",{x1:"6",x2:"7",y1:"10",y2:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qu=["svg",i,[["rect",{width:"16",height:"13",x:"6",y:"4",rx:"2"}],["path",{d:"m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7"}],["path",{d:"M2 8v11c0 1.1.9 2 2 2h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yu=["svg",i,[["path",{d:"M5.43 5.43A8.06 8.06 0 0 0 4 10c0 6 8 12 8 12a29.94 29.94 0 0 0 5-5"}],["path",{d:"M19.18 13.52A8.66 8.66 0 0 0 20 10a8 8 0 0 0-8-8 7.88 7.88 0 0 0-3.52.82"}],["path",{d:"M9.13 9.13A2.78 2.78 0 0 0 9 10a3 3 0 0 0 3 3 2.78 2.78 0 0 0 .87-.13"}],["path",{d:"M14.9 9.25a3 3 0 0 0-2.15-2.16"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ju=["svg",i,[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}],["circle",{cx:"12",cy:"10",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ku=["svg",i,[["path",{d:"M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qu=["svg",i,[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ju=["svg",i,[["path",{d:"M8 22h8"}],["path",{d:"M12 11v11"}],["path",{d:"m19 3-7 8-7-8Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $u=["svg",i,[["polyline",{points:"15 3 21 3 21 9"}],["polyline",{points:"9 21 3 21 3 15"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tg=["svg",i,[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eg=["svg",i,[["path",{d:"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"}],["path",{d:"M11 12 5.12 2.2"}],["path",{d:"m13 12 5.88-9.8"}],["path",{d:"M8 7h8"}],["circle",{cx:"12",cy:"17",r:"5"}],["path",{d:"M12 18v-2h-.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ag=["svg",i,[["path",{d:"M9.26 9.26 3 11v3l14.14 3.14"}],["path",{d:"M21 15.34V6l-7.31 2.03"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ng=["svg",i,[["path",{d:"m3 11 18-5v12L3 14v-3z"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"8",x2:"16",y1:"15",y2:"15"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig=["svg",i,[["path",{d:"M6 19v-3"}],["path",{d:"M10 19v-3"}],["path",{d:"M14 19v-3"}],["path",{d:"M18 19v-3"}],["path",{d:"M8 11V9"}],["path",{d:"M16 11V9"}],["path",{d:"M12 11V9"}],["path",{d:"M2 15h20"}],["path",{d:"M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sg=["svg",i,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hg=["svg",i,[["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"}],["path",{d:"m20 22-5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const og=["svg",i,[["path",{d:"M10 9.5 8 12l2 2.5"}],["path",{d:"m14 9.5 2 2.5-2 2.5"}],["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cg=["svg",i,[["path",{d:"M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1"}],["path",{d:"M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1"}],["path",{d:"M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5"}],["path",{d:"M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1"}],["path",{d:"M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1"}],["path",{d:"M3.5 17.5 2 22l4.5-1.5"}],["path",{d:"M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5"}],["path",{d:"M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dg=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lg=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg=["svg",i,[["path",{d:"M20.5 14.9A9 9 0 0 0 9.1 3.5"}],["path",{d:"m2 2 20 20"}],["path",{d:"M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ug=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fg=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"m10 15-3-3 3-3"}],["path",{d:"M7 12h7a2 2 0 0 1 2 2v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xg=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mg=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vg=["svg",i,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yg=["svg",i,[["path",{d:"M10 7.5 8 10l2 2.5"}],["path",{d:"m14 7.5 2 2.5-2 2.5"}],["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=["svg",i,[["path",{d:"M3 6V5c0-1.1.9-2 2-2h2"}],["path",{d:"M11 3h3"}],["path",{d:"M18 3h1c1.1 0 2 .9 2 2"}],["path",{d:"M21 9v2"}],["path",{d:"M21 15c0 1.1-.9 2-2 2h-1"}],["path",{d:"M14 17h-3"}],["path",{d:"m7 17-4 4v-5"}],["path",{d:"M3 12v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wg=["svg",i,[["path",{d:"m5 19-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"}],["path",{d:"M9 10h6"}],["path",{d:"M12 7v6"}],["path",{d:"M9 17h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ag=["svg",i,[["path",{d:"M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7"}],["circle",{cx:"18",cy:"6",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cg=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eg=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M16 10h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ig=["svg",i,[["path",{d:"M21 15V5a2 2 0 0 0-2-2H9"}],["path",{d:"m2 2 20 20"}],["path",{d:"M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bg=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M12 7v6"}],["path",{d:"M9 10h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sg=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M8 12a2 2 0 0 0 2-2V8H8"}],["path",{d:"M14 12a2 2 0 0 0 2-2V8h-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tg=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"m10 7-3 3 3 3"}],["path",{d:"M17 13v-1a2 2 0 0 0-2-2H7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ng=["svg",i,[["path",{d:"M21 12v3a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h7"}],["path",{d:"M16 3h5v5"}],["path",{d:"m16 8 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rg=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M13 8H7"}],["path",{d:"M17 12H7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Og=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M12 7v2"}],["path",{d:"M12 13h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dg=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"m14.5 7.5-5 5"}],["path",{d:"m9.5 7.5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _g=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lg=["svg",i,[["path",{d:"M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bg=["svg",i,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=["svg",i,[["path",{d:"m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"}],["circle",{cx:"17",cy:"7",r:"5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pg=["svg",i,[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hg=["svg",i,[["path",{d:"M6 18h8"}],["path",{d:"M3 22h18"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1"}],["path",{d:"M9 14h2"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fg=["svg",i,[["rect",{width:"20",height:"15",x:"2",y:"4",rx:"2"}],["rect",{width:"8",height:"7",x:"6",y:"8",rx:"1"}],["path",{d:"M18 8v7"}],["path",{d:"M6 19v2"}],["path",{d:"M18 19v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=["svg",i,[["path",{d:"M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"}],["path",{d:"M12 13v8"}],["path",{d:"M12 3v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kg=["svg",i,[["path",{d:"M8 2h8"}],["path",{d:"M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"}],["path",{d:"M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ug=["svg",i,[["path",{d:"M8 2h8"}],["path",{d:"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"}],["path",{d:"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg=["svg",i,[["polyline",{points:"4 14 10 14 10 20"}],["polyline",{points:"20 10 14 10 14 4"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gg=["svg",i,[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wg=["svg",i,[["path",{d:"M5 12h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zg=["svg",i,[["path",{d:"m9 10 2 2 4-4"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=["svg",i,[["circle",{cx:"19",cy:"6",r:"3"}],["path",{d:"M22 12v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qg=["svg",i,[["path",{d:"M12 13V7"}],["path",{d:"m15 10-3 3-3-3"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yg=["svg",i,[["path",{d:"M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2"}],["path",{d:"M22 15V5a2 2 0 0 0-2-2H9"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jg=["svg",i,[["path",{d:"M10 13V7"}],["path",{d:"M14 13V7"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=["svg",i,[["path",{d:"M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qg=["svg",i,[["path",{d:"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"}],["path",{d:"M10 19v-3.96 3.15"}],["path",{d:"M7 19h5"}],["rect",{width:"6",height:"10",x:"16",y:"12",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=["svg",i,[["path",{d:"M5.5 20H8"}],["path",{d:"M17 9h.01"}],["rect",{width:"10",height:"16",x:"12",y:"4",rx:"2"}],["path",{d:"M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4"}],["circle",{cx:"17",cy:"15",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $g=["svg",i,[["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}],["rect",{x:"9",y:"7",width:"6",height:"6",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tf=["svg",i,[["path",{d:"m9 10 3-3 3 3"}],["path",{d:"M12 13V7"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ef=["svg",i,[["path",{d:"m14.5 12.5-5-5"}],["path",{d:"m9.5 12.5 5-5"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=["svg",i,[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nf=["svg",i,[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rf=["svg",i,[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sf=["svg",i,[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z"}],["path",{d:"M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=["svg",i,[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=["svg",i,[["path",{d:"M12 6v.343"}],["path",{d:"M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218"}],["path",{d:"M19 13.343V9A7 7 0 0 0 8.56 2.902"}],["path",{d:"M22 22 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=["svg",i,[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=["svg",i,[["path",{d:"m2 2 4 11 2-5 5-2Z"}],["circle",{cx:"16",cy:"16",r:"6"}],["path",{d:"m11.8 11.8 8.4 8.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=["svg",i,[["path",{d:"m9 9 5 12 1.8-5.2L21 14Z"}],["path",{d:"M7.2 2.2 8 5.1"}],["path",{d:"m5.1 8-2.9-.8"}],["path",{d:"M14 4.1 12 6"}],["path",{d:"m6 12-1.9 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=["svg",i,[["path",{d:"m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"}],["path",{d:"m13 13 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=["svg",i,[["rect",{x:"5",y:"2",width:"14",height:"20",rx:"7"}],["path",{d:"M12 6v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra=["svg",i,[["path",{d:"M5 3v16h16"}],["path",{d:"m5 19 6-6"}],["path",{d:"m2 6 3-3 3 3"}],["path",{d:"m18 16 3 3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=["svg",i,[["polyline",{points:"5 11 5 5 11 5"}],["polyline",{points:"19 13 19 19 13 19"}],["line",{x1:"5",x2:"19",y1:"5",y2:"19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=["svg",i,[["polyline",{points:"13 5 19 5 19 11"}],["polyline",{points:"11 19 5 19 5 13"}],["line",{x1:"19",x2:"5",y1:"5",y2:"19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=["svg",i,[["path",{d:"M11 19H5V13"}],["path",{d:"M19 5L5 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=["svg",i,[["path",{d:"M19 13V19H13"}],["path",{d:"M5 5L19 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=["svg",i,[["path",{d:"M8 18L12 22L16 18"}],["path",{d:"M12 2V22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=["svg",i,[["polyline",{points:"18 8 22 12 18 16"}],["polyline",{points:"6 8 2 12 6 16"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=["svg",i,[["path",{d:"M6 8L2 12L6 16"}],["path",{d:"M2 12H22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=["svg",i,[["path",{d:"M18 8L22 12L18 16"}],["path",{d:"M2 12H22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=["svg",i,[["path",{d:"M5 11V5H11"}],["path",{d:"M5 5L19 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=["svg",i,[["path",{d:"M13 5H19V11"}],["path",{d:"M19 5L5 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=["svg",i,[["path",{d:"M8 6L12 2L16 6"}],["path",{d:"M12 2V22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=["svg",i,[["polyline",{points:"8 18 12 22 16 18"}],["polyline",{points:"8 6 12 2 16 6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=["svg",i,[["polyline",{points:"5 9 2 12 5 15"}],["polyline",{points:"9 5 12 2 15 5"}],["polyline",{points:"15 19 12 22 9 19"}],["polyline",{points:"19 9 22 12 19 15"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=["svg",i,[["circle",{cx:"8",cy:"18",r:"4"}],["path",{d:"M12 18V2l7 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=["svg",i,[["circle",{cx:"12",cy:"18",r:"4"}],["path",{d:"M16 18V2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=["svg",i,[["path",{d:"M9 18V5l12-2v13"}],["path",{d:"m9 9 12-2"}],["circle",{cx:"6",cy:"18",r:"3"}],["circle",{cx:"18",cy:"16",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=["svg",i,[["path",{d:"M9 18V5l12-2v13"}],["circle",{cx:"6",cy:"18",r:"3"}],["circle",{cx:"18",cy:"16",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Of=["svg",i,[["path",{d:"M9.31 9.31 5 21l7-4 7 4-1.17-3.17"}],["path",{d:"M14.53 8.88 12 2l-1.17 3.17"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=["svg",i,[["polygon",{points:"12 2 19 21 12 17 5 21 12 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _f=["svg",i,[["path",{d:"M8.43 8.43 3 11l8 2 2 8 2.57-5.43"}],["path",{d:"M17.39 11.73 22 2l-9.73 4.61"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lf=["svg",i,[["polygon",{points:"3 11 22 2 13 21 11 13 3 11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bf=["svg",i,[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"}],["path",{d:"M12 12V8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=["svg",i,[["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"}],["path",{d:"M18 14h-8"}],["path",{d:"M15 18h-5"}],["path",{d:"M10 6h8v4h-8V6Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=["svg",i,[["path",{d:"M6 8.32a7.43 7.43 0 0 1 0 7.36"}],["path",{d:"M9.46 6.21a11.76 11.76 0 0 1 0 11.58"}],["path",{d:"M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"}],["path",{d:"M16.37 2a20.16 20.16 0 0 1 0 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=["svg",i,[["path",{d:"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"}],["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["path",{d:"M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=["svg",i,[["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M15 2v20"}],["path",{d:"M15 7h5"}],["path",{d:"M15 12h5"}],["path",{d:"M15 17h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=["svg",i,[["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M9.5 8h5"}],["path",{d:"M9.5 12H16"}],["path",{d:"M9.5 16H14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uf=["svg",i,[["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M16 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zf=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M12 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v2"}],["path",{d:"M20 12v2"}],["path",{d:"M20 18v2a2 2 0 0 1-2 2h-1"}],["path",{d:"M13 22h-2"}],["path",{d:"M7 22H6a2 2 0 0 1-2-2v-2"}],["path",{d:"M4 14v-2"}],["path",{d:"M4 8V6a2 2 0 0 1 2-2h2"}],["path",{d:"M8 10h6"}],["path",{d:"M8 14h8"}],["path",{d:"M8 18h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=["svg",i,[["path",{d:"M8 2v4"}],["path",{d:"M12 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"16",height:"18",x:"4",y:"4",rx:"2"}],["path",{d:"M8 10h6"}],["path",{d:"M8 14h8"}],["path",{d:"M8 18h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wf=["svg",i,[["path",{d:"M12 4V2"}],["path",{d:"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939"}],["path",{d:"M19 10v3.343"}],["path",{d:"M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=["svg",i,[["path",{d:"M12 4V2"}],["path",{d:"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"}],["path",{d:"M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=["svg",i,[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa=["svg",i,[["path",{d:"M10 15V9"}],["path",{d:"M14 15V9"}],["path",{d:"M7.714 2h8.572L22 7.714v8.572L16.286 22H7.714L2 16.286V7.714z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=["svg",i,[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xf=["svg",i,[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qf=["svg",i,[["path",{d:"M3 3h6l6 18h6"}],["path",{d:"M14 3h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yf=["svg",i,[["circle",{cx:"12",cy:"12",r:"3"}],["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}],["path",{d:"M10.4 21.9a10 10 0 0 0 9.941-15.416"}],["path",{d:"M13.5 2.1a10 10 0 0 0-9.841 15.416"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=["svg",i,[["path",{d:"M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025"}],["path",{d:"m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009"}],["path",{d:"m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kf=["svg",i,[["path",{d:"M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"}],["path",{d:"m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"}],["path",{d:"M12 3v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qf=["svg",i,[["path",{d:"m16 16 2 2 4-4"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jf=["svg",i,[["path",{d:"M16 16h6"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=["svg",i,[["path",{d:"M12 22v-9"}],["path",{d:"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"}],["path",{d:"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"}],["path",{d:"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t7=["svg",i,[["path",{d:"M16 16h6"}],["path",{d:"M19 13v6"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e7=["svg",i,[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5"}],["path",{d:"M20.27 17.27 22 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a7=["svg",i,[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}],["path",{d:"m17 13 5 5m-5 0 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n7=["svg",i,[["path",{d:"m7.5 4.27 9 5.15"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r7=["svg",i,[["path",{d:"m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"}],["path",{d:"m5 2 5 5"}],["path",{d:"M2 13h15"}],["path",{d:"M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i7=["svg",i,[["rect",{width:"16",height:"6",x:"2",y:"2",rx:"2"}],["path",{d:"M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"}],["rect",{width:"4",height:"6",x:"8",y:"16",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s7=["svg",i,[["path",{d:"M14 19.9V16h3a2 2 0 0 0 2-2v-2H5v2c0 1.1.9 2 2 2h3v3.9a2 2 0 1 0 4 0Z"}],["path",{d:"M6 12V2h12v10"}],["path",{d:"M14 2v4"}],["path",{d:"M10 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h7=["svg",i,[["path",{d:"M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"}],["path",{d:"M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"}],["path",{d:"M14.5 17.5 4.5 15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o7=["svg",i,[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}],["path",{d:"m15 8-3 3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M14 15h1"}],["path",{d:"M19 15h2"}],["path",{d:"M3 15h2"}],["path",{d:"M9 15h1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}],["path",{d:"m9 10 3-3 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"m16 15-3-3 3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 14v1"}],["path",{d:"M9 19v2"}],["path",{d:"M9 3v2"}],["path",{d:"M9 9v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"m14 9 3 3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}],["path",{d:"m8 9 3 3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 14v1"}],["path",{d:"M15 19v2"}],["path",{d:"M15 3v2"}],["path",{d:"M15 9v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}],["path",{d:"m10 15-3-3 3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"m9 16 3-3 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M14 9h1"}],["path",{d:"M19 9h2"}],["path",{d:"M3 9h2"}],["path",{d:"M9 9h1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"m15 14-3 3-3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"M9 15h12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y7=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h12"}],["path",{d:"M15 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M9 21V9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m7=["svg",i,[["path",{d:"m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w7=["svg",i,[["path",{d:"M8 21s-4-3-4-9 4-9 4-9"}],["path",{d:"M16 3s4 3 4 9-4 9-4 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A7=["svg",i,[["path",{d:"M9 9a3 3 0 1 1 6 0"}],["path",{d:"M12 12v3"}],["path",{d:"M11 15h2"}],["path",{d:"M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3"}],["path",{d:"M12 19v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C7=["svg",i,[["path",{d:"M5.8 11.3 2 22l10.7-3.79"}],["path",{d:"M4 3h.01"}],["path",{d:"M22 8h.01"}],["path",{d:"M15 2h.01"}],["path",{d:"M22 20h.01"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E7=["svg",i,[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I7=["svg",i,[["circle",{cx:"11",cy:"4",r:"2"}],["circle",{cx:"18",cy:"8",r:"2"}],["circle",{cx:"20",cy:"16",r:"2"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b7=["svg",i,[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2"}],["path",{d:"M15 14h.01"}],["path",{d:"M9 6h6"}],["path",{d:"M9 10h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xa=["svg",i,[["path",{d:"M12 20h9"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S7=["svg",i,[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"}],["path",{d:"m2.3 2.3 7.286 7.286"}],["circle",{cx:"11",cy:"11",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ma=["svg",i,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T7=["svg",i,[["path",{d:"M12 20h9"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"}],["path",{d:"m15 5 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N7=["svg",i,[["path",{d:"m15 5 4 4"}],["path",{d:"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"}],["path",{d:"m8 6 2-2"}],["path",{d:"m2 22 5.5-1.5L21.17 6.83a2.82 2.82 0 0 0-4-4L3.5 16.5Z"}],["path",{d:"m18 16 2-2"}],["path",{d:"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R7=["svg",i,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}],["path",{d:"m15 5 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O7=["svg",i,[["path",{d:"M3.5 8.7c-.7.5-1 1.4-.7 2.2l2.8 8.7c.3.8 1 1.4 1.9 1.4h9.1c.9 0 1.6-.6 1.9-1.4l2.8-8.7c.3-.8 0-1.7-.7-2.2l-7.4-5.3a2.1 2.1 0 0 0-2.4 0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D7=["svg",i,[["line",{x1:"19",x2:"5",y1:"5",y2:"19"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _7=["svg",i,[["circle",{cx:"12",cy:"5",r:"1"}],["path",{d:"m9 20 3-6 3 6"}],["path",{d:"m6 8 6 2 6-2"}],["path",{d:"M12 10v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L7=["svg",i,[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}],["path",{d:"M14.05 2a9 9 0 0 1 8 7.94"}],["path",{d:"M14.05 6A5 5 0 0 1 18 10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B7=["svg",i,[["polyline",{points:"18 2 22 6 18 10"}],["line",{x1:"14",x2:"22",y1:"6",y2:"6"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P7=["svg",i,[["polyline",{points:"16 2 16 8 22 8"}],["line",{x1:"22",x2:"16",y1:"2",y2:"8"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H7=["svg",i,[["line",{x1:"22",x2:"16",y1:"2",y2:"8"}],["line",{x1:"16",x2:"22",y1:"2",y2:"8"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F7=["svg",i,[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V7=["svg",i,[["polyline",{points:"22 8 22 2 16 2"}],["line",{x1:"16",x2:"22",y1:"8",y2:"2"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k7=["svg",i,[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U7=["svg",i,[["line",{x1:"9",x2:"9",y1:"4",y2:"20"}],["path",{d:"M4 7c0-1.7 1.3-3 3-3h13"}],["path",{d:"M18 20c-1.7 0-3-1.3-3-3V4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z7=["svg",i,[["path",{d:"M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8"}],["path",{d:"M2 14h20"}],["path",{d:"M6 14v4"}],["path",{d:"M10 14v4"}],["path",{d:"M14 14v4"}],["path",{d:"M18 14v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G7=["svg",i,[["path",{d:"M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912"}],["path",{d:"M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393"}],["path",{d:"M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z"}],["path",{d:"M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W7=["svg",i,[["path",{d:"M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"}],["rect",{width:"10",height:"7",x:"12",y:"13",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z7=["svg",i,[["path",{d:"M8 4.5v5H3m-1-6 6 6m13 0v-3c0-1.16-.84-2-2-2h-7m-9 9v2c0 1.05.95 2 2 2h3"}],["rect",{width:"10",height:"7",x:"12",y:"13.5",ry:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X7=["svg",i,[["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83"}],["path",{d:"M22 12A10 10 0 0 0 12 2v10z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q7=["svg",i,[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1"}],["path",{d:"M16 11h0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y7=["svg",i,[["path",{d:"M14 3v11"}],["path",{d:"M14 9h-3a3 3 0 0 1 0-6h9"}],["path",{d:"M18 3v11"}],["path",{d:"M22 18H2l4-4"}],["path",{d:"m6 22-4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j7=["svg",i,[["path",{d:"M10 3v11"}],["path",{d:"M10 9H7a1 1 0 0 1 0-6h8"}],["path",{d:"M14 3v11"}],["path",{d:"m18 14 4 4H2"}],["path",{d:"m22 18-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K7=["svg",i,[["path",{d:"M13 4v16"}],["path",{d:"M17 4v16"}],["path",{d:"M19 4H9.5a4.5 4.5 0 0 0 0 9H13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q7=["svg",i,[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"}],["path",{d:"m8.5 8.5 7 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J7=["svg",i,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["line",{x1:"12",x2:"12",y1:"17",y2:"22"}],["path",{d:"M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12"}],["path",{d:"M15 9.34V6h1a2 2 0 0 0 0-4H7.89"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $7=["svg",i,[["line",{x1:"12",x2:"12",y1:"17",y2:"22"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tx=["svg",i,[["path",{d:"m2 22 1-1h3l9-9"}],["path",{d:"M3 21v-3l9-9"}],["path",{d:"m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ex=["svg",i,[["path",{d:"M15 11h.01"}],["path",{d:"M11 15h.01"}],["path",{d:"M16 16h.01"}],["path",{d:"m2 16 20 6-6-20A20 20 0 0 0 2 16"}],["path",{d:"M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax=["svg",i,[["path",{d:"M2 22h20"}],["path",{d:"M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nx=["svg",i,[["path",{d:"M2 22h20"}],["path",{d:"M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rx=["svg",i,[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ix=["svg",i,[["polygon",{points:"6 3 20 12 6 21 6 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sx=["svg",i,[["path",{d:"M9 2v6"}],["path",{d:"M15 2v6"}],["path",{d:"M12 17v5"}],["path",{d:"M5 8h14"}],["path",{d:"M6 11V8h12v3a6 6 0 1 1-12 0v0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hx=["svg",i,[["path",{d:"m13 2-2 2.5h3L12 7"}],["path",{d:"M10 14v-3"}],["path",{d:"M14 14v-3"}],["path",{d:"M11 19c-1.7 0-3-1.3-3-3v-2h8v2c0 1.7-1.3 3-3 3Z"}],["path",{d:"M12 22v-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ox=["svg",i,[["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"}],["path",{d:"m2 22 3-3"}],["path",{d:"M7.5 13.5 10 11"}],["path",{d:"M10.5 16.5 13 14"}],["path",{d:"m18 3-4 4h6l-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cx=["svg",i,[["path",{d:"M12 22v-5"}],["path",{d:"M9 8V2"}],["path",{d:"M15 8V2"}],["path",{d:"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=["svg",i,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx=["svg",i,[["path",{d:"M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2"}],["path",{d:"M18 6h.01"}],["path",{d:"M6 18h.01"}],["path",{d:"M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z"}],["path",{d:"M18 11.66V22a4 4 0 0 0 4-4V6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px=["svg",i,[["path",{d:"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"}],["polyline",{points:"8 10 12 14 16 10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=["svg",i,[["path",{d:"M16.85 18.58a9 9 0 1 0-9.7 0"}],["path",{d:"M8 14a5 5 0 1 1 8 0"}],["circle",{cx:"12",cy:"11",r:"1"}],["path",{d:"M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gx=["svg",i,[["path",{d:"M10 4.5V4a2 2 0 0 0-2.41-1.957"}],["path",{d:"M13.9 8.4a2 2 0 0 0-1.26-1.295"}],["path",{d:"M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158"}],["path",{d:"m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343"}],["path",{d:"M6 6v8"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fx=["svg",i,[["path",{d:"M22 14a8 8 0 0 1-8 8"}],["path",{d:"M18 11v-1a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"}],["path",{d:"M14 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"}],["path",{d:"M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"}],["path",{d:"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx=["svg",i,[["path",{d:"M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"}],["path",{d:"M10 22 9 8"}],["path",{d:"m14 22 1-14"}],["path",{d:"M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx=["svg",i,[["path",{d:"M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z"}],["path",{d:"m22 22-5.5-5.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx=["svg",i,[["path",{d:"M18 7c0-5.333-8-5.333-8 0"}],["path",{d:"M10 7v14"}],["path",{d:"M6 21h12"}],["path",{d:"M6 13h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yx=["svg",i,[["path",{d:"M18.36 6.64A9 9 0 0 1 20.77 15"}],["path",{d:"M6.16 6.16a9 9 0 1 0 12.68 12.68"}],["path",{d:"M12 2v4"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mx=["svg",i,[["path",{d:"M12 2v10"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wx=["svg",i,[["path",{d:"M2 3h20"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"}],["path",{d:"m7 21 5-5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=["svg",i,[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=["svg",i,[["path",{d:"M5 7 3 5"}],["path",{d:"M9 6V3"}],["path",{d:"m13 7 2-2"}],["circle",{cx:"9",cy:"13",r:"3"}],["path",{d:"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"}],["path",{d:"M16 16h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=["svg",i,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M12 9v11"}],["path",{d:"M2 9h13a2 2 0 0 1 2 2v9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=["svg",i,[["path",{d:"M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bx=["svg",i,[["path",{d:"M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"}],["path",{d:"M12 2v20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=["svg",i,[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3"}],["path",{d:"M21 21v.01"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7"}],["path",{d:"M3 12h.01"}],["path",{d:"M12 3h.01"}],["path",{d:"M12 16v.01"}],["path",{d:"M16 12h1"}],["path",{d:"M21 12v.01"}],["path",{d:"M12 21v-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=["svg",i,[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=["svg",i,[["path",{d:"M13 16a3 3 0 0 1 2.24 5"}],["path",{d:"M18 12h.01"}],["path",{d:"M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"}],["path",{d:"M20 8.54V4a2 2 0 1 0-4 0v3"}],["path",{d:"M7.612 12.524a3 3 0 1 0-1.6 4.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=["svg",i,[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34"}],["path",{d:"M4 6h.01"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67"}],["path",{d:"M12 18h.01"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"m13.41 10.59 5.66-5.66"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=["svg",i,[["path",{d:"M12 12h0.01"}],["path",{d:"M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z"}],["path",{d:"M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z"}],["path",{d:"M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2.7-2.8.7-4 0-1.1 1.8-2 3.4-2.5 4.3z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=["svg",i,[["path",{d:"M3 12h4l3 9 4-17h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x=["svg",i,[["path",{d:"M5 16v2"}],["path",{d:"M19 16v2"}],["rect",{width:"20",height:"8",x:"2",y:"8",rx:"2"}],["path",{d:"M18 12h0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lx=["svg",i,[["path",{d:"M4.9 16.1C1 12.2 1 5.8 4.9 1.9"}],["path",{d:"M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"}],["circle",{cx:"12",cy:"9",r:"2"}],["path",{d:"M16.2 4.8c2 2 2.26 5.11.8 7.47"}],["path",{d:"M19.1 1.9a9.96 9.96 0 0 1 0 14.1"}],["path",{d:"M9.5 18h5"}],["path",{d:"m8 22 4-11 4 11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=["svg",i,[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=["svg",i,[["path",{d:"M20.34 17.52a10 10 0 1 0-2.82 2.82"}],["circle",{cx:"19",cy:"19",r:"2"}],["path",{d:"m13.41 13.41 4.18 4.18"}],["circle",{cx:"12",cy:"12",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=["svg",i,[["path",{d:"M5 15h14"}],["path",{d:"M5 9h14"}],["path",{d:"m14 20-5-5 6-6-5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=["svg",i,[["path",{d:"M22 17a10 10 0 0 0-20 0"}],["path",{d:"M6 17a6 6 0 0 1 12 0"}],["path",{d:"M10 17a2 2 0 0 1 4 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=["svg",i,[["path",{d:"M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"}],["path",{d:"M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"}],["path",{d:"M13.2 18a3 3 0 0 0-2.2-5"}],["path",{d:"M13 22H4a2 2 0 0 1 0-4h12"}],["path",{d:"M16 9h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=["svg",i,[["rect",{width:"12",height:"20",x:"6",y:"2",rx:"2"}],["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M12 6.5v11"}],["path",{d:"M15 9.4a4 4 0 1 0 0 5.2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 12h5"}],["path",{d:"M16 9.5a4 4 0 1 0 0 5.2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 7h8"}],["path",{d:"M12 17.5 8 15h1a4 4 0 0 0 0-8"}],["path",{d:"M8 11h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"m12 10 3-3"}],["path",{d:"m9 7 3 3v7.5"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 13h5"}],["path",{d:"M10 17V9.5a2.5 2.5 0 0 1 5 0"}],["path",{d:"M8 17h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 15h5"}],["path",{d:"M8 11h5a2 2 0 1 0 0-4h-3v10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M10 17V7h5"}],["path",{d:"M10 11h4"}],["path",{d:"M8 15h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M14 8H8"}],["path",{d:"M16 12H8"}],["path",{d:"M13 16H8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=["svg",i,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{d:"M12 17.5v-11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const va=["svg",i,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}],["path",{d:"M12 12h.01"}],["path",{d:"M17 12h.01"}],["path",{d:"M7 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=["svg",i,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=["svg",i,[["rect",{width:"12",height:"20",x:"6",y:"2",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=["svg",i,[["path",{d:"M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"}],["path",{d:"M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"}],["path",{d:"m14 16-3 3 3 3"}],["path",{d:"M8.293 13.596 7.196 9.5 3.1 10.598"}],["path",{d:"m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"}],["path",{d:"m13.378 9.633 4.096 1.098 1.097-4.096"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=["svg",i,[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t9=["svg",i,[["circle",{cx:"12",cy:"17",r:"1"}],["path",{d:"M21 7v6h-6"}],["path",{d:"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e9=["svg",i,[["path",{d:"M21 7v6h-6"}],["path",{d:"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a9=["svg",i,[["path",{d:"M3 2v6h6"}],["path",{d:"M21 12A9 9 0 0 0 6 5.3L3 8"}],["path",{d:"M21 22v-6h-6"}],["path",{d:"M3 12a9 9 0 0 0 15 6.7l3-2.7"}],["circle",{cx:"12",cy:"12",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n9=["svg",i,[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"}],["path",{d:"M16 16h5v5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r9=["svg",i,[["path",{d:"M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47"}],["path",{d:"M8 16H3v5"}],["path",{d:"M3 12C3 9.51 4 7.26 5.64 5.64"}],["path",{d:"m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64"}],["path",{d:"M21 12c0 1-.16 1.97-.47 2.87"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M22 22 2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i9=["svg",i,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s9=["svg",i,[["path",{d:"M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"}],["path",{d:"M5 10h14"}],["path",{d:"M15 7v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h9=["svg",i,[["path",{d:"M17 3v10"}],["path",{d:"m12.67 5.5 8.66 5"}],["path",{d:"m12.67 10.5 8.66-5"}],["path",{d:"M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o9=["svg",i,[["path",{d:"M4 7V4h16v3"}],["path",{d:"M5 20h6"}],["path",{d:"M13 4 8 20"}],["path",{d:"m15 15 5 5"}],["path",{d:"m20 15-5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c9=["svg",i,[["path",{d:"m17 2 4 4-4 4"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{d:"m7 22-4-4 4-4"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3"}],["path",{d:"M11 10h1v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d9=["svg",i,[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l9=["svg",i,[["path",{d:"m17 2 4 4-4 4"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{d:"m7 22-4-4 4-4"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p9=["svg",i,[["path",{d:"M14 4c0-1.1.9-2 2-2"}],["path",{d:"M20 2c1.1 0 2 .9 2 2"}],["path",{d:"M22 8c0 1.1-.9 2-2 2"}],["path",{d:"M16 10c-1.1 0-2-.9-2-2"}],["path",{d:"m3 7 3 3 3-3"}],["path",{d:"M6 10V5c0-1.7 1.3-3 3-3h1"}],["rect",{width:"8",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M14 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}],["path",{d:"M20 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u9=["svg",i,[["path",{d:"M14 4c0-1.1.9-2 2-2"}],["path",{d:"M20 2c1.1 0 2 .9 2 2"}],["path",{d:"M22 8c0 1.1-.9 2-2 2"}],["path",{d:"M16 10c-1.1 0-2-.9-2-2"}],["path",{d:"m3 7 3 3 3-3"}],["path",{d:"M6 10V5c0-1.7 1.3-3 3-3h1"}],["rect",{width:"8",height:"8",x:"2",y:"14",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g9=["svg",i,[["polyline",{points:"7 17 2 12 7 7"}],["polyline",{points:"12 17 7 12 12 7"}],["path",{d:"M22 18v-2a4 4 0 0 0-4-4H7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f9=["svg",i,[["polyline",{points:"9 17 4 12 9 7"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x9=["svg",i,[["polygon",{points:"11 19 2 12 11 5 11 19"}],["polygon",{points:"22 19 13 12 22 5 22 19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M9=["svg",i,[["path",{d:"M17.75 9.01c-.52 2.08-1.83 3.64-3.18 5.49l-2.6 3.54-2.97 4-3.5-2.54 3.85-4.97c-1.86-2.61-2.8-3.77-3.16-5.44"}],["path",{d:"M17.75 9.01A7 7 0 0 0 6.2 9.1C6.06 8.5 6 7.82 6 7c0-3.5 2.83-5 5.98-5C15.24 2 18 3.5 18 7c0 .73-.09 1.4-.25 2.01Z"}],["path",{d:"m9.35 14.53 2.64-3.31"}],["path",{d:"m11.97 18.04 2.99 4 3.54-2.54-3.93-5"}],["path",{d:"M14 8c0 1-1 2-2.01 3.22C11 10 10 9 10 8a2 2 0 1 1 4 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v9=["svg",i,[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y9=["svg",i,[["polyline",{points:"3.5 2 6.5 12.5 18 12.5"}],["line",{x1:"9.5",x2:"5.5",y1:"12.5",y2:"20"}],["line",{x1:"15",x2:"18.5",y1:"12.5",y2:"20"}],["path",{d:"M2.75 18a13 13 0 0 0 18.5 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m9=["svg",i,[["path",{d:"M6 19V5"}],["path",{d:"M10 19V6.8"}],["path",{d:"M14 19v-7.8"}],["path",{d:"M18 5v4"}],["path",{d:"M18 19v-6"}],["path",{d:"M22 19V9"}],["path",{d:"M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ya=["svg",i,[["path",{d:"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"}],["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814"}],["path",{d:"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w9=["svg",i,[["path",{d:"M20 9V7a2 2 0 0 0-2-2h-6"}],["path",{d:"m15 2-3 3 3 3"}],["path",{d:"M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A9=["svg",i,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C9=["svg",i,[["path",{d:"M12 5H6a2 2 0 0 0-2 2v3"}],["path",{d:"m9 8 3-3-3-3"}],["path",{d:"M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E9=["svg",i,[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I9=["svg",i,[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5c.4 0 .9-.1 1.3-.2"}],["path",{d:"M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12"}],["path",{d:"m2 2 20 20"}],["path",{d:"M21 15.3a3.5 3.5 0 0 0-3.3-3.3"}],["path",{d:"M15 5h-4.3"}],["circle",{cx:"18",cy:"5",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b9=["svg",i,[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S9=["svg",i,[["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6.01 18H6"}],["path",{d:"M10.01 18H10"}],["path",{d:"M15 10v4"}],["path",{d:"M17.84 7.17a4 4 0 0 0-5.66 0"}],["path",{d:"M20.66 4.34a8 8 0 0 0-11.31 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 12h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M21 9H3"}],["path",{d:"M21 15H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T9=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M21 7.5H3"}],["path",{d:"M21 12H3"}],["path",{d:"M21 16.5H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N9=["svg",i,[["path",{d:"M4 11a9 9 0 0 1 9 9"}],["path",{d:"M4 4a16 16 0 0 1 16 16"}],["circle",{cx:"5",cy:"19",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R9=["svg",i,[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O9=["svg",i,[["path",{d:"M6 11h8a4 4 0 0 0 0-8H9v18"}],["path",{d:"M6 15h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D9=["svg",i,[["path",{d:"M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"}],["path",{d:"M21 14 10 2 3 14h18Z"}],["path",{d:"M10 2v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _9=["svg",i,[["path",{d:"M7 21h10"}],["path",{d:"M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"}],["path",{d:"M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"}],["path",{d:"m13 12 4-4"}],["path",{d:"M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L9=["svg",i,[["path",{d:"M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"}],["path",{d:"M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"}],["path",{d:"m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"}],["path",{d:"M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B9=["svg",i,[["path",{d:"M4 10a7.31 7.31 0 0 0 10 10Z"}],["path",{d:"m9 15 3-3"}],["path",{d:"M17 13a6 6 0 0 0-6-6"}],["path",{d:"M21 13A10 10 0 0 0 11 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P9=["svg",i,[["path",{d:"M13 7 9 3 5 7l4 4"}],["path",{d:"m17 11 4 4-4 4-4-4"}],["path",{d:"m8 12 4 4 6-6-4-4Z"}],["path",{d:"m16 8 3-3"}],["path",{d:"M9 21a6 6 0 0 0-6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H9=["svg",i,[["path",{d:"M10 2v3a1 1 0 0 0 1 1h5"}],["path",{d:"M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6"}],["path",{d:"M18 22H4a2 2 0 0 1-2-2V6"}],["path",{d:"M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F9=["svg",i,[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aa=["svg",i,[["circle",{cx:"19",cy:"19",r:"2"}],["circle",{cx:"5",cy:"5",r:"2"}],["path",{d:"M5 7v12h12"}],["path",{d:"m5 19 6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V9=["svg",i,[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}],["path",{d:"M7 21h10"}],["path",{d:"M12 3v18"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k9=["svg",i,[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M14 15H9v-5"}],["path",{d:"M16 3h5v5"}],["path",{d:"M21 3 9 15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U9=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M8 7v10"}],["path",{d:"M12 7v10"}],["path",{d:"M17 7v10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z9=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{cx:"12",cy:"12",r:"1"}],["path",{d:"M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G9=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 9h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W9=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M7 12h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z9=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"m16 16-1.9-1.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X9=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M7 8h8"}],["path",{d:"M7 12h10"}],["path",{d:"M7 16h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q9=["svg",i,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y9=["svg",i,[["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}],["circle",{cx:"18.5",cy:"5.5",r:".5",fill:"currentColor"}],["circle",{cx:"11.5",cy:"11.5",r:".5",fill:"currentColor"}],["circle",{cx:"7.5",cy:"16.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"14.5",r:".5",fill:"currentColor"}],["path",{d:"M3 3v18h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j9=["svg",i,[["path",{d:"M14 22v-4a2 2 0 1 0-4 0v4"}],["path",{d:"m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"}],["path",{d:"M18 5v17"}],["path",{d:"m4 6 8-4 8 4"}],["path",{d:"M6 5v17"}],["circle",{cx:"12",cy:"9",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K9=["svg",i,[["path",{d:"M5.42 9.42 8 12"}],["circle",{cx:"4",cy:"8",r:"2"}],["path",{d:"m14 6-8.58 8.58"}],["circle",{cx:"4",cy:"16",r:"2"}],["path",{d:"M10.8 14.8 14 18"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q9=["svg",i,[["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M8.12 8.12 12 12"}],["path",{d:"M20 4 8.12 15.88"}],["circle",{cx:"6",cy:"18",r:"3"}],["path",{d:"M14.8 14.8 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J9=["svg",i,[["path",{d:"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}],["path",{d:"m22 3-5 5"}],["path",{d:"m17 3 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $9=["svg",i,[["path",{d:"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}],["path",{d:"m17 8 5-5"}],["path",{d:"M17 3h5v5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tM=["svg",i,[["path",{d:"M15 12h-5"}],["path",{d:"M15 8h-5"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eM=["svg",i,[["path",{d:"M19 17V5a2 2 0 0 0-2-2H4"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aM=["svg",i,[["path",{d:"m8 11 2 2 4-4"}],["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nM=["svg",i,[["path",{d:"m13 13.5 2-2.5-2-2.5"}],["path",{d:"m21 21-4.3-4.3"}],["path",{d:"M9 8.5 7 11l2 2.5"}],["circle",{cx:"11",cy:"11",r:"8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rM=["svg",i,[["path",{d:"m13.5 8.5-5 5"}],["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iM=["svg",i,[["path",{d:"m13.5 8.5-5 5"}],["path",{d:"m8.5 8.5 5 5"}],["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sM=["svg",i,[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca=["svg",i,[["path",{d:"m3 3 3 9-3 9 19-9Z"}],["path",{d:"M6 12h16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hM=["svg",i,[["rect",{x:"14",y:"14",width:"8",height:"8",rx:"2"}],["rect",{x:"2",y:"2",width:"8",height:"8",rx:"2"}],["path",{d:"M7 14v1a2 2 0 0 0 2 2h1"}],["path",{d:"M14 7h1a2 2 0 0 1 2 2v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oM=["svg",i,[["path",{d:"m22 2-7 20-4-9-9-4Z"}],["path",{d:"M22 2 11 13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cM=["svg",i,[["line",{x1:"3",x2:"21",y1:"12",y2:"12"}],["polyline",{points:"8 8 12 4 16 8"}],["polyline",{points:"16 16 12 20 8 16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dM=["svg",i,[["line",{x1:"12",x2:"12",y1:"3",y2:"21"}],["polyline",{points:"8 8 4 12 8 16"}],["polyline",{points:"16 16 20 12 16 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lM=["svg",i,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"}],["path",{d:"M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"}],["path",{d:"M6 6h.01"}],["path",{d:"M6 18h.01"}],["path",{d:"m15.7 13.4-.9-.3"}],["path",{d:"m9.2 10.9-.9-.3"}],["path",{d:"m10.6 15.7.3-.9"}],["path",{d:"m13.6 15.7-.4-1"}],["path",{d:"m10.8 9.3-.4-1"}],["path",{d:"m8.3 13.6 1-.4"}],["path",{d:"m14.7 10.8 1-.4"}],["path",{d:"m13.4 8.3-.3.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pM=["svg",i,[["path",{d:"M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"}],["path",{d:"M6 6h.01"}],["path",{d:"M6 18h.01"}],["path",{d:"m13 6-4 6h6l-4 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uM=["svg",i,[["path",{d:"M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5"}],["path",{d:"M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z"}],["path",{d:"M22 17v-1a2 2 0 0 0-2-2h-1"}],["path",{d:"M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z"}],["path",{d:"M6 18h.01"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gM=["svg",i,[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fM=["svg",i,[["path",{d:"M20 7h-9"}],["path",{d:"M14 17H5"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xM=["svg",i,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MM=["svg",i,[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vM=["svg",i,[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yM=["svg",i,[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}],["polyline",{points:"16 6 12 2 8 6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mM=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["line",{x1:"3",x2:"21",y1:"9",y2:"9"}],["line",{x1:"3",x2:"21",y1:"15",y2:"15"}],["line",{x1:"9",x2:"9",y1:"9",y2:"21"}],["line",{x1:"15",x2:"15",y1:"9",y2:"21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wM=["svg",i,[["path",{d:"M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m4.243 5.21 14.39 12.472"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 22V2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M9 12h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TM=["svg",i,[["path",{d:"m2 2 20 20"}],["path",{d:"M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"}],["path",{d:"M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M9 12h6"}],["path",{d:"M12 9v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m14.5 9.5-5 5"}],["path",{d:"m9.5 9.5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OM=["svg",i,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DM=["svg",i,[["circle",{cx:"12",cy:"12",r:"8"}],["path",{d:"M12 2v7.5"}],["path",{d:"m19 5-5.23 5.23"}],["path",{d:"M22 12h-7.5"}],["path",{d:"m19 19-5.23-5.23"}],["path",{d:"M12 14.5V22"}],["path",{d:"M10.23 13.77 5 19"}],["path",{d:"M9.5 12H2"}],["path",{d:"M10.23 10.23 5 5"}],["circle",{cx:"12",cy:"12",r:"2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _M=["svg",i,[["path",{d:"M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"}],["path",{d:"M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"}],["path",{d:"M12 10v4"}],["path",{d:"M12 2v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LM=["svg",i,[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BM=["svg",i,[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"}],["path",{d:"M3 6h18"}],["path",{d:"M16 10a4 4 0 0 1-8 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PM=["svg",i,[["path",{d:"m15 11-1 9"}],["path",{d:"m19 11-4-7"}],["path",{d:"M2 11h20"}],["path",{d:"m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"}],["path",{d:"M4.5 15.5h15"}],["path",{d:"m5 11 4-7"}],["path",{d:"m9 11 1 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HM=["svg",i,[["circle",{cx:"8",cy:"21",r:"1"}],["circle",{cx:"19",cy:"21",r:"1"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FM=["svg",i,[["path",{d:"M2 22v-5l5-5 5 5-5 5z"}],["path",{d:"M9.5 14.5 16 8"}],["path",{d:"m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VM=["svg",i,[["path",{d:"m4 4 2.5 2.5"}],["path",{d:"M13.5 6.5a4.95 4.95 0 0 0-7 7"}],["path",{d:"M15 5 5 15"}],["path",{d:"M14 17v.01"}],["path",{d:"M10 16v.01"}],["path",{d:"M13 13v.01"}],["path",{d:"M16 10v.01"}],["path",{d:"M11 20v.01"}],["path",{d:"M17 14v.01"}],["path",{d:"M20 11v.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kM=["svg",i,[["path",{d:"m15 15 6 6m-6-6v4.8m0-4.8h4.8"}],["path",{d:"M9 19.8V15m0 0H4.2M9 15l-6 6"}],["path",{d:"M15 4.2V9m0 0h4.8M15 9l6-6"}],["path",{d:"M9 4.2V9m0 0H4.2M9 9 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UM=["svg",i,[["path",{d:"M12 22v-7l-2-2"}],["path",{d:"M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"}],["path",{d:"m14 14-2 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZM=["svg",i,[["path",{d:"M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"}],["path",{d:"m18 2 4 4-4 4"}],["path",{d:"M2 6h1.9c1.5 0 2.9.9 3.6 2.2"}],["path",{d:"M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"}],["path",{d:"m18 14 4 4-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GM=["svg",i,[["path",{d:"M18 7V4H6l6 8-6 8h12v-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WM=["svg",i,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}],["path",{d:"M12 20v-8"}],["path",{d:"M17 20V8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zM=["svg",i,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XM=["svg",i,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}],["path",{d:"M12 20v-8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qM=["svg",i,[["path",{d:"M2 20h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YM=["svg",i,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}],["path",{d:"M12 20v-8"}],["path",{d:"M17 20V8"}],["path",{d:"M22 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jM=["svg",i,[["path",{d:"M10 9H4L2 7l2-2h6"}],["path",{d:"M14 5h6l2 2-2 2h-6"}],["path",{d:"M10 22V4a2 2 0 1 1 4 0v18"}],["path",{d:"M8 22h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KM=["svg",i,[["path",{d:"M12 3v3"}],["path",{d:"M18.5 13h-13L2 9.5 5.5 6h13L22 9.5Z"}],["path",{d:"M12 13v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QM=["svg",i,[["path",{d:"M7 18v-6a5 5 0 1 1 10 0v6"}],["path",{d:"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"}],["path",{d:"M21 12h1"}],["path",{d:"M18.5 4.5 18 5"}],["path",{d:"M2 12h1"}],["path",{d:"M12 2v1"}],["path",{d:"m4.929 4.929.707.707"}],["path",{d:"M12 12v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JM=["svg",i,[["polygon",{points:"19 20 9 12 19 4 19 20"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $M=["svg",i,[["polygon",{points:"5 4 15 12 5 20 5 4"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tv=["svg",i,[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["path",{d:"M8 20v2h8v-2"}],["path",{d:"m12.5 17-.5-1-.5 1h1z"}],["path",{d:"M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ev=["svg",i,[["rect",{width:"3",height:"8",x:"13",y:"2",rx:"1.5"}],["path",{d:"M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5"}],["rect",{width:"3",height:"8",x:"8",y:"14",rx:"1.5"}],["path",{d:"M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5"}],["rect",{width:"8",height:"3",x:"14",y:"13",rx:"1.5"}],["path",{d:"M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5"}],["rect",{width:"8",height:"3",x:"2",y:"8",rx:"1.5"}],["path",{d:"M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const av=["svg",i,[["path",{d:"M22 2 2 22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nv=["svg",i,[["path",{d:"m8 14-6 6h9v-3"}],["path",{d:"M18.37 3.63 8 14l3 3L21.37 6.63a2.12 2.12 0 1 0-3-3Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rv=["svg",i,[["line",{x1:"21",x2:"14",y1:"4",y2:"4"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia=["svg",i,[["line",{x1:"4",x2:"4",y1:"21",y2:"14"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iv=["svg",i,[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2"}],["path",{d:"M12.667 8 10 12h4l-2.667 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sv=["svg",i,[["rect",{width:"7",height:"12",x:"2",y:"6",rx:"1"}],["path",{d:"M13 8.32a7.43 7.43 0 0 1 0 7.36"}],["path",{d:"M16.46 6.21a11.76 11.76 0 0 1 0 11.58"}],["path",{d:"M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hv=["svg",i,[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2"}],["path",{d:"M12 18h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ov=["svg",i,[["path",{d:"M22 11v1a10 10 0 1 1-9-10"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}],["path",{d:"M16 5h6"}],["path",{d:"M19 2v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cv=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dv=["svg",i,[["path",{d:"M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"}],["circle",{cx:"10",cy:"13",r:"8"}],["path",{d:"M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"}],["path",{d:"M18 3 19.1 5.2"}],["path",{d:"M22 3 20.9 5.2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lv=["svg",i,[["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"m20 16-4-4 4-4"}],["path",{d:"m4 8 4 4-4 4"}],["path",{d:"m16 4-4 4-4-4"}],["path",{d:"m8 20 4-4 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pv=["svg",i,[["path",{d:"M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"}],["path",{d:"M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"}],["path",{d:"M4 18v2"}],["path",{d:"M20 18v2"}],["path",{d:"M12 4v9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uv=["svg",i,[["path",{d:"M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"}],["path",{d:"M7 21h10"}],["path",{d:"M19.5 12 22 6"}],["path",{d:"M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"}],["path",{d:"M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"}],["path",{d:"M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=["svg",i,[["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fv=["svg",i,[["path",{d:"M5 9c-1.5 1.5-3 3.2-3 5.5A5.5 5.5 0 0 0 7.5 20c1.8 0 3-.5 4.5-2 1.5 1.5 2.7 2 4.5 2a5.5 5.5 0 0 0 5.5-5.5c0-2.3-1.5-4-3-5.5l-7-7-7 7Z"}],["path",{d:"M12 18v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xv=["svg",i,[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=["svg",i,[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}],["path",{d:"M4 17v2"}],["path",{d:"M5 18H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mv=["svg",i,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M12 6h.01"}],["circle",{cx:"12",cy:"14",r:"4"}],["path",{d:"M12 14h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vv=["svg",i,[["path",{d:"M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"}],["path",{d:"M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"}],["path",{d:"M17 15a3.5 3.5 0 0 0-.025-4.975"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=["svg",i,[["path",{d:"m6 16 6-12 6 12"}],["path",{d:"M8 12h8"}],["path",{d:"M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mv=["svg",i,[["path",{d:"m6 16 6-12 6 12"}],["path",{d:"M8 12h8"}],["path",{d:"m16 20 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wv=["svg",i,[["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}],["path",{d:"M5 17A12 12 0 0 1 17 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Av=["svg",i,[["path",{d:"M16 3h5v5"}],["path",{d:"M8 3H3v5"}],["path",{d:"M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"}],["path",{d:"m15 9 6-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=["svg",i,[["path",{d:"M3 3h.01"}],["path",{d:"M7 5h.01"}],["path",{d:"M11 7h.01"}],["path",{d:"M3 7h.01"}],["path",{d:"M7 9h.01"}],["path",{d:"M3 11h.01"}],["rect",{width:"4",height:"4",x:"15",y:"5"}],["path",{d:"m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"}],["path",{d:"m13 14 8-2"}],["path",{d:"m13 19 8-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ev=["svg",i,[["path",{d:"M7 20h10"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M17 12h-2l-2 5-2-10-2 5H7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m16 8-8 8"}],["path",{d:"M16 16H8V8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Na=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m8 8 8 8"}],["path",{d:"M16 8v8H8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 8v8"}],["path",{d:"m8 12 4 4 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m12 8-4 4 4 4"}],["path",{d:"M16 12H8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Da=["svg",i,[["path",{d:"M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"}],["path",{d:"m3 21 9-9"}],["path",{d:"M9 21H3v-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a=["svg",i,[["path",{d:"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}],["path",{d:"m21 21-9-9"}],["path",{d:"M21 15v6h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const La=["svg",i,[["path",{d:"M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"}],["path",{d:"m3 3 9 9"}],["path",{d:"M3 9V3h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ba=["svg",i,[["path",{d:"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"}],["path",{d:"m21 3-9 9"}],["path",{d:"M15 3h6v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 12h8"}],["path",{d:"m12 16 4-4-4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ha=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 16V8h8"}],["path",{d:"M16 16 8 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 8h8v8"}],["path",{d:"m8 16 8-8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Va=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m16 12-4-4-4 4"}],["path",{d:"M12 16V8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ka=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 8v8"}],["path",{d:"m8.5 14 7-4"}],["path",{d:"m8.5 10 7 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ua=["svg",i,[["path",{d:"M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2"}],["path",{d:"M10 22H8"}],["path",{d:"M16 22h-2"}],["circle",{cx:"8",cy:"8",r:"2"}],["path",{d:"M9.414 9.414 12 12"}],["path",{d:"M14.8 14.8 18 18"}],["circle",{cx:"8",cy:"16",r:"2"}],["path",{d:"m18 6-8.586 8.586"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Za=["svg",i,[["path",{d:"m9 11 3 3L22 4"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ga=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m16 10-4 4-4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const za=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m14 16-4-4 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m10 8 4 4-4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m8 14 4-4 4 4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ya=["svg",i,[["path",{d:"M10 9.5 8 12l2 2.5"}],["path",{d:"m14 9.5 2 2.5-2 2.5"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iv=["svg",i,[["path",{d:"M10 9.5 8 12l2 2.5"}],["path",{d:"M14 21h1"}],["path",{d:"m14 9.5 2 2.5-2 2.5"}],["path",{d:"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"}],["path",{d:"M9 21h1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=["svg",i,[["path",{d:"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"}],["path",{d:"M9 21h1"}],["path",{d:"M14 21h1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=["svg",i,[["path",{d:"M8 7v7"}],["path",{d:"M12 7v4"}],["path",{d:"M16 7v9"}],["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M9 3h1"}],["path",{d:"M14 3h1"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"M21 9v1"}],["path",{d:"M21 14v1"}],["path",{d:"M21 19a2 2 0 0 1-2 2"}],["path",{d:"M14 21h1"}],["path",{d:"M9 21h1"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M3 14v1"}],["path",{d:"M3 9v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ka=["svg",i,[["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"m12 12 4 10 1.7-4.3L22 16Z"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M9 3h1"}],["path",{d:"M9 21h2"}],["path",{d:"M14 3h1"}],["path",{d:"M3 9v1"}],["path",{d:"M21 9v2"}],["path",{d:"M3 14v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"16",y2:"16"}],["line",{x1:"12",x2:"12",y1:"8",y2:"8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ja=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"12",cy:"12",r:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $a=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 10h10"}],["path",{d:"M7 14h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"}],["path",{d:"M9 11.2h5.7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const en=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 8h7"}],["path",{d:"M8 12h6"}],["path",{d:"M11 16h5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 7v7"}],["path",{d:"M12 7v4"}],["path",{d:"M16 7v9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 7v10"}],["path",{d:"M11 7v10"}],["path",{d:"m15 7 2 10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 16V8l4 4 4-4v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 8h10"}],["path",{d:"M7 12h10"}],["path",{d:"M7 16h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 12h8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on=["svg",i,[["path",{d:"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}],["path",{d:"m12 12 4 10 1.7-4.3L22 16Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn=["svg",i,[["path",{d:"M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41"}],["path",{d:"M3 8.7V19a2 2 0 0 0 2 2h10.3"}],["path",{d:"m2 2 20 20"}],["path",{d:"M13 13a3 3 0 1 0 0-6H9v2"}],["path",{d:"M9 17v-2.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 17V7h4a3 3 0 0 1 0 6H9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L1=["svg",i,[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m15 9-6 6"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 15h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 7h10"}],["path",{d:"M10 7v10"}],["path",{d:"M16 17a2 2 0 0 1-2-2V7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 12H9.5a2.5 2.5 0 0 1 0-5H17"}],["path",{d:"M12 7v10"}],["path",{d:"M16 7v10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m9 8 6 4-6 4Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 7v5"}],["path",{d:"M8 9a5.14 5.14 0 0 0 4 8 4.95 4.95 0 0 0 4-8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=["svg",i,[["path",{d:"M7 12h2l2 5 2-10h4"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mn=["svg",i,[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"2"}],["circle",{cx:"8",cy:"8",r:"2"}],["path",{d:"M9.414 9.414 12 12"}],["path",{d:"M14.8 14.8 18 18"}],["circle",{cx:"8",cy:"16",r:"2"}],["path",{d:"m18 6-8.586 8.586"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M16 8.9V7H8l4 5-4 5h8v-1.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["line",{x1:"9",x2:"15",y1:"15",y2:"9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=["svg",i,[["path",{d:"M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3"}],["path",{d:"M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wn=["svg",i,[["path",{d:"M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3"}],["path",{d:"M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tv=["svg",i,[["path",{d:"M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["path",{d:"M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["rect",{width:"8",height:"8",x:"14",y:"14",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const An=["svg",i,[["path",{d:"m7 11 2-2-2-2"}],["path",{d:"M11 13h4"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=["svg",i,[["path",{d:"M18 21a6 6 0 0 0-12 0"}],["circle",{cx:"12",cy:"11",r:"4"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const En=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const In=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rv=["svg",i,[["path",{d:"M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ov=["svg",i,[["path",{d:"M15.236 22a3 3 0 0 0-2.2-5"}],["path",{d:"M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4"}],["path",{d:"M18 13h.01"}],["path",{d:"M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=["svg",i,[["path",{d:"M5 22h14"}],["path",{d:"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"}],["path",{d:"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _v=["svg",i,[["path",{d:"M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lv=["svg",i,[["path",{d:"M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43"}],["path",{d:"M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bv=["svg",i,[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pv=["svg",i,[["line",{x1:"18",x2:"18",y1:"20",y2:"4"}],["polygon",{points:"14,20 4,12 14,4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hv=["svg",i,[["line",{x1:"6",x2:"6",y1:"4",y2:"20"}],["polygon",{points:"10,4 20,12 10,20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fv=["svg",i,[["path",{d:"M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"}],["path",{d:"M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"}],["circle",{cx:"20",cy:"10",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vv=["svg",i,[["path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"}],["path",{d:"M14 3v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 13h0"}],["path",{d:"M16 13h0"}],["path",{d:"M10 16s.8 1 2 1c1.3 0 2-1 2-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kv=["svg",i,[["path",{d:"M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"}],["path",{d:"M15 3v4a2 2 0 0 0 2 2h4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uv=["svg",i,[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"}],["path",{d:"M2 7h20"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zv=["svg",i,[["rect",{width:"20",height:"6",x:"2",y:"4",rx:"2"}],["rect",{width:"20",height:"6",x:"2",y:"14",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gv=["svg",i,[["rect",{width:"6",height:"20",x:"4",y:"2",rx:"2"}],["rect",{width:"6",height:"20",x:"14",y:"2",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wv=["svg",i,[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zv=["svg",i,[["path",{d:"m4 5 8 8"}],["path",{d:"m12 5-8 8"}],["path",{d:"M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xv=["svg",i,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 4h.01"}],["path",{d:"M20 12h.01"}],["path",{d:"M12 20h.01"}],["path",{d:"M4 12h.01"}],["path",{d:"M17.657 6.343h.01"}],["path",{d:"M17.657 17.657h.01"}],["path",{d:"M6.343 17.657h.01"}],["path",{d:"M6.343 6.343h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qv=["svg",i,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 3v1"}],["path",{d:"M12 20v1"}],["path",{d:"M3 12h1"}],["path",{d:"M20 12h1"}],["path",{d:"m18.364 5.636-.707.707"}],["path",{d:"m6.343 17.657-.707.707"}],["path",{d:"m5.636 5.636.707.707"}],["path",{d:"m17.657 17.657.707.707"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yv=["svg",i,[["path",{d:"M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.9 4.9 1.4 1.4"}],["path",{d:"m17.7 17.7 1.4 1.4"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.3 17.7-1.4 1.4"}],["path",{d:"m19.1 4.9-1.4 1.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jv=["svg",i,[["path",{d:"M10 9a3 3 0 1 0 0 6"}],["path",{d:"M2 12h1"}],["path",{d:"M14 21V3"}],["path",{d:"M10 4V3"}],["path",{d:"M10 21v-1"}],["path",{d:"m3.64 18.36.7-.7"}],["path",{d:"m4.34 6.34-.7-.7"}],["path",{d:"M14 12h8"}],["path",{d:"m17 4-3 3"}],["path",{d:"m14 17 3 3"}],["path",{d:"m21 15-3-3 3-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kv=["svg",i,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qv=["svg",i,[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jv=["svg",i,[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $v=["svg",i,[["path",{d:"m4 19 8-8"}],["path",{d:"m12 19-8-8"}],["path",{d:"M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ty=["svg",i,[["path",{d:"M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"}],["path",{d:"M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"}],["path",{d:"M 7 17h0.01"}],["path",{d:"m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ey=["svg",i,[["path",{d:"M10 21V3h8"}],["path",{d:"M6 16h9"}],["path",{d:"M10 9.5h7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ay=["svg",i,[["path",{d:"M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"}],["path",{d:"M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"m18 22-3-3 3-3"}],["path",{d:"m6 2 3 3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ny=["svg",i,[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ry=["svg",i,[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iy=["svg",i,[["path",{d:"m18 2 4 4"}],["path",{d:"m17 7 3-3"}],["path",{d:"M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"}],["path",{d:"m9 11 4 4"}],["path",{d:"m5 19-3 3"}],["path",{d:"m14 4 6 6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sy=["svg",i,[["path",{d:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hy=["svg",i,[["path",{d:"M12 21v-6"}],["path",{d:"M12 9V3"}],["path",{d:"M3 15h18"}],["path",{d:"M3 9h18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oy=["svg",i,[["path",{d:"M12 15V9"}],["path",{d:"M3 15h18"}],["path",{d:"M3 9h18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cy=["svg",i,[["path",{d:"M14 14v2"}],["path",{d:"M14 20v2"}],["path",{d:"M14 2v2"}],["path",{d:"M14 8v2"}],["path",{d:"M2 15h8"}],["path",{d:"M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"}],["path",{d:"M2 9h8"}],["path",{d:"M22 15h-4"}],["path",{d:"M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"}],["path",{d:"M22 9h-4"}],["path",{d:"M5 3v18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dy=["svg",i,[["path",{d:"M15 3v18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M21 9H3"}],["path",{d:"M21 15H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ly=["svg",i,[["path",{d:"M14 10h2"}],["path",{d:"M15 22v-8"}],["path",{d:"M15 2v4"}],["path",{d:"M2 10h2"}],["path",{d:"M20 10h2"}],["path",{d:"M3 19h18"}],["path",{d:"M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6"}],["path",{d:"M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2"}],["path",{d:"M8 10h2"}],["path",{d:"M9 22v-8"}],["path",{d:"M9 2v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const py=["svg",i,[["path",{d:"M12 3v18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uy=["svg",i,[["rect",{width:"10",height:"14",x:"3",y:"8",rx:"2"}],["path",{d:"M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"}],["path",{d:"M8 18h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gy=["svg",i,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy=["svg",i,[["circle",{cx:"7",cy:"7",r:"5"}],["circle",{cx:"17",cy:"17",r:"5"}],["path",{d:"M12 17h10"}],["path",{d:"m3.46 10.54 7.08-7.08"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xy=["svg",i,[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const My=["svg",i,[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vy=["svg",i,[["path",{d:"M4 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yy=["svg",i,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const my=["svg",i,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}],["path",{d:"M14 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wy=["svg",i,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}],["path",{d:"M14 4v16"}],["path",{d:"M19 4v16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ay=["svg",i,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}],["path",{d:"M14 4v16"}],["path",{d:"M19 4v16"}],["path",{d:"M22 6 2 18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cy=["svg",i,[["circle",{cx:"17",cy:"4",r:"2"}],["path",{d:"M15.59 5.41 5.41 15.59"}],["circle",{cx:"4",cy:"17",r:"2"}],["path",{d:"M12 22s-4-9-1.5-11.5S22 12 22 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ey=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iy=["svg",i,[["path",{d:"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"}],["path",{d:"m13.56 11.747 4.332-.924"}],["path",{d:"m16 21-3.105-6.21"}],["path",{d:"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"}],["path",{d:"m6.158 8.633 1.114 4.456"}],["path",{d:"m8 21 3.105-6.21"}],["circle",{cx:"12",cy:"13",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const by=["svg",i,[["circle",{cx:"4",cy:"4",r:"2"}],["path",{d:"m14 5 3-3 3 3"}],["path",{d:"m14 10 3-3 3 3"}],["path",{d:"M17 14V2"}],["path",{d:"M17 14H7l-5 8h20Z"}],["path",{d:"M8 14v8"}],["path",{d:"m9 14 5 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sy=["svg",i,[["path",{d:"M3.5 21 14 3"}],["path",{d:"M20.5 21 10 3"}],["path",{d:"M15.5 21 12 15l-3.5 6"}],["path",{d:"M2 21h20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ty=["svg",i,[["polyline",{points:"4 17 10 11 4 5"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bn=["svg",i,[["path",{d:"M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01v0a2.83 2.83 0 0 1 0-4L17 3"}],["path",{d:"m16 2 6 6"}],["path",{d:"M12 16H4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ny=["svg",i,[["path",{d:"M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"}],["path",{d:"M8.5 2h7"}],["path",{d:"M14.5 16h-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ry=["svg",i,[["path",{d:"M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2"}],["path",{d:"M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2"}],["path",{d:"M3 2h7"}],["path",{d:"M14 2h7"}],["path",{d:"M9 16H4"}],["path",{d:"M20 16h-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oy=["svg",i,[["path",{d:"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1"}],["path",{d:"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"}],["path",{d:"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"}],["path",{d:"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"}],["path",{d:"M9 7v10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dy=["svg",i,[["path",{d:"M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"}],["path",{d:"M7 22h1a4 4 0 0 0 4-4v-1"}],["path",{d:"M7 2h1a4 4 0 0 1 4 4v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _y=["svg",i,[["path",{d:"M17 6H3"}],["path",{d:"M21 12H8"}],["path",{d:"M21 18H8"}],["path",{d:"M3 12v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ly=["svg",i,[["path",{d:"M21 6H3"}],["path",{d:"M10 12H3"}],["path",{d:"M10 18H3"}],["circle",{cx:"17",cy:"15",r:"3"}],["path",{d:"m21 19-1.9-1.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=["svg",i,[["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"M21 19a2 2 0 0 1-2 2"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M9 3h1"}],["path",{d:"M9 21h1"}],["path",{d:"M14 3h1"}],["path",{d:"M14 21h1"}],["path",{d:"M3 9v1"}],["path",{d:"M21 9v1"}],["path",{d:"M3 14v1"}],["path",{d:"M21 14v1"}],["line",{x1:"7",x2:"15",y1:"8",y2:"8"}],["line",{x1:"7",x2:"17",y1:"12",y2:"12"}],["line",{x1:"7",x2:"13",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const By=["svg",i,[["path",{d:"M17 6.1H3"}],["path",{d:"M21 12.1H3"}],["path",{d:"M15.1 18H3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Py=["svg",i,[["path",{d:"M2 10s3-3 3-8"}],["path",{d:"M22 10s-3-3-3-8"}],["path",{d:"M10 2c0 4.4-3.6 8-8 8"}],["path",{d:"M14 2c0 4.4 3.6 8 8 8"}],["path",{d:"M2 10s2 2 2 5"}],["path",{d:"M22 10s-2 2-2 5"}],["path",{d:"M8 15h8"}],["path",{d:"M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"}],["path",{d:"M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hy=["svg",i,[["path",{d:"M2 12h10"}],["path",{d:"M9 4v16"}],["path",{d:"m3 9 3 3-3 3"}],["path",{d:"M12 6 9 9 6 6"}],["path",{d:"m6 18 3-3 1.5 1.5"}],["path",{d:"M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fy=["svg",i,[["path",{d:"M12 9a4 4 0 0 0-2 7.5"}],["path",{d:"M12 3v2"}],["path",{d:"m6.6 18.4-1.4 1.4"}],["path",{d:"M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}],["path",{d:"M4 13H2"}],["path",{d:"M6.34 7.34 4.93 5.93"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vy=["svg",i,[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ky=["svg",i,[["path",{d:"M17 14V2"}],["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uy=["svg",i,[["path",{d:"M7 10v12"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zy=["svg",i,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gy=["svg",i,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M9 12h6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wy=["svg",i,[["path",{d:"M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M9 9h.01"}],["path",{d:"m15 9-6 6"}],["path",{d:"M15 15h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zy=["svg",i,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M9 12h6"}],["path",{d:"M12 9v6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xy=["svg",i,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"m9.5 14.5 5-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=["svg",i,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"m9.5 14.5 5-5"}],["path",{d:"m9.5 9.5 5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yy=["svg",i,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M13 5v2"}],["path",{d:"M13 17v2"}],["path",{d:"M13 11v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jy=["svg",i,[["path",{d:"M10 2h4"}],["path",{d:"M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7"}],["path",{d:"M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2"}],["path",{d:"m2 2 20 20"}],["path",{d:"M12 12v-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ky=["svg",i,[["path",{d:"M10 2h4"}],["path",{d:"M12 14v-4"}],["path",{d:"M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"}],["path",{d:"M9 17H4v5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qy=["svg",i,[["line",{x1:"10",x2:"14",y1:"2",y2:"2"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11"}],["circle",{cx:"12",cy:"14",r:"8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jy=["svg",i,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6"}],["circle",{cx:"8",cy:"12",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $y=["svg",i,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6"}],["circle",{cx:"16",cy:"12",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tm=["svg",i,[["path",{d:"M21 4H3"}],["path",{d:"M18 8H6"}],["path",{d:"M19 12H9"}],["path",{d:"M16 16h-6"}],["path",{d:"M11 20H9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const em=["svg",i,[["ellipse",{cx:"12",cy:"11",rx:"3",ry:"2"}],["ellipse",{cx:"12",cy:"12.5",rx:"10",ry:"8.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const am=["svg",i,[["path",{d:"M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16"}],["path",{d:"M2 14h12"}],["path",{d:"M22 14h-2"}],["path",{d:"M12 20v-6"}],["path",{d:"m2 2 20 20"}],["path",{d:"M22 16V6a2 2 0 0 0-2-2H10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nm=["svg",i,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M2 14h20"}],["path",{d:"M12 20v-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rm=["svg",i,[["path",{d:"M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z"}],["path",{d:"M8 13v9"}],["path",{d:"M16 22v-9"}],["path",{d:"m9 6 1 7"}],["path",{d:"m15 6-1 7"}],["path",{d:"M12 6V2"}],["path",{d:"M13 2h-2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const im=["svg",i,[["rect",{width:"18",height:"12",x:"3",y:"8",rx:"1"}],["path",{d:"M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3"}],["path",{d:"M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sm=["svg",i,[["path",{d:"m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 5h-1"}],["path",{d:"M16 18h-5"}],["path",{d:"M18 5a1 1 0 0 0-1 1v5.573"}],["path",{d:"M3 4h9l1 7.246"}],["path",{d:"M4 11V4"}],["path",{d:"M7 15h.01"}],["path",{d:"M8 10.1V4"}],["circle",{cx:"18",cy:"18",r:"2"}],["circle",{cx:"7",cy:"15",r:"5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hm=["svg",i,[["path",{d:"M9.3 6.2a4.55 4.55 0 0 0 5.4 0"}],["path",{d:"M7.9 10.7c.9.8 2.4 1.3 4.1 1.3s3.2-.5 4.1-1.3"}],["path",{d:"M13.9 3.5a1.93 1.93 0 0 0-3.8-.1l-3 10c-.1.2-.1.4-.1.6 0 1.7 2.2 3 5 3s5-1.3 5-3c0-.2 0-.4-.1-.5Z"}],["path",{d:"m7.5 12.2-4.7 2.7c-.5.3-.8.7-.8 1.1s.3.8.8 1.1l7.6 4.5c.9.5 2.1.5 3 0l7.6-4.5c.7-.3 1-.7 1-1.1s-.3-.8-.8-1.1l-4.7-2.8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=["svg",i,[["path",{d:"M2 22V12a10 10 0 1 1 20 0v10"}],["path",{d:"M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8"}],["path",{d:"M10 15h.01"}],["path",{d:"M14 15h.01"}],["path",{d:"M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z"}],["path",{d:"m9 19-2 3"}],["path",{d:"m15 19 2 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cm=["svg",i,[["path",{d:"M8 3.1V7a4 4 0 0 0 8 0V3.1"}],["path",{d:"m9 15-1-1"}],["path",{d:"m15 15 1-1"}],["path",{d:"M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"}],["path",{d:"m8 19-2 3"}],["path",{d:"m16 19 2 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dm=["svg",i,[["path",{d:"M2 17 17 2"}],["path",{d:"m2 14 8 8"}],["path",{d:"m5 11 8 8"}],["path",{d:"m8 8 8 8"}],["path",{d:"m11 5 8 8"}],["path",{d:"m14 2 8 8"}],["path",{d:"M7 22 22 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tn=["svg",i,[["rect",{width:"16",height:"16",x:"4",y:"3",rx:"2"}],["path",{d:"M4 11h16"}],["path",{d:"M12 3v8"}],["path",{d:"m8 19-2 3"}],["path",{d:"m18 22-2-3"}],["path",{d:"M8 15h.01"}],["path",{d:"M16 15h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lm=["svg",i,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pm=["svg",i,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const um=["svg",i,[["path",{d:"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"}],["path",{d:"M12 19v3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nn=["svg",i,[["path",{d:"M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"}],["path",{d:"M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"}],["path",{d:"M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"}],["path",{d:"M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gm=["svg",i,[["path",{d:"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"}],["path",{d:"M12 22v-3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fm=["svg",i,[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"}],["path",{d:"M7 16v6"}],["path",{d:"M13 19v3"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xm=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["rect",{width:"3",height:"9",x:"7",y:"7"}],["rect",{width:"3",height:"5",x:"14",y:"7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mm=["svg",i,[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7"}],["polyline",{points:"16 17 22 17 22 11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vm=["svg",i,[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}],["polyline",{points:"16 7 22 7 22 13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rn=["svg",i,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ym=["svg",i,[["path",{d:"M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mm=["svg",i,[["path",{d:"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wm=["svg",i,[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18"}],["path",{d:"M4 22h16"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Am=["svg",i,[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{d:"M15 18H9"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{cx:"17",cy:"18",r:"2"}],["circle",{cx:"7",cy:"18",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cm=["svg",i,[["path",{d:"m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"}],["path",{d:"M4.82 7.9 8 10"}],["path",{d:"M15.18 7.9 12 10"}],["path",{d:"M16.93 10H20a2 2 0 0 1 0 4H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Em=["svg",i,[["path",{d:"M7 21h10"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Im=["svg",i,[["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",ry:"2"}],["polyline",{points:"17 2 12 7 7 2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bm=["svg",i,[["path",{d:"M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sm=["svg",i,[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tm=["svg",i,[["polyline",{points:"4 7 4 4 20 4 20 7"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nm=["svg",i,[["path",{d:"M12 2v1"}],["path",{d:"M15.5 21a1.85 1.85 0 0 1-3.5-1v-8H2a10 10 0 0 1 3.428-6.575"}],["path",{d:"M17.5 12H22A10 10 0 0 0 9.004 3.455"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rm=["svg",i,[["path",{d:"M22 12a10.06 10.06 1 0 0-20 0Z"}],["path",{d:"M12 12v8a2 2 0 0 0 4 0"}],["path",{d:"M12 2v1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Om=["svg",i,[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dm=["svg",i,[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _m=["svg",i,[["circle",{cx:"12",cy:"17",r:"1"}],["path",{d:"M3 7v6h6"}],["path",{d:"M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lm=["svg",i,[["path",{d:"M3 7v6h6"}],["path",{d:"M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bm=["svg",i,[["path",{d:"M16 12h6"}],["path",{d:"M8 12H2"}],["path",{d:"M12 2v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 20v2"}],["path",{d:"m19 15 3-3-3-3"}],["path",{d:"m5 9-3 3 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pm=["svg",i,[["path",{d:"M12 22v-6"}],["path",{d:"M12 8V2"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m15 5-3-3-3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hm=["svg",i,[["rect",{width:"8",height:"6",x:"5",y:"4",rx:"1"}],["rect",{width:"8",height:"6",x:"11",y:"14",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const On=["svg",i,[["circle",{cx:"12",cy:"10",r:"1"}],["path",{d:"M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"}],["path",{d:"M6 17v.01"}],["path",{d:"M6 13v.01"}],["path",{d:"M18 17v.01"}],["path",{d:"M18 13v.01"}],["path",{d:"M14 22v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fm=["svg",i,[["path",{d:"M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vm=["svg",i,[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const km=["svg",i,[["path",{d:"m19 5 3-3"}],["path",{d:"m2 22 3-3"}],["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"}],["path",{d:"M7.5 13.5 10 11"}],["path",{d:"M10.5 16.5 13 14"}],["path",{d:"m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Um=["svg",i,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"17 8 12 3 7 8"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zm=["svg",i,[["circle",{cx:"10",cy:"7",r:"1"}],["circle",{cx:"4",cy:"20",r:"1"}],["path",{d:"M4.7 19.3 19 5"}],["path",{d:"m21 3-3 1 2 2Z"}],["path",{d:"M9.26 7.68 5 12l2 5"}],["path",{d:"m10 14 5 2 3.5-3.5"}],["path",{d:"m18 12 1-1 1 1-1 1Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gm=["svg",i,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["polyline",{points:"16 11 18 13 22 9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wm=["svg",i,[["circle",{cx:"18",cy:"15",r:"3"}],["circle",{cx:"9",cy:"7",r:"4"}],["path",{d:"M10 15H6a4 4 0 0 0-4 4v2"}],["path",{d:"m21.7 16.4-.9-.3"}],["path",{d:"m15.2 13.9-.9-.3"}],["path",{d:"m16.6 18.7.3-.9"}],["path",{d:"m19.1 12.2.3-.9"}],["path",{d:"m19.6 18.7-.4-1"}],["path",{d:"m16.8 12.3-.4-1"}],["path",{d:"m14.3 16.6 1-.4"}],["path",{d:"m20.7 13.8 1-.4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zm=["svg",i,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xm=["svg",i,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dn=["svg",i,[["path",{d:"M2 21a8 8 0 0 1 13.292-6"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"m16 19 2 2 4-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _n=["svg",i,[["path",{d:"M2 21a8 8 0 0 1 10.434-7.62"}],["circle",{cx:"10",cy:"8",r:"5"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m19.5 14.3-.4.9"}],["path",{d:"m16.9 20.8-.4.9"}],["path",{d:"m21.7 19.5-.9-.4"}],["path",{d:"m15.2 16.9-.9-.4"}],["path",{d:"m21.7 16.5-.9.4"}],["path",{d:"m15.2 19.1-.9.4"}],["path",{d:"m19.5 21.7-.4-.9"}],["path",{d:"m16.9 15.2-.4-.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ln=["svg",i,[["path",{d:"M2 21a8 8 0 0 1 13.292-6"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M22 19h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bn=["svg",i,[["path",{d:"M2 21a8 8 0 0 1 13.292-6"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M19 16v6"}],["path",{d:"M22 19h-6"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qm=["svg",i,[["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M2 21a8 8 0 0 1 10.434-7.62"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m22 22-1.9-1.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pn=["svg",i,[["path",{d:"M2 21a8 8 0 0 1 11.873-7"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"m17 17 5 5"}],["path",{d:"m22 17-5 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hn=["svg",i,[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ym=["svg",i,[["circle",{cx:"10",cy:"7",r:"4"}],["path",{d:"M10.3 15H7a4 4 0 0 0-4 4v2"}],["circle",{cx:"17",cy:"17",r:"3"}],["path",{d:"m21 21-1.9-1.9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jm=["svg",i,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Km=["svg",i,[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fn=["svg",i,[["path",{d:"M18 21a8 8 0 0 0-16 0"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qm=["svg",i,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jm=["svg",i,[["path",{d:"m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"}],["path",{d:"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"}],["path",{d:"m2.1 21.8 6.4-6.3"}],["path",{d:"m19 5-7 7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $m=["svg",i,[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{d:"M7 2v20"}],["path",{d:"M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tw=["svg",i,[["path",{d:"M12 2v20"}],["path",{d:"M2 5h20"}],["path",{d:"M3 3v2"}],["path",{d:"M7 3v2"}],["path",{d:"M17 3v2"}],["path",{d:"M21 3v2"}],["path",{d:"m19 5-7 7-7-7"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ew=["svg",i,[["path",{d:"M8 21s-4-3-4-9 4-9 4-9"}],["path",{d:"M16 3s4 3 4 9-4 9-4 9"}],["line",{x1:"15",x2:"9",y1:"9",y2:"15"}],["line",{x1:"9",x2:"15",y1:"9",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aw=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}],["path",{d:"m7.9 7.9 2.7 2.7"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}],["path",{d:"m13.4 10.6 2.7-2.7"}],["circle",{cx:"7.5",cy:"16.5",r:".5",fill:"currentColor"}],["path",{d:"m7.9 16.1 2.7-2.7"}],["circle",{cx:"16.5",cy:"16.5",r:".5",fill:"currentColor"}],["path",{d:"m13.4 13.4 2.7 2.7"}],["circle",{cx:"12",cy:"12",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nw=["svg",i,[["path",{d:"M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"}],["path",{d:"M16 8c4 0 6-2 6-6-4 0-6 2-6 6"}],["path",{d:"M17.41 3.6a10 10 0 1 0 3 3"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rw=["svg",i,[["path",{d:"M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"}],["path",{d:"M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"}],["path",{d:"M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iw=["svg",i,[["path",{d:"m2 8 2 2-2 2 2 2-2 2"}],["path",{d:"m22 8-2 2 2 2-2 2 2 2"}],["path",{d:"M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2"}],["path",{d:"M16 10.34V6c0-.55-.45-1-1-1h-4.34"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sw=["svg",i,[["path",{d:"m2 8 2 2-2 2 2 2-2 2"}],["path",{d:"m22 8-2 2 2 2-2 2 2 2"}],["rect",{width:"8",height:"14",x:"8",y:"5",rx:"1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hw=["svg",i,[["path",{d:"M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"}],["path",{d:"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ow=["svg",i,[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cw=["svg",i,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M2 8h20"}],["circle",{cx:"8",cy:"14",r:"2"}],["path",{d:"M8 12h8"}],["circle",{cx:"16",cy:"14",r:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dw=["svg",i,[["path",{d:"M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"}],["path",{d:"M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lw=["svg",i,[["circle",{cx:"6",cy:"12",r:"4"}],["circle",{cx:"18",cy:"12",r:"4"}],["line",{x1:"6",x2:"18",y1:"16",y2:"16"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pw=["svg",i,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uw=["svg",i,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gw=["svg",i,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fw=["svg",i,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xw=["svg",i,[["path",{d:"m9 12 2 2 4-4"}],["path",{d:"M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"}],["path",{d:"M22 19H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mw=["svg",i,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"}],["path",{d:"M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vn=["svg",i,[["path",{d:"M17 14h.01"}],["path",{d:"M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vw=["svg",i,[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yw=["svg",i,[["circle",{cx:"8",cy:"9",r:"2"}],["path",{d:"m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=["svg",i,[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}],["path",{d:"m14 7 3 3"}],["path",{d:"M5 6v4"}],["path",{d:"M19 14v4"}],["path",{d:"M10 2v2"}],["path",{d:"M7 8H3"}],["path",{d:"M21 16h-4"}],["path",{d:"M11 3H9"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mw=["svg",i,[["path",{d:"M15 4V2"}],["path",{d:"M15 16v-2"}],["path",{d:"M8 9h2"}],["path",{d:"M20 9h2"}],["path",{d:"M17.8 11.8 19 13"}],["path",{d:"M15 9h0"}],["path",{d:"M17.8 6.2 19 5"}],["path",{d:"m3 21 9-9"}],["path",{d:"M12.2 6.2 11 5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ww=["svg",i,[["path",{d:"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"}],["path",{d:"M6 18h12"}],["path",{d:"M6 14h12"}],["rect",{width:"12",height:"12",x:"6",y:"10"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aw=["svg",i,[["path",{d:"M3 6h3"}],["path",{d:"M17 6h.01"}],["rect",{width:"18",height:"20",x:"3",y:"2",rx:"2"}],["circle",{cx:"12",cy:"13",r:"5"}],["path",{d:"M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cw=["svg",i,[["circle",{cx:"12",cy:"12",r:"6"}],["polyline",{points:"12 10 12 12 13 13"}],["path",{d:"m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"}],["path",{d:"m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ew=["svg",i,[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iw=["svg",i,[["circle",{cx:"12",cy:"4.5",r:"2.5"}],["path",{d:"m10.2 6.3-3.9 3.9"}],["circle",{cx:"4.5",cy:"12",r:"2.5"}],["path",{d:"M7 12h10"}],["circle",{cx:"19.5",cy:"12",r:"2.5"}],["path",{d:"m13.8 17.7 3.9-3.9"}],["circle",{cx:"12",cy:"19.5",r:"2.5"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bw=["svg",i,[["circle",{cx:"12",cy:"10",r:"8"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M7 22h10"}],["path",{d:"M12 22v-4"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sw=["svg",i,[["path",{d:"M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15"}],["path",{d:"M9 3.4a4 4 0 0 1 6.52.66"}],["path",{d:"m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05"}],["path",{d:"M20.3 20.3a4 4 0 0 1-2.3.7"}],["path",{d:"M18.6 13a4 4 0 0 1 3.357 3.414"}],["path",{d:"m12 6 .6 1"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tw=["svg",i,[["path",{d:"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"}],["path",{d:"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"}],["path",{d:"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nw=["svg",i,[["circle",{cx:"12",cy:"5",r:"3"}],["path",{d:"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rw=["svg",i,[["path",{d:"m2 22 10-10"}],["path",{d:"m16 8-1.17 1.17"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"}],["path",{d:"M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"}],["path",{d:"M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ow=["svg",i,[["path",{d:"M2 22 16 8"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dw=["svg",i,[["circle",{cx:"7",cy:"12",r:"3"}],["path",{d:"M10 9v6"}],["circle",{cx:"17",cy:"12",r:"3"}],["path",{d:"M14 7v8"}],["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _w=["svg",i,[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lw=["svg",i,[["path",{d:"M12 20h.01"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bw=["svg",i,[["path",{d:"M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"}],["path",{d:"M9.6 4.6A2 2 0 1 1 11 8H2"}],["path",{d:"M12.6 19.4A2 2 0 1 0 14 16H2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pw=["svg",i,[["path",{d:"M8 22h8"}],["path",{d:"M7 10h3m7 0h-1.343"}],["path",{d:"M12 15v7"}],["path",{d:"M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hw=["svg",i,[["path",{d:"M8 22h8"}],["path",{d:"M7 10h10"}],["path",{d:"M12 15v7"}],["path",{d:"M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fw=["svg",i,[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vw=["svg",i,[["path",{d:"m19 12-1.5 3"}],["path",{d:"M19.63 18.81 22 20"}],["path",{d:"M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kw=["svg",i,[["line",{x1:"3",x2:"21",y1:"6",y2:"6"}],["path",{d:"M3 12h15a3 3 0 1 1 0 6h-4"}],["polyline",{points:"16 16 14 18 16 20"}],["line",{x1:"3",x2:"10",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uw=["svg",i,[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zw=["svg",i,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gw=["svg",i,[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ww=["svg",i,[["path",{d:"M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"}],["path",{d:"M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"}],["path",{d:"M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"}],["path",{d:"m2 2 20 20"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zw=["svg",i,[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xw=["svg",i,[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qw=["svg",i,[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]]];/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yw=Object.freeze(Object.defineProperty({__proto__:null,AArrowDown:Qr,AArrowUp:Jr,ALargeSmall:$r,Accessibility:ti,Activity:ei,ActivitySquare:Sa,AirVent:ai,Airplay:ni,AlarmCheck:B2,AlarmClock:ii,AlarmClockCheck:B2,AlarmClockMinus:P2,AlarmClockOff:ri,AlarmClockPlus:H2,AlarmMinus:P2,AlarmPlus:H2,AlarmSmoke:si,Album:hi,AlertCircle:Q2,AlertOctagon:ia,AlertTriangle:Rn,AlignCenter:di,AlignCenterHorizontal:oi,AlignCenterVertical:ci,AlignEndHorizontal:li,AlignEndVertical:pi,AlignHorizontalDistributeCenter:ui,AlignHorizontalDistributeEnd:gi,AlignHorizontalDistributeStart:fi,AlignHorizontalJustifyCenter:xi,AlignHorizontalJustifyEnd:Mi,AlignHorizontalJustifyStart:vi,AlignHorizontalSpaceAround:yi,AlignHorizontalSpaceBetween:mi,AlignJustify:wi,AlignLeft:Ai,AlignRight:Ci,AlignStartHorizontal:Ei,AlignStartVertical:Ii,AlignVerticalDistributeCenter:bi,AlignVerticalDistributeEnd:Si,AlignVerticalDistributeStart:Ti,AlignVerticalJustifyCenter:Ni,AlignVerticalJustifyEnd:Ri,AlignVerticalJustifyStart:Oi,AlignVerticalSpaceAround:Di,AlignVerticalSpaceBetween:_i,Ambulance:Li,Ampersand:Bi,Ampersands:Pi,Anchor:Hi,Angry:Fi,Annoyed:Vi,Antenna:ki,Anvil:Ui,Aperture:Zi,AppWindow:Wi,AppWindowMac:Gi,Apple:zi,Archive:Yi,ArchiveRestore:Xi,ArchiveX:qi,AreaChart:ji,Armchair:Ki,ArrowBigDown:Ji,ArrowBigDownDash:Qi,ArrowBigLeft:ts,ArrowBigLeftDash:$i,ArrowBigRight:as,ArrowBigRightDash:es,ArrowBigUp:rs,ArrowBigUpDash:ns,ArrowDown:gs,ArrowDown01:is,ArrowDown10:ss,ArrowDownAZ:F2,ArrowDownAz:F2,ArrowDownCircle:J2,ArrowDownFromLine:hs,ArrowDownLeft:os,ArrowDownLeftFromCircle:t0,ArrowDownLeftFromSquare:Da,ArrowDownLeftSquare:Ta,ArrowDownNarrowWide:cs,ArrowDownRight:ds,ArrowDownRightFromCircle:e0,ArrowDownRightFromSquare:_a,ArrowDownRightSquare:Na,ArrowDownSquare:Ra,ArrowDownToDot:ls,ArrowDownToLine:ps,ArrowDownUp:us,ArrowDownWideNarrow:V2,ArrowDownZA:k2,ArrowDownZa:k2,ArrowLeft:vs,ArrowLeftCircle:$2,ArrowLeftFromLine:fs,ArrowLeftRight:xs,ArrowLeftSquare:Oa,ArrowLeftToLine:Ms,ArrowRight:As,ArrowRightCircle:r0,ArrowRightFromLine:ys,ArrowRightLeft:ms,ArrowRightSquare:Pa,ArrowRightToLine:ws,ArrowUp:Ds,ArrowUp01:Cs,ArrowUp10:Es,ArrowUpAZ:U2,ArrowUpAz:U2,ArrowUpCircle:i0,ArrowUpDown:Is,ArrowUpFromDot:bs,ArrowUpFromLine:Ss,ArrowUpLeft:Ts,ArrowUpLeftFromCircle:a0,ArrowUpLeftFromSquare:La,ArrowUpLeftSquare:Ha,ArrowUpNarrowWide:Z2,ArrowUpRight:Ns,ArrowUpRightFromCircle:n0,ArrowUpRightFromSquare:Ba,ArrowUpRightSquare:Fa,ArrowUpSquare:Va,ArrowUpToLine:Rs,ArrowUpWideNarrow:Os,ArrowUpZA:G2,ArrowUpZa:G2,ArrowsUpFromLine:_s,Asterisk:Ls,AsteriskSquare:ka,AtSign:Bs,Atom:Ps,AudioLines:Hs,AudioWaveform:Fs,Award:Vs,Axe:ks,Axis3D:W2,Axis3d:W2,Baby:Us,Backpack:Zs,Badge:rh,BadgeAlert:Gs,BadgeCent:Ws,BadgeCheck:z2,BadgeDollarSign:zs,BadgeEuro:Xs,BadgeHelp:qs,BadgeIndianRupee:Ys,BadgeInfo:js,BadgeJapaneseYen:Ks,BadgeMinus:Qs,BadgePercent:Js,BadgePlus:$s,BadgePoundSterling:th,BadgeRussianRuble:eh,BadgeSwissFranc:ah,BadgeX:nh,BaggageClaim:ih,Ban:sh,Banana:hh,Banknote:oh,BarChart:fh,BarChart2:ch,BarChart3:dh,BarChart4:lh,BarChartBig:ph,BarChartHorizontal:gh,BarChartHorizontalBig:uh,Barcode:xh,Baseline:Mh,Bath:vh,Battery:Eh,BatteryCharging:yh,BatteryFull:mh,BatteryLow:wh,BatteryMedium:Ah,BatteryWarning:Ch,Beaker:Ih,Bean:Sh,BeanOff:bh,Bed:Rh,BedDouble:Th,BedSingle:Nh,Beef:Oh,Beer:_h,BeerOff:Dh,Bell:kh,BellDot:Lh,BellElectric:Bh,BellMinus:Ph,BellOff:Hh,BellPlus:Fh,BellRing:Vh,BetweenHorizonalEnd:X2,BetweenHorizonalStart:q2,BetweenHorizontalEnd:X2,BetweenHorizontalStart:q2,BetweenVerticalEnd:Uh,BetweenVerticalStart:Zh,Bike:Gh,Binary:Wh,Biohazard:zh,Bird:Xh,Bitcoin:qh,Blend:Yh,Blinds:jh,Blocks:Kh,Bluetooth:to,BluetoothConnected:Qh,BluetoothOff:Jh,BluetoothSearching:$h,Bold:eo,Bolt:ao,Bomb:no,Bone:ro,Book:To,BookA:io,BookAudio:so,BookCheck:ho,BookCopy:oo,BookDashed:Y2,BookDown:co,BookHeadphones:lo,BookHeart:po,BookImage:uo,BookKey:go,BookLock:fo,BookMarked:xo,BookMinus:Mo,BookOpen:mo,BookOpenCheck:vo,BookOpenText:yo,BookPlus:wo,BookTemplate:Y2,BookText:Ao,BookType:Co,BookUp:Io,BookUp2:Eo,BookUser:bo,BookX:So,Bookmark:_o,BookmarkCheck:No,BookmarkMinus:Ro,BookmarkPlus:Oo,BookmarkX:Do,BoomBox:Lo,Bot:Ho,BotMessageSquare:Bo,BotOff:Po,Box:Vo,BoxSelect:Fo,Boxes:ko,Braces:j2,Brackets:Uo,Brain:Wo,BrainCircuit:Zo,BrainCog:Go,BrickWall:zo,Briefcase:Yo,BriefcaseBusiness:Xo,BriefcaseMedical:qo,BringToFront:jo,Brush:Ko,Bug:$o,BugOff:Qo,BugPlay:Jo,Building:ec,Building2:tc,Bus:nc,BusFront:ac,Cable:ic,CableCar:rc,Cake:hc,CakeSlice:sc,Calculator:oc,Calendar:Ec,CalendarCheck:dc,CalendarCheck2:cc,CalendarClock:lc,CalendarDays:pc,CalendarFold:uc,CalendarHeart:gc,CalendarMinus:xc,CalendarMinus2:fc,CalendarOff:Mc,CalendarPlus:yc,CalendarPlus2:vc,CalendarRange:mc,CalendarSearch:wc,CalendarX:Cc,CalendarX2:Ac,Camera:bc,CameraOff:Ic,CandlestickChart:Sc,Candy:Rc,CandyCane:Tc,CandyOff:Nc,Cannabis:Oc,Captions:K2,CaptionsOff:Dc,Car:Bc,CarFront:_c,CarTaxiFront:Lc,Caravan:Pc,Carrot:Hc,CaseLower:Fc,CaseSensitive:Vc,CaseUpper:kc,CassetteTape:Uc,Cast:Zc,Castle:Gc,Cat:Wc,Cctv:zc,Check:qc,CheckCheck:Xc,CheckCircle:s0,CheckCircle2:h0,CheckSquare:Za,CheckSquare2:Ga,ChefHat:Yc,Cherry:jc,ChevronDown:Kc,ChevronDownCircle:o0,ChevronDownSquare:Wa,ChevronFirst:Qc,ChevronLast:Jc,ChevronLeft:$c,ChevronLeftCircle:c0,ChevronLeftSquare:za,ChevronRight:td,ChevronRightCircle:d0,ChevronRightSquare:Xa,ChevronUp:ed,ChevronUpCircle:l0,ChevronUpSquare:qa,ChevronsDown:nd,ChevronsDownUp:ad,ChevronsLeft:id,ChevronsLeftRight:rd,ChevronsRight:hd,ChevronsRightLeft:sd,ChevronsUp:cd,ChevronsUpDown:od,Chrome:dd,Church:ld,Cigarette:ud,CigaretteOff:pd,Circle:Cd,CircleAlert:Q2,CircleArrowDown:J2,CircleArrowLeft:$2,CircleArrowOutDownLeft:t0,CircleArrowOutDownRight:e0,CircleArrowOutUpLeft:a0,CircleArrowOutUpRight:n0,CircleArrowRight:r0,CircleArrowUp:i0,CircleCheck:h0,CircleCheckBig:s0,CircleChevronDown:o0,CircleChevronLeft:c0,CircleChevronRight:d0,CircleChevronUp:l0,CircleDashed:gd,CircleDivide:p0,CircleDollarSign:fd,CircleDot:Md,CircleDotDashed:xd,CircleEllipsis:vd,CircleEqual:yd,CircleFadingPlus:md,CircleGauge:u0,CircleHelp:g0,CircleMinus:f0,CircleOff:wd,CircleParking:M0,CircleParkingOff:x0,CirclePause:v0,CirclePercent:y0,CirclePlay:m0,CirclePlus:w0,CirclePower:A0,CircleSlash:Ad,CircleSlash2:C0,CircleSlashed:C0,CircleStop:E0,CircleUser:b0,CircleUserRound:I0,CircleX:S0,CircuitBoard:Ed,Citrus:Id,Clapperboard:bd,Clipboard:Bd,ClipboardCheck:Sd,ClipboardCopy:Td,ClipboardEdit:N0,ClipboardList:Nd,ClipboardMinus:Rd,ClipboardPaste:Od,ClipboardPen:N0,ClipboardPenLine:T0,ClipboardPlus:Dd,ClipboardSignature:T0,ClipboardType:_d,ClipboardX:Ld,Clock:Yd,Clock1:Pd,Clock10:Hd,Clock11:Fd,Clock12:Vd,Clock2:kd,Clock3:Ud,Clock4:Zd,Clock5:Gd,Clock6:Wd,Clock7:zd,Clock8:Xd,Clock9:qd,Cloud:ol,CloudCog:jd,CloudDownload:R0,CloudDrizzle:Kd,CloudFog:Qd,CloudHail:Jd,CloudLightning:$d,CloudMoon:el,CloudMoonRain:tl,CloudOff:al,CloudRain:rl,CloudRainWind:nl,CloudSnow:il,CloudSun:hl,CloudSunRain:sl,CloudUpload:O0,Cloudy:cl,Clover:dl,Club:ll,Code:pl,Code2:D0,CodeSquare:Ya,CodeXml:D0,Codepen:ul,Codesandbox:gl,Coffee:fl,Cog:xl,Coins:Ml,Columns:_0,Columns2:_0,Columns3:L0,Columns4:vl,Combine:yl,Command:ml,Compass:wl,Component:Al,Computer:Cl,ConciergeBell:El,Cone:Il,Construction:bl,Contact:Sl,Contact2:B0,ContactRound:B0,Container:Tl,Contrast:Nl,Cookie:Rl,CookingPot:Ol,Copy:Hl,CopyCheck:Dl,CopyMinus:_l,CopyPlus:Ll,CopySlash:Bl,CopyX:Pl,Copyleft:Fl,Copyright:Vl,CornerDownLeft:kl,CornerDownRight:Ul,CornerLeftDown:Zl,CornerLeftUp:Gl,CornerRightDown:Wl,CornerRightUp:zl,CornerUpLeft:Xl,CornerUpRight:ql,Cpu:Yl,CreativeCommons:jl,CreditCard:Kl,Croissant:Ql,Crop:Jl,Cross:$l,Crosshair:t4,Crown:e4,Cuboid:a4,CupSoda:n4,CurlyBraces:j2,Currency:r4,Cylinder:i4,Database:o4,DatabaseBackup:s4,DatabaseZap:h4,Delete:c4,Dessert:d4,Diameter:l4,Diamond:g4,DiamondMinus:p4,DiamondPercent:P0,DiamondPlus:u4,Dice1:f4,Dice2:x4,Dice3:M4,Dice4:v4,Dice5:y4,Dice6:m4,Dices:w4,Diff:A4,Disc:b4,Disc2:C4,Disc3:E4,DiscAlbum:I4,Divide:S4,DivideCircle:p0,DivideSquare:Qa,Dna:N4,DnaOff:T4,Dock:R4,Dog:O4,DollarSign:D4,Donut:_4,DoorClosed:L4,DoorOpen:B4,Dot:P4,DotSquare:Ja,Download:H4,DownloadCloud:R0,DraftingCompass:F4,Drama:V4,Dribbble:k4,Drill:U4,Droplet:Z4,Droplets:G4,Drum:W4,Drumstick:z4,Dumbbell:X4,Ear:Y4,EarOff:q4,Earth:H0,EarthLock:j4,Eclipse:K4,Edit:L1,Edit2:Ma,Edit3:xa,Egg:$4,EggFried:Q4,EggOff:J4,Ellipsis:V0,EllipsisVertical:F0,Equal:e3,EqualNot:t3,EqualSquare:$a,Eraser:a3,Euro:n3,Expand:r3,ExternalLink:i3,Eye:h3,EyeOff:s3,Facebook:o3,Factory:c3,Fan:d3,FastForward:l3,Feather:p3,Fence:u3,FerrisWheel:g3,Figma:f3,File:f5,FileArchive:x3,FileAudio:v3,FileAudio2:M3,FileAxis3D:k0,FileAxis3d:k0,FileBadge:m3,FileBadge2:y3,FileBarChart:A3,FileBarChart2:w3,FileBox:C3,FileCheck:I3,FileCheck2:E3,FileClock:b3,FileCode:T3,FileCode2:S3,FileCog:U0,FileCog2:U0,FileDiff:N3,FileDigit:R3,FileDown:O3,FileEdit:G0,FileHeart:D3,FileImage:_3,FileInput:L3,FileJson:P3,FileJson2:B3,FileKey:F3,FileKey2:H3,FileLineChart:V3,FileLock:U3,FileLock2:k3,FileMinus:G3,FileMinus2:Z3,FileMusic:W3,FileOutput:z3,FilePen:G0,FilePenLine:Z0,FilePieChart:X3,FilePlus:Y3,FilePlus2:q3,FileQuestion:j3,FileScan:K3,FileSearch:J3,FileSearch2:Q3,FileSignature:Z0,FileSliders:$3,FileSpreadsheet:t5,FileStack:e5,FileSymlink:a5,FileTerminal:n5,FileText:r5,FileType:s5,FileType2:i5,FileUp:h5,FileVideo:c5,FileVideo2:o5,FileVolume:l5,FileVolume2:d5,FileWarning:p5,FileX:g5,FileX2:u5,Files:x5,Film:M5,Filter:y5,FilterX:v5,Fingerprint:m5,FireExtinguisher:w5,Fish:E5,FishOff:A5,FishSymbol:C5,Flag:T5,FlagOff:I5,FlagTriangleLeft:b5,FlagTriangleRight:S5,Flame:R5,FlameKindling:N5,Flashlight:D5,FlashlightOff:O5,FlaskConical:L5,FlaskConicalOff:_5,FlaskRound:B5,FlipHorizontal:H5,FlipHorizontal2:P5,FlipVertical:V5,FlipVertical2:F5,Flower:U5,Flower2:k5,Focus:Z5,FoldHorizontal:G5,FoldVertical:W5,Folder:Mp,FolderArchive:z5,FolderCheck:X5,FolderClock:q5,FolderClosed:Y5,FolderCog:W0,FolderCog2:W0,FolderDot:j5,FolderDown:K5,FolderEdit:z0,FolderGit:J5,FolderGit2:Q5,FolderHeart:$5,FolderInput:tp,FolderKanban:ep,FolderKey:ap,FolderLock:np,FolderMinus:rp,FolderOpen:sp,FolderOpenDot:ip,FolderOutput:hp,FolderPen:z0,FolderPlus:op,FolderRoot:cp,FolderSearch:lp,FolderSearch2:dp,FolderSymlink:pp,FolderSync:up,FolderTree:gp,FolderUp:fp,FolderX:xp,Folders:vp,Footprints:yp,Forklift:mp,FormInput:va,Forward:wp,Frame:Ap,Framer:Cp,Frown:Ep,Fuel:Ip,Fullscreen:bp,FunctionSquare:tn,GalleryHorizontal:Tp,GalleryHorizontalEnd:Sp,GalleryThumbnails:Np,GalleryVertical:Op,GalleryVerticalEnd:Rp,Gamepad:_p,Gamepad2:Dp,GanttChart:Lp,GanttChartSquare:en,Gauge:Bp,GaugeCircle:u0,Gavel:Pp,Gem:Hp,Ghost:Fp,Gift:Vp,GitBranch:Up,GitBranchPlus:kp,GitCommit:X0,GitCommitHorizontal:X0,GitCommitVertical:Zp,GitCompare:Wp,GitCompareArrows:Gp,GitFork:zp,GitGraph:Xp,GitMerge:qp,GitPullRequest:$p,GitPullRequestArrow:Yp,GitPullRequestClosed:jp,GitPullRequestCreate:Qp,GitPullRequestCreateArrow:Kp,GitPullRequestDraft:Jp,Github:t8,Gitlab:e8,GlassWater:a8,Glasses:n8,Globe:i8,Globe2:H0,GlobeLock:r8,Goal:s8,Grab:h8,GraduationCap:o8,Grape:c8,Grid:h2,Grid2X2:q0,Grid2x2:q0,Grid2x2Check:d8,Grid2x2X:l8,Grid3X3:h2,Grid3x3:h2,Grip:g8,GripHorizontal:p8,GripVertical:u8,Group:f8,Guitar:x8,Ham:M8,Hammer:v8,Hand:C8,HandCoins:y8,HandHeart:m8,HandHelping:Y0,HandMetal:w8,HandPlatter:A8,Handshake:E8,HardDrive:S8,HardDriveDownload:I8,HardDriveUpload:b8,HardHat:T8,Hash:N8,Haze:R8,HdmiPort:O8,Heading:F8,Heading1:D8,Heading2:_8,Heading3:L8,Heading4:B8,Heading5:P8,Heading6:H8,Headphones:V8,Headset:k8,Heart:z8,HeartCrack:U8,HeartHandshake:Z8,HeartOff:G8,HeartPulse:W8,Heater:X8,HelpCircle:g0,HelpingHand:Y0,Hexagon:q8,Highlighter:Y8,History:j8,Home:K8,Hop:J8,HopOff:Q8,Hospital:$8,Hotel:t6,Hourglass:e6,IceCream:K0,IceCream2:j0,IceCreamBowl:j0,IceCreamCone:K0,Image:o6,ImageDown:a6,ImageMinus:n6,ImageOff:r6,ImagePlay:i6,ImagePlus:s6,ImageUp:h6,Images:c6,Import:d6,Inbox:l6,Indent:J0,IndentDecrease:Q0,IndentIncrease:J0,IndianRupee:p6,Infinity:u6,Info:g6,Inspect:on,InspectionPanel:f6,Instagram:x6,Italic:M6,IterationCcw:v6,IterationCw:y6,JapaneseYen:m6,Joystick:w6,Kanban:A6,KanbanSquare:an,KanbanSquareDashed:ja,Key:I6,KeyRound:C6,KeySquare:E6,Keyboard:T6,KeyboardMusic:b6,KeyboardOff:S6,Lamp:L6,LampCeiling:N6,LampDesk:R6,LampFloor:O6,LampWallDown:D6,LampWallUp:_6,LandPlot:B6,Landmark:P6,Languages:H6,Laptop:F6,Laptop2:$0,LaptopMinimal:$0,Lasso:k6,LassoSelect:V6,Laugh:U6,Layers:W6,Layers2:Z6,Layers3:G6,Layout:fa,LayoutDashboard:z6,LayoutGrid:X6,LayoutList:q6,LayoutPanelLeft:Y6,LayoutPanelTop:j6,LayoutTemplate:K6,Leaf:Q6,LeafyGreen:J6,Library:tu,LibraryBig:$6,LibrarySquare:nn,LifeBuoy:eu,Ligature:au,Lightbulb:ru,LightbulbOff:nu,LineChart:iu,Link:ou,Link2:hu,Link2Off:su,Linkedin:cu,List:Eu,ListChecks:du,ListCollapse:lu,ListEnd:pu,ListFilter:uu,ListMinus:gu,ListMusic:fu,ListOrdered:xu,ListPlus:Mu,ListRestart:vu,ListStart:yu,ListTodo:mu,ListTree:wu,ListVideo:Au,ListX:Cu,Loader:bu,Loader2:ta,LoaderCircle:ta,LoaderPinwheel:Iu,Locate:Nu,LocateFixed:Su,LocateOff:Tu,Lock:Ou,LockKeyhole:Ru,LockKeyholeOpen:ea,LockOpen:aa,LogIn:Du,LogOut:_u,Lollipop:Lu,Luggage:Bu,MSquare:rn,Magnet:Pu,Mail:zu,MailCheck:Hu,MailMinus:Fu,MailOpen:Vu,MailPlus:ku,MailQuestion:Uu,MailSearch:Zu,MailWarning:Gu,MailX:Wu,Mailbox:Xu,Mails:qu,Map:Qu,MapPin:ju,MapPinOff:Yu,MapPinned:Ku,Martini:Ju,Maximize:tg,Maximize2:$u,Medal:eg,Megaphone:ng,MegaphoneOff:ag,Meh:rg,MemoryStick:ig,Menu:sg,MenuSquare:sn,Merge:hg,MessageCircle:vg,MessageCircleCode:og,MessageCircleDashed:cg,MessageCircleHeart:dg,MessageCircleMore:lg,MessageCircleOff:pg,MessageCirclePlus:ug,MessageCircleQuestion:gg,MessageCircleReply:fg,MessageCircleWarning:xg,MessageCircleX:Mg,MessageSquare:_g,MessageSquareCode:yg,MessageSquareDashed:mg,MessageSquareDiff:wg,MessageSquareDot:Ag,MessageSquareHeart:Cg,MessageSquareMore:Eg,MessageSquareOff:Ig,MessageSquarePlus:bg,MessageSquareQuote:Sg,MessageSquareReply:Tg,MessageSquareShare:Ng,MessageSquareText:Rg,MessageSquareWarning:Og,MessageSquareX:Dg,MessagesSquare:Lg,Mic:Pg,Mic2:na,MicOff:Bg,MicVocal:na,Microscope:Hg,Microwave:Fg,Milestone:Vg,Milk:Ug,MilkOff:kg,Minimize:Gg,Minimize2:Zg,Minus:Wg,MinusCircle:f0,MinusSquare:hn,Monitor:af,MonitorCheck:zg,MonitorDot:Xg,MonitorDown:qg,MonitorOff:Yg,MonitorPause:jg,MonitorPlay:Kg,MonitorSmartphone:Qg,MonitorSpeaker:Jg,MonitorStop:$g,MonitorUp:tf,MonitorX:ef,Moon:rf,MoonStar:nf,MoreHorizontal:V0,MoreVertical:F0,Mountain:hf,MountainSnow:sf,Mouse:uf,MouseOff:of,MousePointer:pf,MousePointer2:cf,MousePointerBan:df,MousePointerClick:lf,MousePointerSquareDashed:Ka,Move:bf,Move3D:ra,Move3d:ra,MoveDiagonal:ff,MoveDiagonal2:gf,MoveDown:vf,MoveDownLeft:xf,MoveDownRight:Mf,MoveHorizontal:yf,MoveLeft:mf,MoveRight:wf,MoveUp:Ef,MoveUpLeft:Af,MoveUpRight:Cf,MoveVertical:If,Music:Rf,Music2:Sf,Music3:Tf,Music4:Nf,Navigation:Lf,Navigation2:Df,Navigation2Off:Of,NavigationOff:_f,Network:Bf,Newspaper:Pf,Nfc:Hf,Notebook:Uf,NotebookPen:Ff,NotebookTabs:Vf,NotebookText:kf,NotepadText:Gf,NotepadTextDashed:Zf,Nut:zf,NutOff:Wf,Octagon:Xf,OctagonAlert:ia,OctagonPause:sa,OctagonX:ha,Option:qf,Orbit:Yf,Origami:jf,Outdent:Q0,Package:n7,Package2:Kf,PackageCheck:Qf,PackageMinus:Jf,PackageOpen:$f,PackagePlus:t7,PackageSearch:e7,PackageX:a7,PaintBucket:r7,PaintRoller:i7,Paintbrush:h7,Paintbrush2:s7,Palette:o7,Palmtree:Nn,PanelBottom:l7,PanelBottomClose:c7,PanelBottomDashed:oa,PanelBottomInactive:oa,PanelBottomOpen:d7,PanelLeft:pa,PanelLeftClose:ca,PanelLeftDashed:da,PanelLeftInactive:da,PanelLeftOpen:la,PanelRight:g7,PanelRightClose:p7,PanelRightDashed:ua,PanelRightInactive:ua,PanelRightOpen:u7,PanelTop:M7,PanelTopClose:f7,PanelTopDashed:ga,PanelTopInactive:ga,PanelTopOpen:x7,PanelsLeftBottom:v7,PanelsLeftRight:L0,PanelsRightBottom:y7,PanelsTopBottom:wa,PanelsTopLeft:fa,Paperclip:m7,Parentheses:w7,ParkingCircle:M0,ParkingCircleOff:x0,ParkingMeter:A7,ParkingSquare:dn,ParkingSquareOff:cn,PartyPopper:C7,Pause:E7,PauseCircle:v0,PauseOctagon:sa,PawPrint:I7,PcCase:b7,Pen:Ma,PenBox:L1,PenLine:xa,PenSquare:L1,PenTool:S7,Pencil:R7,PencilLine:T7,PencilRuler:N7,Pentagon:O7,Percent:D7,PercentCircle:y0,PercentDiamond:P0,PercentSquare:ln,PersonStanding:_7,Phone:k7,PhoneCall:L7,PhoneForwarded:B7,PhoneIncoming:P7,PhoneMissed:H7,PhoneOff:F7,PhoneOutgoing:V7,Pi:U7,PiSquare:pn,Piano:Z7,Pickaxe:G7,PictureInPicture:z7,PictureInPicture2:W7,PieChart:X7,PiggyBank:q7,Pilcrow:K7,PilcrowLeft:Y7,PilcrowRight:j7,PilcrowSquare:un,Pill:Q7,Pin:$7,PinOff:J7,Pipette:tx,Pizza:ex,Plane:rx,PlaneLanding:ax,PlaneTakeoff:nx,Play:ix,PlayCircle:m0,PlaySquare:gn,Plug:cx,Plug2:sx,PlugZap:ox,PlugZap2:hx,Plus:dx,PlusCircle:w0,PlusSquare:fn,Pocket:px,PocketKnife:lx,Podcast:ux,Pointer:fx,PointerOff:gx,Popcorn:xx,Popsicle:Mx,PoundSterling:vx,Power:mx,PowerCircle:A0,PowerOff:yx,PowerSquare:xn,Presentation:wx,Printer:Ax,Projector:Cx,Proportions:Ex,Puzzle:Ix,Pyramid:bx,QrCode:Sx,Quote:Tx,Rabbit:Nx,Radar:Rx,Radiation:Ox,Radical:Dx,Radio:Bx,RadioReceiver:_x,RadioTower:Lx,Radius:Px,RailSymbol:Hx,Rainbow:Fx,Rat:Vx,Ratio:kx,Receipt:jx,ReceiptCent:Ux,ReceiptEuro:Zx,ReceiptIndianRupee:Gx,ReceiptJapaneseYen:Wx,ReceiptPoundSterling:zx,ReceiptRussianRuble:Xx,ReceiptSwissFranc:qx,ReceiptText:Yx,RectangleEllipsis:va,RectangleHorizontal:Kx,RectangleVertical:Qx,Recycle:Jx,Redo:e9,Redo2:$x,RedoDot:t9,RefreshCcw:n9,RefreshCcwDot:a9,RefreshCw:i9,RefreshCwOff:r9,Refrigerator:s9,Regex:h9,RemoveFormatting:o9,Repeat:l9,Repeat1:c9,Repeat2:d9,Replace:u9,ReplaceAll:p9,Reply:f9,ReplyAll:g9,Rewind:x9,Ribbon:M9,Rocket:v9,RockingChair:y9,RollerCoaster:m9,Rotate3D:ya,Rotate3d:ya,RotateCcw:A9,RotateCcwSquare:w9,RotateCw:E9,RotateCwSquare:C9,Route:b9,RouteOff:I9,Router:S9,Rows:ma,Rows2:ma,Rows3:wa,Rows4:T9,Rss:N9,Ruler:R9,RussianRuble:O9,Sailboat:D9,Salad:_9,Sandwich:L9,Satellite:P9,SatelliteDish:B9,Save:F9,SaveAll:H9,Scale:V9,Scale3D:Aa,Scale3d:Aa,Scaling:k9,Scan:q9,ScanBarcode:U9,ScanEye:Z9,ScanFace:G9,ScanLine:W9,ScanSearch:z9,ScanText:X9,ScatterChart:Y9,School:j9,School2:On,Scissors:Q9,ScissorsLineDashed:K9,ScissorsSquare:Mn,ScissorsSquareDashedBottom:Ua,ScreenShare:$9,ScreenShareOff:J9,Scroll:eM,ScrollText:tM,Search:sM,SearchCheck:aM,SearchCode:nM,SearchSlash:rM,SearchX:iM,Send:oM,SendHorizonal:Ca,SendHorizontal:Ca,SendToBack:hM,SeparatorHorizontal:cM,SeparatorVertical:dM,Server:gM,ServerCog:lM,ServerCrash:pM,ServerOff:uM,Settings:xM,Settings2:fM,Shapes:MM,Share:yM,Share2:vM,Sheet:mM,Shell:wM,Shield:OM,ShieldAlert:AM,ShieldBan:CM,ShieldCheck:EM,ShieldClose:Ea,ShieldEllipsis:IM,ShieldHalf:bM,ShieldMinus:SM,ShieldOff:TM,ShieldPlus:NM,ShieldQuestion:RM,ShieldX:Ea,Ship:_M,ShipWheel:DM,Shirt:LM,ShoppingBag:BM,ShoppingBasket:PM,ShoppingCart:HM,Shovel:FM,ShowerHead:VM,Shrink:kM,Shrub:UM,Shuffle:ZM,Sidebar:pa,SidebarClose:ca,SidebarOpen:la,Sigma:GM,SigmaSquare:vn,Signal:YM,SignalHigh:WM,SignalLow:zM,SignalMedium:XM,SignalZero:qM,Signpost:KM,SignpostBig:jM,Siren:QM,SkipBack:JM,SkipForward:$M,Skull:tv,Slack:ev,Slash:av,SlashSquare:yn,Slice:nv,Sliders:Ia,SlidersHorizontal:rv,SlidersVertical:Ia,Smartphone:hv,SmartphoneCharging:iv,SmartphoneNfc:sv,Smile:cv,SmilePlus:ov,Snail:dv,Snowflake:lv,Sofa:pv,SortAsc:Z2,SortDesc:V2,Soup:uv,Space:gv,Spade:fv,Sparkle:xv,Sparkles:ba,Speaker:Mv,Speech:vv,SpellCheck:mv,SpellCheck2:yv,Spline:wv,Split:Av,SplitSquareHorizontal:mn,SplitSquareVertical:wn,SprayCan:Cv,Sprout:Ev,Square:Nv,SquareActivity:Sa,SquareArrowDown:Ra,SquareArrowDownLeft:Ta,SquareArrowDownRight:Na,SquareArrowLeft:Oa,SquareArrowOutDownLeft:Da,SquareArrowOutDownRight:_a,SquareArrowOutUpLeft:La,SquareArrowOutUpRight:Ba,SquareArrowRight:Pa,SquareArrowUp:Va,SquareArrowUpLeft:Ha,SquareArrowUpRight:Fa,SquareAsterisk:ka,SquareBottomDashedScissors:Ua,SquareCheck:Ga,SquareCheckBig:Za,SquareChevronDown:Wa,SquareChevronLeft:za,SquareChevronRight:Xa,SquareChevronUp:qa,SquareCode:Ya,SquareDashedBottom:bv,SquareDashedBottomCode:Iv,SquareDashedKanban:ja,SquareDashedMousePointer:Ka,SquareDivide:Qa,SquareDot:Ja,SquareEqual:$a,SquareFunction:tn,SquareGanttChart:en,SquareKanban:an,SquareLibrary:nn,SquareM:rn,SquareMenu:sn,SquareMinus:hn,SquareMousePointer:on,SquareParking:dn,SquareParkingOff:cn,SquarePen:L1,SquarePercent:ln,SquarePi:pn,SquarePilcrow:un,SquarePlay:gn,SquarePlus:fn,SquarePower:xn,SquareRadical:Sv,SquareScissors:Mn,SquareSigma:vn,SquareSlash:yn,SquareSplitHorizontal:mn,SquareSplitVertical:wn,SquareStack:Tv,SquareTerminal:An,SquareUser:En,SquareUserRound:Cn,SquareX:In,Squircle:Rv,Squirrel:Ov,Stamp:Dv,Star:Bv,StarHalf:_v,StarOff:Lv,Stars:ba,StepBack:Pv,StepForward:Hv,Stethoscope:Fv,Sticker:Vv,StickyNote:kv,StopCircle:E0,Store:Uv,StretchHorizontal:Zv,StretchVertical:Gv,Strikethrough:Wv,Subscript:zv,Subtitles:K2,Sun:Kv,SunDim:Xv,SunMedium:qv,SunMoon:Yv,SunSnow:jv,Sunrise:Qv,Sunset:Jv,Superscript:$v,SwatchBook:ty,SwissFranc:ey,SwitchCamera:ay,Sword:ny,Swords:ry,Syringe:iy,Table:py,Table2:sy,TableCellsMerge:hy,TableCellsSplit:oy,TableColumnsSplit:cy,TableProperties:dy,TableRowsSplit:ly,Tablet:gy,TabletSmartphone:uy,Tablets:fy,Tag:xy,Tags:My,Tally1:vy,Tally2:yy,Tally3:my,Tally4:wy,Tally5:Ay,Tangent:Cy,Target:Ey,Telescope:Iy,Tent:Sy,TentTree:by,Terminal:Ty,TerminalSquare:An,TestTube:Ny,TestTube2:bn,TestTubeDiagonal:bn,TestTubes:Ry,Text:By,TextCursor:Dy,TextCursorInput:Oy,TextQuote:_y,TextSearch:Ly,TextSelect:Sn,TextSelection:Sn,Theater:Py,Thermometer:Vy,ThermometerSnowflake:Hy,ThermometerSun:Fy,ThumbsDown:ky,ThumbsUp:Uy,Ticket:Yy,TicketCheck:Zy,TicketMinus:Gy,TicketPercent:Wy,TicketPlus:zy,TicketSlash:Xy,TicketX:qy,Timer:Qy,TimerOff:jy,TimerReset:Ky,ToggleLeft:Jy,ToggleRight:$y,Tornado:tm,Torus:em,Touchpad:nm,TouchpadOff:am,TowerControl:rm,ToyBrick:im,Tractor:sm,TrafficCone:hm,Train:Tn,TrainFront:cm,TrainFrontTunnel:om,TrainTrack:dm,TramFront:Tn,Trash:pm,Trash2:lm,TreeDeciduous:um,TreePalm:Nn,TreePine:gm,Trees:fm,Trello:xm,TrendingDown:Mm,TrendingUp:vm,Triangle:mm,TriangleAlert:Rn,TriangleRight:ym,Trophy:wm,Truck:Am,Turtle:Cm,Tv:Im,Tv2:Em,Twitch:bm,Twitter:Sm,Type:Tm,Umbrella:Rm,UmbrellaOff:Nm,Underline:Om,Undo:Lm,Undo2:Dm,UndoDot:_m,UnfoldHorizontal:Bm,UnfoldVertical:Pm,Ungroup:Hm,University:On,Unlink:Vm,Unlink2:Fm,Unlock:aa,UnlockKeyhole:ea,Unplug:km,Upload:Um,UploadCloud:O0,Usb:Zm,User:Km,User2:Hn,UserCheck:Gm,UserCheck2:Dn,UserCircle:b0,UserCircle2:I0,UserCog:Wm,UserCog2:_n,UserMinus:zm,UserMinus2:Ln,UserPlus:Xm,UserPlus2:Bn,UserRound:Hn,UserRoundCheck:Dn,UserRoundCog:_n,UserRoundMinus:Ln,UserRoundPlus:Bn,UserRoundSearch:qm,UserRoundX:Pn,UserSearch:Ym,UserSquare:En,UserSquare2:Cn,UserX:jm,UserX2:Pn,Users:Qm,Users2:Fn,UsersRound:Fn,Utensils:$m,UtensilsCrossed:Jm,UtilityPole:tw,Variable:ew,Vault:aw,Vegan:nw,VenetianMask:rw,Verified:z2,Vibrate:sw,VibrateOff:iw,Video:ow,VideoOff:hw,Videotape:cw,View:dw,Voicemail:lw,Volume:fw,Volume1:pw,Volume2:uw,VolumeX:gw,Vote:xw,Wallet:vw,Wallet2:Vn,WalletCards:Mw,WalletMinimal:Vn,Wallpaper:yw,Wand:mw,Wand2:kn,WandSparkles:kn,Warehouse:ww,WashingMachine:Aw,Watch:Cw,Waves:Ew,Waypoints:Iw,Webcam:bw,Webhook:Tw,WebhookOff:Sw,Weight:Nw,Wheat:Ow,WheatOff:Rw,WholeWord:Dw,Wifi:Lw,WifiOff:_w,Wind:Bw,Wine:Hw,WineOff:Pw,Workflow:Fw,Worm:Vw,WrapText:kw,Wrench:Uw,X:Zw,XCircle:S0,XOctagon:ha,XSquare:In,Youtube:Gw,Zap:zw,ZapOff:Ww,ZoomIn:Xw,ZoomOut:qw},Symbol.toStringTag,{value:"Module"}));/**
 * @license lucide v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jw=({icons:v={},nameAttr:l="data-lucide",attrs:d={}}={})=>{if(!Object.values(v).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const u=document.querySelectorAll(`[${l}]`);if(Array.from(u).forEach(M=>L2(M,{nameAttr:l,icons:v,attrs:d})),l==="data-lucide"){const M=document.querySelectorAll("[icon-name]");M.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(M).forEach(g=>L2(g,{nameAttr:"icon-name",icons:v,attrs:d})))}};var G;(function(v){v[v.QR_CODE=0]="QR_CODE",v[v.AZTEC=1]="AZTEC",v[v.CODABAR=2]="CODABAR",v[v.CODE_39=3]="CODE_39",v[v.CODE_93=4]="CODE_93",v[v.CODE_128=5]="CODE_128",v[v.DATA_MATRIX=6]="DATA_MATRIX",v[v.MAXICODE=7]="MAXICODE",v[v.ITF=8]="ITF",v[v.EAN_13=9]="EAN_13",v[v.EAN_8=10]="EAN_8",v[v.PDF_417=11]="PDF_417",v[v.RSS_14=12]="RSS_14",v[v.RSS_EXPANDED=13]="RSS_EXPANDED",v[v.UPC_A=14]="UPC_A",v[v.UPC_E=15]="UPC_E",v[v.UPC_EAN_EXTENSION=16]="UPC_EAN_EXTENSION"})(G||(G={}));var Un=new Map([[G.QR_CODE,"QR_CODE"],[G.AZTEC,"AZTEC"],[G.CODABAR,"CODABAR"],[G.CODE_39,"CODE_39"],[G.CODE_93,"CODE_93"],[G.CODE_128,"CODE_128"],[G.DATA_MATRIX,"DATA_MATRIX"],[G.MAXICODE,"MAXICODE"],[G.ITF,"ITF"],[G.EAN_13,"EAN_13"],[G.EAN_8,"EAN_8"],[G.PDF_417,"PDF_417"],[G.RSS_14,"RSS_14"],[G.RSS_EXPANDED,"RSS_EXPANDED"],[G.UPC_A,"UPC_A"],[G.UPC_E,"UPC_E"],[G.UPC_EAN_EXTENSION,"UPC_EAN_EXTENSION"]]),Zn;(function(v){v[v.UNKNOWN=0]="UNKNOWN",v[v.URL=1]="URL"})(Zn||(Zn={}));function Kw(v){return Object.values(G).includes(v)}var P1;(function(v){v[v.SCAN_TYPE_CAMERA=0]="SCAN_TYPE_CAMERA",v[v.SCAN_TYPE_FILE=1]="SCAN_TYPE_FILE"})(P1||(P1={}));var Qw=function(){function v(){}return v.GITHUB_PROJECT_URL="https://github.com/mebjas/html5-qrcode",v.SCAN_DEFAULT_FPS=2,v.DEFAULT_DISABLE_FLIP=!1,v.DEFAULT_REMEMBER_LAST_CAMERA_USED=!0,v.DEFAULT_SUPPORTED_SCAN_TYPE=[P1.SCAN_TYPE_CAMERA,P1.SCAN_TYPE_FILE],v}(),Jn=function(){function v(l,d){this.format=l,this.formatName=d}return v.prototype.toString=function(){return this.formatName},v.create=function(l){if(!Un.has(l))throw"".concat(l," not in html5QrcodeSupportedFormatsTextMap");return new v(l,Un.get(l))},v}(),Gn=function(){function v(){}return v.createFromText=function(l){var d={text:l};return{decodedText:l,result:d}},v.createFromQrcodeResult=function(l){return{decodedText:l.text,result:l}},v}(),o2;(function(v){v[v.UNKWOWN_ERROR=0]="UNKWOWN_ERROR",v[v.IMPLEMENTATION_ERROR=1]="IMPLEMENTATION_ERROR",v[v.NO_CODE_FOUND_ERROR=2]="NO_CODE_FOUND_ERROR"})(o2||(o2={}));var Jw=function(){function v(){}return v.createFrom=function(l){return{errorMessage:l,type:o2.UNKWOWN_ERROR}},v}(),$w=function(){function v(l){this.verbose=l}return v.prototype.log=function(l){this.verbose&&console.log(l)},v.prototype.warn=function(l){this.verbose&&console.warn(l)},v.prototype.logError=function(l,d){(this.verbose||d===!0)&&console.error(l)},v.prototype.logErrors=function(l){if(l.length===0)throw"Logger#logError called without arguments";this.verbose&&console.error(l)},v}();function Se(v){return typeof v>"u"||v===null}var r1=function(){function v(){}return v.codeParseError=function(l){return"QR code parse error, error = ".concat(l)},v.errorGettingUserMedia=function(l){return"Error getting userMedia, error = ".concat(l)},v.onlyDeviceSupportedError=function(){return"The device doesn't support navigator.mediaDevices , only supported cameraIdOrConfig in this case is deviceId parameter (string)."},v.cameraStreamingNotSupported=function(){return"Camera streaming not supported by the browser."},v.unableToQuerySupportedDevices=function(){return"Unable to query supported devices, unknown error."},v.insecureContextCameraQueryError=function(){return"Camera access is only supported in secure context like https or localhost."},v.scannerPaused=function(){return"Scanner paused"},v}(),$n=function(){function v(){}return v.isMediaStreamConstraintsValid=function(l,d){if(typeof l!="object"){var u=typeof l;return d.logError("videoConstraints should be of type object, the "+"object passed is of type ".concat(u,"."),!0),!1}for(var M=["autoGainControl","channelCount","echoCancellation","latency","noiseSuppression","sampleRate","sampleSize","volume"],g=new Set(M),C=Object.keys(l),b=0,N=C;b<N.length;b++){var w=N[b];if(g.has(w))return d.logError("".concat(w," is not supported videoConstaints."),!0),!1}return!0},v}(),v1=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function tA(v){return v&&v.__esModule&&Object.prototype.hasOwnProperty.call(v,"default")?v.default:v}var c2={exports:{}};(function(v,l){(function(d,u){u(l)})(v1,function(d){function u(f){return f==null}var M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(f,t){f.__proto__=t}||function(f,t){for(var e in t)t.hasOwnProperty(e)&&(f[e]=t[e])};function g(f,t){M(f,t);function e(){this.constructor=f}f.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}function C(f,t){var e=Object.setPrototypeOf;e?e(f,t):f.__proto__=t}function b(f,t){t===void 0&&(t=f.constructor);var e=Error.captureStackTrace;e&&e(f,t)}var N=function(f){g(t,f);function t(e){var a=this.constructor,n=f.call(this,e)||this;return Object.defineProperty(n,"name",{value:a.name,enumerable:!1}),C(n,a.prototype),b(n),n}return t}(Error);class w extends N{constructor(t=void 0){super(t),this.message=t}getKind(){return this.constructor.kind}}w.kind="Exception";class _ extends w{}_.kind="ArgumentException";class D extends w{}D.kind="IllegalArgumentException";class j{constructor(t){if(this.binarizer=t,t===null)throw new D("Binarizer must be non-null.")}getWidth(){return this.binarizer.getWidth()}getHeight(){return this.binarizer.getHeight()}getBlackRow(t,e){return this.binarizer.getBlackRow(t,e)}getBlackMatrix(){return(this.matrix===null||this.matrix===void 0)&&(this.matrix=this.binarizer.getBlackMatrix()),this.matrix}isCropSupported(){return this.binarizer.getLuminanceSource().isCropSupported()}crop(t,e,a,n){const r=this.binarizer.getLuminanceSource().crop(t,e,a,n);return new j(this.binarizer.createBinarizer(r))}isRotateSupported(){return this.binarizer.getLuminanceSource().isRotateSupported()}rotateCounterClockwise(){const t=this.binarizer.getLuminanceSource().rotateCounterClockwise();return new j(this.binarizer.createBinarizer(t))}rotateCounterClockwise45(){const t=this.binarizer.getLuminanceSource().rotateCounterClockwise45();return new j(this.binarizer.createBinarizer(t))}toString(){try{return this.getBlackMatrix().toString()}catch{return""}}}class z extends w{static getChecksumInstance(){return new z}}z.kind="ChecksumException";class pt{constructor(t){this.source=t}getLuminanceSource(){return this.source}getWidth(){return this.source.getWidth()}getHeight(){return this.source.getHeight()}}class q{static arraycopy(t,e,a,n,r){for(;r--;)a[n++]=t[e++]}static currentTimeMillis(){return Date.now()}}class ct extends w{}ct.kind="IndexOutOfBoundsException";class Tt extends ct{constructor(t=void 0,e=void 0){super(e),this.index=t,this.message=e}}Tt.kind="ArrayIndexOutOfBoundsException";class st{static fill(t,e){for(let a=0,n=t.length;a<n;a++)t[a]=e}static fillWithin(t,e,a,n){st.rangeCheck(t.length,e,a);for(let r=e;r<a;r++)t[r]=n}static rangeCheck(t,e,a){if(e>a)throw new D("fromIndex("+e+") > toIndex("+a+")");if(e<0)throw new Tt(e);if(a>t)throw new Tt(a)}static asList(...t){return t}static create(t,e,a){return Array.from({length:t}).map(r=>Array.from({length:e}).fill(a))}static createInt32Array(t,e,a){return Array.from({length:t}).map(r=>Int32Array.from({length:e}).fill(a))}static equals(t,e){if(!t||!e||!t.length||!e.length||t.length!==e.length)return!1;for(let a=0,n=t.length;a<n;a++)if(t[a]!==e[a])return!1;return!0}static hashCode(t){if(t===null)return 0;let e=1;for(const a of t)e=31*e+a;return e}static fillUint8Array(t,e){for(let a=0;a!==t.length;a++)t[a]=e}static copyOf(t,e){return t.slice(0,e)}static copyOfUint8Array(t,e){if(t.length<=e){const a=new Uint8Array(e);return a.set(t),a}return t.slice(0,e)}static copyOfRange(t,e,a){const n=a-e,r=new Int32Array(n);return q.arraycopy(t,e,r,0,n),r}static binarySearch(t,e,a){a===void 0&&(a=st.numberComparator);let n=0,r=t.length-1;for(;n<=r;){const s=r+n>>1,h=a(e,t[s]);if(h>0)n=s+1;else if(h<0)r=s-1;else return s}return-n-1}static numberComparator(t,e){return t-e}}class Y{static numberOfTrailingZeros(t){let e;if(t===0)return 32;let a=31;return e=t<<16,e!==0&&(a-=16,t=e),e=t<<8,e!==0&&(a-=8,t=e),e=t<<4,e!==0&&(a-=4,t=e),e=t<<2,e!==0&&(a-=2,t=e),a-(t<<1>>>31)}static numberOfLeadingZeros(t){if(t===0)return 32;let e=1;return t>>>16||(e+=16,t<<=16),t>>>24||(e+=8,t<<=8),t>>>28||(e+=4,t<<=4),t>>>30||(e+=2,t<<=2),e-=t>>>31,e}static toHexString(t){return t.toString(16)}static toBinaryString(t){return String(parseInt(String(t),2))}static bitCount(t){return t=t-(t>>>1&1431655765),t=(t&858993459)+(t>>>2&858993459),t=t+(t>>>4)&252645135,t=t+(t>>>8),t=t+(t>>>16),t&63}static truncDivision(t,e){return Math.trunc(t/e)}static parseInt(t,e=void 0){return parseInt(t,e)}}Y.MIN_VALUE_32_BITS=-2147483648,Y.MAX_VALUE=Number.MAX_SAFE_INTEGER;class et{constructor(t,e){t===void 0?(this.size=0,this.bits=new Int32Array(1)):(this.size=t,e==null?this.bits=et.makeArray(t):this.bits=e)}getSize(){return this.size}getSizeInBytes(){return Math.floor((this.size+7)/8)}ensureCapacity(t){if(t>this.bits.length*32){const e=et.makeArray(t);q.arraycopy(this.bits,0,e,0,this.bits.length),this.bits=e}}get(t){return(this.bits[Math.floor(t/32)]&1<<(t&31))!==0}set(t){this.bits[Math.floor(t/32)]|=1<<(t&31)}flip(t){this.bits[Math.floor(t/32)]^=1<<(t&31)}getNextSet(t){const e=this.size;if(t>=e)return e;const a=this.bits;let n=Math.floor(t/32),r=a[n];r&=~((1<<(t&31))-1);const s=a.length;for(;r===0;){if(++n===s)return e;r=a[n]}const h=n*32+Y.numberOfTrailingZeros(r);return h>e?e:h}getNextUnset(t){const e=this.size;if(t>=e)return e;const a=this.bits;let n=Math.floor(t/32),r=~a[n];r&=~((1<<(t&31))-1);const s=a.length;for(;r===0;){if(++n===s)return e;r=~a[n]}const h=n*32+Y.numberOfTrailingZeros(r);return h>e?e:h}setBulk(t,e){this.bits[Math.floor(t/32)]=e}setRange(t,e){if(e<t||t<0||e>this.size)throw new D;if(e===t)return;e--;const a=Math.floor(t/32),n=Math.floor(e/32),r=this.bits;for(let s=a;s<=n;s++){const h=s>a?0:t&31,c=(2<<(s<n?31:e&31))-(1<<h);r[s]|=c}}clear(){const t=this.bits.length,e=this.bits;for(let a=0;a<t;a++)e[a]=0}isRange(t,e,a){if(e<t||t<0||e>this.size)throw new D;if(e===t)return!0;e--;const n=Math.floor(t/32),r=Math.floor(e/32),s=this.bits;for(let h=n;h<=r;h++){const o=h>n?0:t&31,p=(2<<(h<r?31:e&31))-(1<<o)&4294967295;if((s[h]&p)!==(a?p:0))return!1}return!0}appendBit(t){this.ensureCapacity(this.size+1),t&&(this.bits[Math.floor(this.size/32)]|=1<<(this.size&31)),this.size++}appendBits(t,e){if(e<0||e>32)throw new D("Num bits must be between 0 and 32");this.ensureCapacity(this.size+e);for(let a=e;a>0;a--)this.appendBit((t>>a-1&1)===1)}appendBitArray(t){const e=t.size;this.ensureCapacity(this.size+e);for(let a=0;a<e;a++)this.appendBit(t.get(a))}xor(t){if(this.size!==t.size)throw new D("Sizes don't match");const e=this.bits;for(let a=0,n=e.length;a<n;a++)e[a]^=t.bits[a]}toBytes(t,e,a,n){for(let r=0;r<n;r++){let s=0;for(let h=0;h<8;h++)this.get(t)&&(s|=1<<7-h),t++;e[a+r]=s}}getBitArray(){return this.bits}reverse(){const t=new Int32Array(this.bits.length),e=Math.floor((this.size-1)/32),a=e+1,n=this.bits;for(let r=0;r<a;r++){let s=n[r];s=s>>1&1431655765|(s&1431655765)<<1,s=s>>2&858993459|(s&858993459)<<2,s=s>>4&252645135|(s&252645135)<<4,s=s>>8&16711935|(s&16711935)<<8,s=s>>16&65535|(s&65535)<<16,t[e-r]=s}if(this.size!==a*32){const r=a*32-this.size;let s=t[0]>>>r;for(let h=1;h<a;h++){const o=t[h];s|=o<<32-r,t[h-1]=s,s=o>>>r}t[a-1]=s}this.bits=t}static makeArray(t){return new Int32Array(Math.floor((t+31)/32))}equals(t){if(!(t instanceof et))return!1;const e=t;return this.size===e.size&&st.equals(this.bits,e.bits)}hashCode(){return 31*this.size+st.hashCode(this.bits)}toString(){let t="";for(let e=0,a=this.size;e<a;e++)e&7||(t+=" "),t+=this.get(e)?"X":".";return t}clone(){return new et(this.size,this.bits.slice())}}var le;(function(f){f[f.OTHER=0]="OTHER",f[f.PURE_BARCODE=1]="PURE_BARCODE",f[f.POSSIBLE_FORMATS=2]="POSSIBLE_FORMATS",f[f.TRY_HARDER=3]="TRY_HARDER",f[f.CHARACTER_SET=4]="CHARACTER_SET",f[f.ALLOWED_LENGTHS=5]="ALLOWED_LENGTHS",f[f.ASSUME_CODE_39_CHECK_DIGIT=6]="ASSUME_CODE_39_CHECK_DIGIT",f[f.ASSUME_GS1=7]="ASSUME_GS1",f[f.RETURN_CODABAR_START_END=8]="RETURN_CODABAR_START_END",f[f.NEED_RESULT_POINT_CALLBACK=9]="NEED_RESULT_POINT_CALLBACK",f[f.ALLOWED_EAN_EXTENSIONS=10]="ALLOWED_EAN_EXTENSIONS"})(le||(le={}));var ut=le;class k extends w{static getFormatInstance(){return new k}}k.kind="FormatException";var vt;(function(f){f[f.Cp437=0]="Cp437",f[f.ISO8859_1=1]="ISO8859_1",f[f.ISO8859_2=2]="ISO8859_2",f[f.ISO8859_3=3]="ISO8859_3",f[f.ISO8859_4=4]="ISO8859_4",f[f.ISO8859_5=5]="ISO8859_5",f[f.ISO8859_6=6]="ISO8859_6",f[f.ISO8859_7=7]="ISO8859_7",f[f.ISO8859_8=8]="ISO8859_8",f[f.ISO8859_9=9]="ISO8859_9",f[f.ISO8859_10=10]="ISO8859_10",f[f.ISO8859_11=11]="ISO8859_11",f[f.ISO8859_13=12]="ISO8859_13",f[f.ISO8859_14=13]="ISO8859_14",f[f.ISO8859_15=14]="ISO8859_15",f[f.ISO8859_16=15]="ISO8859_16",f[f.SJIS=16]="SJIS",f[f.Cp1250=17]="Cp1250",f[f.Cp1251=18]="Cp1251",f[f.Cp1252=19]="Cp1252",f[f.Cp1256=20]="Cp1256",f[f.UnicodeBigUnmarked=21]="UnicodeBigUnmarked",f[f.UTF8=22]="UTF8",f[f.ASCII=23]="ASCII",f[f.Big5=24]="Big5",f[f.GB18030=25]="GB18030",f[f.EUC_KR=26]="EUC_KR"})(vt||(vt={}));class V{constructor(t,e,a,...n){this.valueIdentifier=t,this.name=a,typeof e=="number"?this.values=Int32Array.from([e]):this.values=e,this.otherEncodingNames=n,V.VALUE_IDENTIFIER_TO_ECI.set(t,this),V.NAME_TO_ECI.set(a,this);const r=this.values;for(let s=0,h=r.length;s!==h;s++){const o=r[s];V.VALUES_TO_ECI.set(o,this)}for(const s of n)V.NAME_TO_ECI.set(s,this)}getValueIdentifier(){return this.valueIdentifier}getName(){return this.name}getValue(){return this.values[0]}static getCharacterSetECIByValue(t){if(t<0||t>=900)throw new k("incorect value");const e=V.VALUES_TO_ECI.get(t);if(e===void 0)throw new k("incorect value");return e}static getCharacterSetECIByName(t){const e=V.NAME_TO_ECI.get(t);if(e===void 0)throw new k("incorect value");return e}equals(t){if(!(t instanceof V))return!1;const e=t;return this.getName()===e.getName()}}V.VALUE_IDENTIFIER_TO_ECI=new Map,V.VALUES_TO_ECI=new Map,V.NAME_TO_ECI=new Map,V.Cp437=new V(vt.Cp437,Int32Array.from([0,2]),"Cp437"),V.ISO8859_1=new V(vt.ISO8859_1,Int32Array.from([1,3]),"ISO-8859-1","ISO88591","ISO8859_1"),V.ISO8859_2=new V(vt.ISO8859_2,4,"ISO-8859-2","ISO88592","ISO8859_2"),V.ISO8859_3=new V(vt.ISO8859_3,5,"ISO-8859-3","ISO88593","ISO8859_3"),V.ISO8859_4=new V(vt.ISO8859_4,6,"ISO-8859-4","ISO88594","ISO8859_4"),V.ISO8859_5=new V(vt.ISO8859_5,7,"ISO-8859-5","ISO88595","ISO8859_5"),V.ISO8859_6=new V(vt.ISO8859_6,8,"ISO-8859-6","ISO88596","ISO8859_6"),V.ISO8859_7=new V(vt.ISO8859_7,9,"ISO-8859-7","ISO88597","ISO8859_7"),V.ISO8859_8=new V(vt.ISO8859_8,10,"ISO-8859-8","ISO88598","ISO8859_8"),V.ISO8859_9=new V(vt.ISO8859_9,11,"ISO-8859-9","ISO88599","ISO8859_9"),V.ISO8859_10=new V(vt.ISO8859_10,12,"ISO-8859-10","ISO885910","ISO8859_10"),V.ISO8859_11=new V(vt.ISO8859_11,13,"ISO-8859-11","ISO885911","ISO8859_11"),V.ISO8859_13=new V(vt.ISO8859_13,15,"ISO-8859-13","ISO885913","ISO8859_13"),V.ISO8859_14=new V(vt.ISO8859_14,16,"ISO-8859-14","ISO885914","ISO8859_14"),V.ISO8859_15=new V(vt.ISO8859_15,17,"ISO-8859-15","ISO885915","ISO8859_15"),V.ISO8859_16=new V(vt.ISO8859_16,18,"ISO-8859-16","ISO885916","ISO8859_16"),V.SJIS=new V(vt.SJIS,20,"SJIS","Shift_JIS"),V.Cp1250=new V(vt.Cp1250,21,"Cp1250","windows-1250"),V.Cp1251=new V(vt.Cp1251,22,"Cp1251","windows-1251"),V.Cp1252=new V(vt.Cp1252,23,"Cp1252","windows-1252"),V.Cp1256=new V(vt.Cp1256,24,"Cp1256","windows-1256"),V.UnicodeBigUnmarked=new V(vt.UnicodeBigUnmarked,25,"UnicodeBigUnmarked","UTF-16BE","UnicodeBig"),V.UTF8=new V(vt.UTF8,26,"UTF8","UTF-8"),V.ASCII=new V(vt.ASCII,Int32Array.from([27,170]),"ASCII","US-ASCII"),V.Big5=new V(vt.Big5,28,"Big5"),V.GB18030=new V(vt.GB18030,29,"GB18030","GB2312","EUC_CN","GBK"),V.EUC_KR=new V(vt.EUC_KR,30,"EUC_KR","EUC-KR");class Xe extends w{}Xe.kind="UnsupportedOperationException";class ae{static decode(t,e){const a=this.encodingName(e);return this.customDecoder?this.customDecoder(t,a):typeof TextDecoder>"u"||this.shouldDecodeOnFallback(a)?this.decodeFallback(t,a):new TextDecoder(a).decode(t)}static shouldDecodeOnFallback(t){return!ae.isBrowser()&&t==="ISO-8859-1"}static encode(t,e){const a=this.encodingName(e);return this.customEncoder?this.customEncoder(t,a):typeof TextEncoder>"u"?this.encodeFallback(t):new TextEncoder().encode(t)}static isBrowser(){return typeof window<"u"&&{}.toString.call(window)==="[object Window]"}static encodingName(t){return typeof t=="string"?t:t.getName()}static encodingCharacterSet(t){return t instanceof V?t:V.getCharacterSetECIByName(t)}static decodeFallback(t,e){const a=this.encodingCharacterSet(e);if(ae.isDecodeFallbackSupported(a)){let n="";for(let r=0,s=t.length;r<s;r++){let h=t[r].toString(16);h.length<2&&(h="0"+h),n+="%"+h}return decodeURIComponent(n)}if(a.equals(V.UnicodeBigUnmarked))return String.fromCharCode.apply(null,new Uint16Array(t.buffer));throw new Xe(`Encoding ${this.encodingName(e)} not supported by fallback.`)}static isDecodeFallbackSupported(t){return t.equals(V.UTF8)||t.equals(V.ISO8859_1)||t.equals(V.ASCII)}static encodeFallback(t){const a=btoa(unescape(encodeURIComponent(t))).split(""),n=[];for(let r=0;r<a.length;r++)n.push(a[r].charCodeAt(0));return new Uint8Array(n)}}class tt{static castAsNonUtf8Char(t,e=null){const a=e?e.getName():this.ISO88591;return ae.decode(new Uint8Array([t]),a)}static guessEncoding(t,e){if(e!=null&&e.get(ut.CHARACTER_SET)!==void 0)return e.get(ut.CHARACTER_SET).toString();const a=t.length;let n=!0,r=!0,s=!0,h=0,o=0,c=0,p=0,x=0,y=0,A=0,E=0,I=0,S=0,O=0;const H=t.length>3&&t[0]===239&&t[1]===187&&t[2]===191;for(let F=0;F<a&&(n||r||s);F++){const P=t[F]&255;s&&(h>0?P&128?h--:s=!1:P&128&&(P&64?(h++,P&32?(h++,P&16?(h++,P&8?s=!1:p++):c++):o++):s=!1)),n&&(P>127&&P<160?n=!1:P>159&&(P<192||P===215||P===247)&&O++),r&&(x>0?P<64||P===127||P>252?r=!1:x--:P===128||P===160||P>239?r=!1:P>160&&P<224?(y++,E=0,A++,A>I&&(I=A)):P>127?(x++,A=0,E++,E>S&&(S=E)):(A=0,E=0))}return s&&h>0&&(s=!1),r&&x>0&&(r=!1),s&&(H||o+c+p>0)?tt.UTF8:r&&(tt.ASSUME_SHIFT_JIS||I>=3||S>=3)?tt.SHIFT_JIS:n&&r?I===2&&y===2||O*10>=a?tt.SHIFT_JIS:tt.ISO88591:n?tt.ISO88591:r?tt.SHIFT_JIS:s?tt.UTF8:tt.PLATFORM_DEFAULT_ENCODING}static format(t,...e){let a=-1;function n(s,h,o,c,p,x){if(s==="%%")return"%";if(e[++a]===void 0)return;s=c?parseInt(c.substr(1)):void 0;let y=p?parseInt(p.substr(1)):void 0,A;switch(x){case"s":A=e[a];break;case"c":A=e[a][0];break;case"f":A=parseFloat(e[a]).toFixed(s);break;case"p":A=parseFloat(e[a]).toPrecision(s);break;case"e":A=parseFloat(e[a]).toExponential(s);break;case"x":A=parseInt(e[a]).toString(y||16);break;case"d":A=parseFloat(parseInt(e[a],y||10).toPrecision(s)).toFixed(0);break}A=typeof A=="object"?JSON.stringify(A):(+A).toString(y);let E=parseInt(o),I=o&&o[0]+""=="0"?"0":" ";for(;A.length<E;)A=h!==void 0?A+I:I+A;return A}let r=/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;return t.replace(r,n)}static getBytes(t,e){return ae.encode(t,e)}static getCharCode(t,e=0){return t.charCodeAt(e)}static getCharAt(t){return String.fromCharCode(t)}}tt.SHIFT_JIS=V.SJIS.getName(),tt.GB2312="GB2312",tt.ISO88591=V.ISO8859_1.getName(),tt.EUC_JP="EUC_JP",tt.UTF8=V.UTF8.getName(),tt.PLATFORM_DEFAULT_ENCODING=tt.UTF8,tt.ASSUME_SHIFT_JIS=!1;class yt{constructor(t=""){this.value=t}enableDecoding(t){return this.encoding=t,this}append(t){return typeof t=="string"?this.value+=t.toString():this.encoding?this.value+=tt.castAsNonUtf8Char(t,this.encoding):this.value+=String.fromCharCode(t),this}appendChars(t,e,a){for(let n=e;e<e+a;n++)this.append(t[n]);return this}length(){return this.value.length}charAt(t){return this.value.charAt(t)}deleteCharAt(t){this.value=this.value.substr(0,t)+this.value.substring(t+1)}setCharAt(t,e){this.value=this.value.substr(0,t)+e+this.value.substr(t+1)}substring(t,e){return this.value.substring(t,e)}setLengthToZero(){this.value=""}toString(){return this.value}insert(t,e){this.value=this.value.substr(0,t)+e+this.value.substr(t+e.length)}}class Ut{constructor(t,e,a,n){if(this.width=t,this.height=e,this.rowSize=a,this.bits=n,e==null&&(e=t),this.height=e,t<1||e<1)throw new D("Both dimensions must be greater than 0");a==null&&(a=Math.floor((t+31)/32)),this.rowSize=a,n==null&&(this.bits=new Int32Array(this.rowSize*this.height))}static parseFromBooleanArray(t){const e=t.length,a=t[0].length,n=new Ut(a,e);for(let r=0;r<e;r++){const s=t[r];for(let h=0;h<a;h++)s[h]&&n.set(h,r)}return n}static parseFromString(t,e,a){if(t===null)throw new D("stringRepresentation cannot be null");const n=new Array(t.length);let r=0,s=0,h=-1,o=0,c=0;for(;c<t.length;)if(t.charAt(c)===`
`||t.charAt(c)==="\r"){if(r>s){if(h===-1)h=r-s;else if(r-s!==h)throw new D("row lengths do not match");s=r,o++}c++}else if(t.substring(c,c+e.length)===e)c+=e.length,n[r]=!0,r++;else if(t.substring(c,c+a.length)===a)c+=a.length,n[r]=!1,r++;else throw new D("illegal character encountered: "+t.substring(c));if(r>s){if(h===-1)h=r-s;else if(r-s!==h)throw new D("row lengths do not match");o++}const p=new Ut(h,o);for(let x=0;x<r;x++)n[x]&&p.set(Math.floor(x%h),Math.floor(x/h));return p}get(t,e){const a=e*this.rowSize+Math.floor(t/32);return(this.bits[a]>>>(t&31)&1)!==0}set(t,e){const a=e*this.rowSize+Math.floor(t/32);this.bits[a]|=1<<(t&31)&4294967295}unset(t,e){const a=e*this.rowSize+Math.floor(t/32);this.bits[a]&=~(1<<(t&31)&4294967295)}flip(t,e){const a=e*this.rowSize+Math.floor(t/32);this.bits[a]^=1<<(t&31)&4294967295}xor(t){if(this.width!==t.getWidth()||this.height!==t.getHeight()||this.rowSize!==t.getRowSize())throw new D("input matrix dimensions do not match");const e=new et(Math.floor(this.width/32)+1),a=this.rowSize,n=this.bits;for(let r=0,s=this.height;r<s;r++){const h=r*a,o=t.getRow(r,e).getBitArray();for(let c=0;c<a;c++)n[h+c]^=o[c]}}clear(){const t=this.bits,e=t.length;for(let a=0;a<e;a++)t[a]=0}setRegion(t,e,a,n){if(e<0||t<0)throw new D("Left and top must be nonnegative");if(n<1||a<1)throw new D("Height and width must be at least 1");const r=t+a,s=e+n;if(s>this.height||r>this.width)throw new D("The region must fit inside the matrix");const h=this.rowSize,o=this.bits;for(let c=e;c<s;c++){const p=c*h;for(let x=t;x<r;x++)o[p+Math.floor(x/32)]|=1<<(x&31)&4294967295}}getRow(t,e){e==null||e.getSize()<this.width?e=new et(this.width):e.clear();const a=this.rowSize,n=this.bits,r=t*a;for(let s=0;s<a;s++)e.setBulk(s*32,n[r+s]);return e}setRow(t,e){q.arraycopy(e.getBitArray(),0,this.bits,t*this.rowSize,this.rowSize)}rotate180(){const t=this.getWidth(),e=this.getHeight();let a=new et(t),n=new et(t);for(let r=0,s=Math.floor((e+1)/2);r<s;r++)a=this.getRow(r,a),n=this.getRow(e-1-r,n),a.reverse(),n.reverse(),this.setRow(r,n),this.setRow(e-1-r,a)}getEnclosingRectangle(){const t=this.width,e=this.height,a=this.rowSize,n=this.bits;let r=t,s=e,h=-1,o=-1;for(let c=0;c<e;c++)for(let p=0;p<a;p++){const x=n[c*a+p];if(x!==0){if(c<s&&(s=c),c>o&&(o=c),p*32<r){let y=0;for(;!(x<<31-y&4294967295);)y++;p*32+y<r&&(r=p*32+y)}if(p*32+31>h){let y=31;for(;!(x>>>y);)y--;p*32+y>h&&(h=p*32+y)}}}return h<r||o<s?null:Int32Array.from([r,s,h-r+1,o-s+1])}getTopLeftOnBit(){const t=this.rowSize,e=this.bits;let a=0;for(;a<e.length&&e[a]===0;)a++;if(a===e.length)return null;const n=a/t;let r=a%t*32;const s=e[a];let h=0;for(;!(s<<31-h&4294967295);)h++;return r+=h,Int32Array.from([r,n])}getBottomRightOnBit(){const t=this.rowSize,e=this.bits;let a=e.length-1;for(;a>=0&&e[a]===0;)a--;if(a<0)return null;const n=Math.floor(a/t);let r=Math.floor(a%t)*32;const s=e[a];let h=31;for(;!(s>>>h);)h--;return r+=h,Int32Array.from([r,n])}getWidth(){return this.width}getHeight(){return this.height}getRowSize(){return this.rowSize}equals(t){if(!(t instanceof Ut))return!1;const e=t;return this.width===e.width&&this.height===e.height&&this.rowSize===e.rowSize&&st.equals(this.bits,e.bits)}hashCode(){let t=this.width;return t=31*t+this.width,t=31*t+this.height,t=31*t+this.rowSize,t=31*t+st.hashCode(this.bits),t}toString(t="X ",e="  ",a=`
`){return this.buildToString(t,e,a)}buildToString(t,e,a){let n=new yt;for(let r=0,s=this.height;r<s;r++){for(let h=0,o=this.width;h<o;h++)n.append(this.get(h,r)?t:e);n.append(a)}return n.toString()}clone(){return new Ut(this.width,this.height,this.rowSize,this.bits.slice())}}class L extends w{static getNotFoundInstance(){return new L}}L.kind="NotFoundException";class Zt extends pt{constructor(t){super(t),this.luminances=Zt.EMPTY,this.buckets=new Int32Array(Zt.LUMINANCE_BUCKETS)}getBlackRow(t,e){const a=this.getLuminanceSource(),n=a.getWidth();e==null||e.getSize()<n?e=new et(n):e.clear(),this.initArrays(n);const r=a.getRow(t,this.luminances),s=this.buckets;for(let o=0;o<n;o++)s[(r[o]&255)>>Zt.LUMINANCE_SHIFT]++;const h=Zt.estimateBlackPoint(s);if(n<3)for(let o=0;o<n;o++)(r[o]&255)<h&&e.set(o);else{let o=r[0]&255,c=r[1]&255;for(let p=1;p<n-1;p++){const x=r[p+1]&255;(c*4-o-x)/2<h&&e.set(p),o=c,c=x}}return e}getBlackMatrix(){const t=this.getLuminanceSource(),e=t.getWidth(),a=t.getHeight(),n=new Ut(e,a);this.initArrays(e);const r=this.buckets;for(let o=1;o<5;o++){const c=Math.floor(a*o/5),p=t.getRow(c,this.luminances),x=Math.floor(e*4/5);for(let y=Math.floor(e/5);y<x;y++){const A=p[y]&255;r[A>>Zt.LUMINANCE_SHIFT]++}}const s=Zt.estimateBlackPoint(r),h=t.getMatrix();for(let o=0;o<a;o++){const c=o*e;for(let p=0;p<e;p++)(h[c+p]&255)<s&&n.set(p,o)}return n}createBinarizer(t){return new Zt(t)}initArrays(t){this.luminances.length<t&&(this.luminances=new Uint8ClampedArray(t));const e=this.buckets;for(let a=0;a<Zt.LUMINANCE_BUCKETS;a++)e[a]=0}static estimateBlackPoint(t){const e=t.length;let a=0,n=0,r=0;for(let p=0;p<e;p++)t[p]>r&&(n=p,r=t[p]),t[p]>a&&(a=t[p]);let s=0,h=0;for(let p=0;p<e;p++){const x=p-n,y=t[p]*x*x;y>h&&(s=p,h=y)}if(n>s){const p=n;n=s,s=p}if(s-n<=e/16)throw new L;let o=s-1,c=-1;for(let p=s-1;p>n;p--){const x=p-n,y=x*x*(s-p)*(a-t[p]);y>c&&(o=p,c=y)}return o<<Zt.LUMINANCE_SHIFT}}Zt.LUMINANCE_BITS=5,Zt.LUMINANCE_SHIFT=8-Zt.LUMINANCE_BITS,Zt.LUMINANCE_BUCKETS=1<<Zt.LUMINANCE_BITS,Zt.EMPTY=Uint8ClampedArray.from([0]);class nt extends Zt{constructor(t){super(t),this.matrix=null}getBlackMatrix(){if(this.matrix!==null)return this.matrix;const t=this.getLuminanceSource(),e=t.getWidth(),a=t.getHeight();if(e>=nt.MINIMUM_DIMENSION&&a>=nt.MINIMUM_DIMENSION){const n=t.getMatrix();let r=e>>nt.BLOCK_SIZE_POWER;e&nt.BLOCK_SIZE_MASK&&r++;let s=a>>nt.BLOCK_SIZE_POWER;a&nt.BLOCK_SIZE_MASK&&s++;const h=nt.calculateBlackPoints(n,r,s,e,a),o=new Ut(e,a);nt.calculateThresholdForBlock(n,r,s,e,a,h,o),this.matrix=o}else this.matrix=super.getBlackMatrix();return this.matrix}createBinarizer(t){return new nt(t)}static calculateThresholdForBlock(t,e,a,n,r,s,h){const o=r-nt.BLOCK_SIZE,c=n-nt.BLOCK_SIZE;for(let p=0;p<a;p++){let x=p<<nt.BLOCK_SIZE_POWER;x>o&&(x=o);const y=nt.cap(p,2,a-3);for(let A=0;A<e;A++){let E=A<<nt.BLOCK_SIZE_POWER;E>c&&(E=c);const I=nt.cap(A,2,e-3);let S=0;for(let H=-2;H<=2;H++){const F=s[y+H];S+=F[I-2]+F[I-1]+F[I]+F[I+1]+F[I+2]}const O=S/25;nt.thresholdBlock(t,E,x,O,n,h)}}}static cap(t,e,a){return t<e?e:t>a?a:t}static thresholdBlock(t,e,a,n,r,s){for(let h=0,o=a*r+e;h<nt.BLOCK_SIZE;h++,o+=r)for(let c=0;c<nt.BLOCK_SIZE;c++)(t[o+c]&255)<=n&&s.set(e+c,a+h)}static calculateBlackPoints(t,e,a,n,r){const s=r-nt.BLOCK_SIZE,h=n-nt.BLOCK_SIZE,o=new Array(a);for(let c=0;c<a;c++){o[c]=new Int32Array(e);let p=c<<nt.BLOCK_SIZE_POWER;p>s&&(p=s);for(let x=0;x<e;x++){let y=x<<nt.BLOCK_SIZE_POWER;y>h&&(y=h);let A=0,E=255,I=0;for(let O=0,H=p*n+y;O<nt.BLOCK_SIZE;O++,H+=n){for(let F=0;F<nt.BLOCK_SIZE;F++){const P=t[H+F]&255;A+=P,P<E&&(E=P),P>I&&(I=P)}if(I-E>nt.MIN_DYNAMIC_RANGE)for(O++,H+=n;O<nt.BLOCK_SIZE;O++,H+=n)for(let F=0;F<nt.BLOCK_SIZE;F++)A+=t[H+F]&255}let S=A>>nt.BLOCK_SIZE_POWER*2;if(I-E<=nt.MIN_DYNAMIC_RANGE&&(S=E/2,c>0&&x>0)){const O=(o[c-1][x]+2*o[c][x-1]+o[c-1][x-1])/4;E<O&&(S=O)}o[c][x]=S}}return o}}nt.BLOCK_SIZE_POWER=3,nt.BLOCK_SIZE=1<<nt.BLOCK_SIZE_POWER,nt.BLOCK_SIZE_MASK=nt.BLOCK_SIZE-1,nt.MINIMUM_DIMENSION=nt.BLOCK_SIZE*5,nt.MIN_DYNAMIC_RANGE=24;class i1{constructor(t,e){this.width=t,this.height=e}getWidth(){return this.width}getHeight(){return this.height}isCropSupported(){return!1}crop(t,e,a,n){throw new Xe("This luminance source does not support cropping.")}isRotateSupported(){return!1}rotateCounterClockwise(){throw new Xe("This luminance source does not support rotation by 90 degrees.")}rotateCounterClockwise45(){throw new Xe("This luminance source does not support rotation by 45 degrees.")}toString(){const t=new Uint8ClampedArray(this.width);let e=new yt;for(let a=0;a<this.height;a++){const n=this.getRow(a,t);for(let r=0;r<this.width;r++){const s=n[r]&255;let h;s<64?h="#":s<128?h="+":s<192?h=".":h=" ",e.append(h)}e.append(`
`)}return e.toString()}}class Te extends i1{constructor(t){super(t.getWidth(),t.getHeight()),this.delegate=t}getRow(t,e){const a=this.delegate.getRow(t,e),n=this.getWidth();for(let r=0;r<n;r++)a[r]=255-(a[r]&255);return a}getMatrix(){const t=this.delegate.getMatrix(),e=this.getWidth()*this.getHeight(),a=new Uint8ClampedArray(e);for(let n=0;n<e;n++)a[n]=255-(t[n]&255);return a}isCropSupported(){return this.delegate.isCropSupported()}crop(t,e,a,n){return new Te(this.delegate.crop(t,e,a,n))}isRotateSupported(){return this.delegate.isRotateSupported()}invert(){return this.delegate}rotateCounterClockwise(){return new Te(this.delegate.rotateCounterClockwise())}rotateCounterClockwise45(){return new Te(this.delegate.rotateCounterClockwise45())}}class Ne extends i1{constructor(t){super(t.width,t.height),this.canvas=t,this.tempCanvasElement=null,this.buffer=Ne.makeBufferFromCanvasImageData(t)}static makeBufferFromCanvasImageData(t){const e=t.getContext("2d").getImageData(0,0,t.width,t.height);return Ne.toGrayscaleBuffer(e.data,t.width,t.height)}static toGrayscaleBuffer(t,e,a){const n=new Uint8ClampedArray(e*a);for(let r=0,s=0,h=t.length;r<h;r+=4,s++){let o;if(t[r+3]===0)o=255;else{const p=t[r],x=t[r+1],y=t[r+2];o=306*p+601*x+117*y+512>>10}n[s]=o}return n}getRow(t,e){if(t<0||t>=this.getHeight())throw new D("Requested row is outside the image: "+t);const a=this.getWidth(),n=t*a;return e===null?e=this.buffer.slice(n,n+a):(e.length<a&&(e=new Uint8ClampedArray(a)),e.set(this.buffer.slice(n,n+a))),e}getMatrix(){return this.buffer}isCropSupported(){return!0}crop(t,e,a,n){return super.crop(t,e,a,n),this}isRotateSupported(){return!0}rotateCounterClockwise(){return this.rotate(-90),this}rotateCounterClockwise45(){return this.rotate(-45),this}getTempCanvasElement(){if(this.tempCanvasElement===null){const t=this.canvas.ownerDocument.createElement("canvas");t.width=this.canvas.width,t.height=this.canvas.height,this.tempCanvasElement=t}return this.tempCanvasElement}rotate(t){const e=this.getTempCanvasElement(),a=e.getContext("2d"),n=t*Ne.DEGREE_TO_RADIANS,r=this.canvas.width,s=this.canvas.height,h=Math.ceil(Math.abs(Math.cos(n))*r+Math.abs(Math.sin(n))*s),o=Math.ceil(Math.abs(Math.sin(n))*r+Math.abs(Math.cos(n))*s);return e.width=h,e.height=o,a.translate(h/2,o/2),a.rotate(n),a.drawImage(this.canvas,r/-2,s/-2),this.buffer=Ne.makeBufferFromCanvasImageData(e),this}invert(){return new Te(this)}}Ne.DEGREE_TO_RADIANS=Math.PI/180;class l2{constructor(t,e,a){this.deviceId=t,this.label=e,this.kind="videoinput",this.groupId=a||void 0}toJSON(){return{kind:this.kind,groupId:this.groupId,deviceId:this.deviceId,label:this.label}}}var Jt=(globalThis||v1||self||window||void 0)&&(globalThis||v1||self||window||void 0).__awaiter||function(f,t,e,a){function n(r){return r instanceof e?r:new e(function(s){s(r)})}return new(e||(e=Promise))(function(r,s){function h(p){try{c(a.next(p))}catch(x){s(x)}}function o(p){try{c(a.throw(p))}catch(x){s(x)}}function c(p){p.done?r(p.value):n(p.value).then(h,o)}c((a=a.apply(f,t||[])).next())})};class Ve{constructor(t,e=500,a){this.reader=t,this.timeBetweenScansMillis=e,this._hints=a,this._stopContinuousDecode=!1,this._stopAsyncDecode=!1,this._timeBetweenDecodingAttempts=0}get hasNavigator(){return typeof navigator<"u"}get isMediaDevicesSuported(){return this.hasNavigator&&!!navigator.mediaDevices}get canEnumerateDevices(){return!!(this.isMediaDevicesSuported&&navigator.mediaDevices.enumerateDevices)}get timeBetweenDecodingAttempts(){return this._timeBetweenDecodingAttempts}set timeBetweenDecodingAttempts(t){this._timeBetweenDecodingAttempts=t<0?0:t}set hints(t){this._hints=t||null}get hints(){return this._hints}listVideoInputDevices(){return Jt(this,void 0,void 0,function*(){if(!this.hasNavigator)throw new Error("Can't enumerate devices, navigator is not present.");if(!this.canEnumerateDevices)throw new Error("Can't enumerate devices, method not supported.");const t=yield navigator.mediaDevices.enumerateDevices(),e=[];for(const a of t){const n=a.kind==="video"?"videoinput":a.kind;if(n!=="videoinput")continue;const r=a.deviceId||a.id,s=a.label||`Video device ${e.length+1}`,h=a.groupId,o={deviceId:r,label:s,kind:n,groupId:h};e.push(o)}return e})}getVideoInputDevices(){return Jt(this,void 0,void 0,function*(){return(yield this.listVideoInputDevices()).map(e=>new l2(e.deviceId,e.label))})}findDeviceById(t){return Jt(this,void 0,void 0,function*(){const e=yield this.listVideoInputDevices();return e?e.find(a=>a.deviceId===t):null})}decodeFromInputVideoDevice(t,e){return Jt(this,void 0,void 0,function*(){return yield this.decodeOnceFromVideoDevice(t,e)})}decodeOnceFromVideoDevice(t,e){return Jt(this,void 0,void 0,function*(){this.reset();let a;t?a={deviceId:{exact:t}}:a={facingMode:"environment"};const n={video:a};return yield this.decodeOnceFromConstraints(n,e)})}decodeOnceFromConstraints(t,e){return Jt(this,void 0,void 0,function*(){const a=yield navigator.mediaDevices.getUserMedia(t);return yield this.decodeOnceFromStream(a,e)})}decodeOnceFromStream(t,e){return Jt(this,void 0,void 0,function*(){this.reset();const a=yield this.attachStreamToVideo(t,e);return yield this.decodeOnce(a)})}decodeFromInputVideoDeviceContinuously(t,e,a){return Jt(this,void 0,void 0,function*(){return yield this.decodeFromVideoDevice(t,e,a)})}decodeFromVideoDevice(t,e,a){return Jt(this,void 0,void 0,function*(){let n;t?n={deviceId:{exact:t}}:n={facingMode:"environment"};const r={video:n};return yield this.decodeFromConstraints(r,e,a)})}decodeFromConstraints(t,e,a){return Jt(this,void 0,void 0,function*(){const n=yield navigator.mediaDevices.getUserMedia(t);return yield this.decodeFromStream(n,e,a)})}decodeFromStream(t,e,a){return Jt(this,void 0,void 0,function*(){this.reset();const n=yield this.attachStreamToVideo(t,e);return yield this.decodeContinuously(n,a)})}stopAsyncDecode(){this._stopAsyncDecode=!0}stopContinuousDecode(){this._stopContinuousDecode=!0}attachStreamToVideo(t,e){return Jt(this,void 0,void 0,function*(){const a=this.prepareVideoElement(e);return this.addVideoSource(a,t),this.videoElement=a,this.stream=t,yield this.playVideoOnLoadAsync(a),a})}playVideoOnLoadAsync(t){return new Promise((e,a)=>this.playVideoOnLoad(t,()=>e()))}playVideoOnLoad(t,e){this.videoEndedListener=()=>this.stopStreams(),this.videoCanPlayListener=()=>this.tryPlayVideo(t),t.addEventListener("ended",this.videoEndedListener),t.addEventListener("canplay",this.videoCanPlayListener),t.addEventListener("playing",e),this.tryPlayVideo(t)}isVideoPlaying(t){return t.currentTime>0&&!t.paused&&!t.ended&&t.readyState>2}tryPlayVideo(t){return Jt(this,void 0,void 0,function*(){if(this.isVideoPlaying(t)){console.warn("Trying to play video that is already playing.");return}try{yield t.play()}catch{console.warn("It was not possible to play the video.")}})}getMediaElement(t,e){const a=document.getElementById(t);if(!a)throw new _(`element with id '${t}' not found`);if(a.nodeName.toLowerCase()!==e.toLowerCase())throw new _(`element with id '${t}' must be an ${e} element`);return a}decodeFromImage(t,e){if(!t&&!e)throw new _("either imageElement with a src set or an url must be provided");return e&&!t?this.decodeFromImageUrl(e):this.decodeFromImageElement(t)}decodeFromVideo(t,e){if(!t&&!e)throw new _("Either an element with a src set or an URL must be provided");return e&&!t?this.decodeFromVideoUrl(e):this.decodeFromVideoElement(t)}decodeFromVideoContinuously(t,e,a){if(t===void 0&&e===void 0)throw new _("Either an element with a src set or an URL must be provided");return e&&!t?this.decodeFromVideoUrlContinuously(e,a):this.decodeFromVideoElementContinuously(t,a)}decodeFromImageElement(t){if(!t)throw new _("An image element must be provided.");this.reset();const e=this.prepareImageElement(t);this.imageElement=e;let a;return this.isImageLoaded(e)?a=this.decodeOnce(e,!1,!0):a=this._decodeOnLoadImage(e),a}decodeFromVideoElement(t){const e=this._decodeFromVideoElementSetup(t);return this._decodeOnLoadVideo(e)}decodeFromVideoElementContinuously(t,e){const a=this._decodeFromVideoElementSetup(t);return this._decodeOnLoadVideoContinuously(a,e)}_decodeFromVideoElementSetup(t){if(!t)throw new _("A video element must be provided.");this.reset();const e=this.prepareVideoElement(t);return this.videoElement=e,e}decodeFromImageUrl(t){if(!t)throw new _("An URL must be provided.");this.reset();const e=this.prepareImageElement();this.imageElement=e;const a=this._decodeOnLoadImage(e);return e.src=t,a}decodeFromVideoUrl(t){if(!t)throw new _("An URL must be provided.");this.reset();const e=this.prepareVideoElement(),a=this.decodeFromVideoElement(e);return e.src=t,a}decodeFromVideoUrlContinuously(t,e){if(!t)throw new _("An URL must be provided.");this.reset();const a=this.prepareVideoElement(),n=this.decodeFromVideoElementContinuously(a,e);return a.src=t,n}_decodeOnLoadImage(t){return new Promise((e,a)=>{this.imageLoadedListener=()=>this.decodeOnce(t,!1,!0).then(e,a),t.addEventListener("load",this.imageLoadedListener)})}_decodeOnLoadVideo(t){return Jt(this,void 0,void 0,function*(){return yield this.playVideoOnLoadAsync(t),yield this.decodeOnce(t)})}_decodeOnLoadVideoContinuously(t,e){return Jt(this,void 0,void 0,function*(){yield this.playVideoOnLoadAsync(t),this.decodeContinuously(t,e)})}isImageLoaded(t){return!(!t.complete||t.naturalWidth===0)}prepareImageElement(t){let e;return typeof t>"u"&&(e=document.createElement("img"),e.width=200,e.height=200),typeof t=="string"&&(e=this.getMediaElement(t,"img")),t instanceof HTMLImageElement&&(e=t),e}prepareVideoElement(t){let e;return!t&&typeof document<"u"&&(e=document.createElement("video"),e.width=200,e.height=200),typeof t=="string"&&(e=this.getMediaElement(t,"video")),t instanceof HTMLVideoElement&&(e=t),e.setAttribute("autoplay","true"),e.setAttribute("muted","true"),e.setAttribute("playsinline","true"),e}decodeOnce(t,e=!0,a=!0){this._stopAsyncDecode=!1;const n=(r,s)=>{if(this._stopAsyncDecode){s(new L("Video stream has ended before any code could be detected.")),this._stopAsyncDecode=void 0;return}try{const h=this.decode(t);r(h)}catch(h){const o=e&&h instanceof L,p=(h instanceof z||h instanceof k)&&a;if(o||p)return setTimeout(n,this._timeBetweenDecodingAttempts,r,s);s(h)}};return new Promise((r,s)=>n(r,s))}decodeContinuously(t,e){this._stopContinuousDecode=!1;const a=()=>{if(this._stopContinuousDecode){this._stopContinuousDecode=void 0;return}try{const n=this.decode(t);e(n,null),setTimeout(a,this.timeBetweenScansMillis)}catch(n){e(null,n);const r=n instanceof z||n instanceof k,s=n instanceof L;(r||s)&&setTimeout(a,this._timeBetweenDecodingAttempts)}};a()}decode(t){const e=this.createBinaryBitmap(t);return this.decodeBitmap(e)}_isHTMLVideoElement(t){return t.videoWidth!==0}drawFrameOnCanvas(t,e,a){e||(e={sx:0,sy:0,sWidth:t.videoWidth,sHeight:t.videoHeight,dx:0,dy:0,dWidth:t.videoWidth,dHeight:t.videoHeight}),a||(a=this.captureCanvasContext),a.drawImage(t,e.sx,e.sy,e.sWidth,e.sHeight,e.dx,e.dy,e.dWidth,e.dHeight)}drawImageOnCanvas(t,e,a=this.captureCanvasContext){e||(e={sx:0,sy:0,sWidth:t.naturalWidth,sHeight:t.naturalHeight,dx:0,dy:0,dWidth:t.naturalWidth,dHeight:t.naturalHeight}),a||(a=this.captureCanvasContext),a.drawImage(t,e.sx,e.sy,e.sWidth,e.sHeight,e.dx,e.dy,e.dWidth,e.dHeight)}createBinaryBitmap(t){this.getCaptureCanvasContext(t),this._isHTMLVideoElement(t)?this.drawFrameOnCanvas(t):this.drawImageOnCanvas(t);const e=this.getCaptureCanvas(t),a=new Ne(e),n=new nt(a);return new j(n)}getCaptureCanvasContext(t){if(!this.captureCanvasContext){const a=this.getCaptureCanvas(t).getContext("2d");this.captureCanvasContext=a}return this.captureCanvasContext}getCaptureCanvas(t){if(!this.captureCanvas){const e=this.createCaptureCanvas(t);this.captureCanvas=e}return this.captureCanvas}decodeBitmap(t){return this.reader.decode(t,this._hints)}createCaptureCanvas(t){if(typeof document>"u")return this._destroyCaptureCanvas(),null;const e=document.createElement("canvas");let a,n;return typeof t<"u"&&(t instanceof HTMLVideoElement?(a=t.videoWidth,n=t.videoHeight):t instanceof HTMLImageElement&&(a=t.naturalWidth||t.width,n=t.naturalHeight||t.height)),e.style.width=a+"px",e.style.height=n+"px",e.width=a,e.height=n,e}stopStreams(){this.stream&&(this.stream.getVideoTracks().forEach(t=>t.stop()),this.stream=void 0),this._stopAsyncDecode===!1&&this.stopAsyncDecode(),this._stopContinuousDecode===!1&&this.stopContinuousDecode()}reset(){this.stopStreams(),this._destroyVideoElement(),this._destroyImageElement(),this._destroyCaptureCanvas()}_destroyVideoElement(){this.videoElement&&(typeof this.videoEndedListener<"u"&&this.videoElement.removeEventListener("ended",this.videoEndedListener),typeof this.videoPlayingEventListener<"u"&&this.videoElement.removeEventListener("playing",this.videoPlayingEventListener),typeof this.videoCanPlayListener<"u"&&this.videoElement.removeEventListener("loadedmetadata",this.videoCanPlayListener),this.cleanVideoSource(this.videoElement),this.videoElement=void 0)}_destroyImageElement(){this.imageElement&&(this.imageLoadedListener!==void 0&&this.imageElement.removeEventListener("load",this.imageLoadedListener),this.imageElement.src=void 0,this.imageElement.removeAttribute("src"),this.imageElement=void 0)}_destroyCaptureCanvas(){this.captureCanvasContext=void 0,this.captureCanvas=void 0}addVideoSource(t,e){try{t.srcObject=e}catch{t.src=URL.createObjectURL(e)}}cleanVideoSource(t){try{t.srcObject=null}catch{t.src=""}this.videoElement.removeAttribute("src")}}class $t{constructor(t,e,a=e==null?0:8*e.length,n,r,s=q.currentTimeMillis()){this.text=t,this.rawBytes=e,this.numBits=a,this.resultPoints=n,this.format=r,this.timestamp=s,this.text=t,this.rawBytes=e,a==null?this.numBits=e==null?0:8*e.length:this.numBits=a,this.resultPoints=n,this.format=r,this.resultMetadata=null,s==null?this.timestamp=q.currentTimeMillis():this.timestamp=s}getText(){return this.text}getRawBytes(){return this.rawBytes}getNumBits(){return this.numBits}getResultPoints(){return this.resultPoints}getBarcodeFormat(){return this.format}getResultMetadata(){return this.resultMetadata}putMetadata(t,e){this.resultMetadata===null&&(this.resultMetadata=new Map),this.resultMetadata.set(t,e)}putAllMetadata(t){t!==null&&(this.resultMetadata===null?this.resultMetadata=t:this.resultMetadata=new Map(t))}addResultPoints(t){const e=this.resultPoints;if(e===null)this.resultPoints=t;else if(t!==null&&t.length>0){const a=new Array(e.length+t.length);q.arraycopy(e,0,a,0,e.length),q.arraycopy(t,0,a,e.length,t.length),this.resultPoints=a}}getTimestamp(){return this.timestamp}toString(){return this.text}}var V1;(function(f){f[f.AZTEC=0]="AZTEC",f[f.CODABAR=1]="CODABAR",f[f.CODE_39=2]="CODE_39",f[f.CODE_93=3]="CODE_93",f[f.CODE_128=4]="CODE_128",f[f.DATA_MATRIX=5]="DATA_MATRIX",f[f.EAN_8=6]="EAN_8",f[f.EAN_13=7]="EAN_13",f[f.ITF=8]="ITF",f[f.MAXICODE=9]="MAXICODE",f[f.PDF_417=10]="PDF_417",f[f.QR_CODE=11]="QR_CODE",f[f.RSS_14=12]="RSS_14",f[f.RSS_EXPANDED=13]="RSS_EXPANDED",f[f.UPC_A=14]="UPC_A",f[f.UPC_E=15]="UPC_E",f[f.UPC_EAN_EXTENSION=16]="UPC_EAN_EXTENSION"})(V1||(V1={}));var Q=V1,k1;(function(f){f[f.OTHER=0]="OTHER",f[f.ORIENTATION=1]="ORIENTATION",f[f.BYTE_SEGMENTS=2]="BYTE_SEGMENTS",f[f.ERROR_CORRECTION_LEVEL=3]="ERROR_CORRECTION_LEVEL",f[f.ISSUE_NUMBER=4]="ISSUE_NUMBER",f[f.SUGGESTED_PRICE=5]="SUGGESTED_PRICE",f[f.POSSIBLE_COUNTRY=6]="POSSIBLE_COUNTRY",f[f.UPC_EAN_EXTENSION=7]="UPC_EAN_EXTENSION",f[f.PDF417_EXTRA_METADATA=8]="PDF417_EXTRA_METADATA",f[f.STRUCTURED_APPEND_SEQUENCE=9]="STRUCTURED_APPEND_SEQUENCE",f[f.STRUCTURED_APPEND_PARITY=10]="STRUCTURED_APPEND_PARITY"})(k1||(k1={}));var Gt=k1;class s1{constructor(t,e,a,n,r=-1,s=-1){this.rawBytes=t,this.text=e,this.byteSegments=a,this.ecLevel=n,this.structuredAppendSequenceNumber=r,this.structuredAppendParity=s,this.numBits=t==null?0:8*t.length}getRawBytes(){return this.rawBytes}getNumBits(){return this.numBits}setNumBits(t){this.numBits=t}getText(){return this.text}getByteSegments(){return this.byteSegments}getECLevel(){return this.ecLevel}getErrorsCorrected(){return this.errorsCorrected}setErrorsCorrected(t){this.errorsCorrected=t}getErasures(){return this.erasures}setErasures(t){this.erasures=t}getOther(){return this.other}setOther(t){this.other=t}hasStructuredAppend(){return this.structuredAppendParity>=0&&this.structuredAppendSequenceNumber>=0}getStructuredAppendParity(){return this.structuredAppendParity}getStructuredAppendSequenceNumber(){return this.structuredAppendSequenceNumber}}class h1{exp(t){return this.expTable[t]}log(t){if(t===0)throw new D;return this.logTable[t]}static addOrSubtract(t,e){return t^e}}class ne{constructor(t,e){if(e.length===0)throw new D;this.field=t;const a=e.length;if(a>1&&e[0]===0){let n=1;for(;n<a&&e[n]===0;)n++;n===a?this.coefficients=Int32Array.from([0]):(this.coefficients=new Int32Array(a-n),q.arraycopy(e,n,this.coefficients,0,this.coefficients.length))}else this.coefficients=e}getCoefficients(){return this.coefficients}getDegree(){return this.coefficients.length-1}isZero(){return this.coefficients[0]===0}getCoefficient(t){return this.coefficients[this.coefficients.length-1-t]}evaluateAt(t){if(t===0)return this.getCoefficient(0);const e=this.coefficients;let a;if(t===1){a=0;for(let s=0,h=e.length;s!==h;s++){const o=e[s];a=h1.addOrSubtract(a,o)}return a}a=e[0];const n=e.length,r=this.field;for(let s=1;s<n;s++)a=h1.addOrSubtract(r.multiply(t,a),e[s]);return a}addOrSubtract(t){if(!this.field.equals(t.field))throw new D("GenericGFPolys do not have same GenericGF field");if(this.isZero())return t;if(t.isZero())return this;let e=this.coefficients,a=t.coefficients;if(e.length>a.length){const s=e;e=a,a=s}let n=new Int32Array(a.length);const r=a.length-e.length;q.arraycopy(a,0,n,0,r);for(let s=r;s<a.length;s++)n[s]=h1.addOrSubtract(e[s-r],a[s]);return new ne(this.field,n)}multiply(t){if(!this.field.equals(t.field))throw new D("GenericGFPolys do not have same GenericGF field");if(this.isZero()||t.isZero())return this.field.getZero();const e=this.coefficients,a=e.length,n=t.coefficients,r=n.length,s=new Int32Array(a+r-1),h=this.field;for(let o=0;o<a;o++){const c=e[o];for(let p=0;p<r;p++)s[o+p]=h1.addOrSubtract(s[o+p],h.multiply(c,n[p]))}return new ne(h,s)}multiplyScalar(t){if(t===0)return this.field.getZero();if(t===1)return this;const e=this.coefficients.length,a=this.field,n=new Int32Array(e),r=this.coefficients;for(let s=0;s<e;s++)n[s]=a.multiply(r[s],t);return new ne(a,n)}multiplyByMonomial(t,e){if(t<0)throw new D;if(e===0)return this.field.getZero();const a=this.coefficients,n=a.length,r=new Int32Array(n+t),s=this.field;for(let h=0;h<n;h++)r[h]=s.multiply(a[h],e);return new ne(s,r)}divide(t){if(!this.field.equals(t.field))throw new D("GenericGFPolys do not have same GenericGF field");if(t.isZero())throw new D("Divide by 0");const e=this.field;let a=e.getZero(),n=this;const r=t.getCoefficient(t.getDegree()),s=e.inverse(r);for(;n.getDegree()>=t.getDegree()&&!n.isZero();){const h=n.getDegree()-t.getDegree(),o=e.multiply(n.getCoefficient(n.getDegree()),s),c=t.multiplyByMonomial(h,o),p=e.buildMonomial(h,o);a=a.addOrSubtract(p),n=n.addOrSubtract(c)}return[a,n]}toString(){let t="";for(let e=this.getDegree();e>=0;e--){let a=this.getCoefficient(e);if(a!==0){if(a<0?(t+=" - ",a=-a):t.length>0&&(t+=" + "),e===0||a!==1){const n=this.field.log(a);n===0?t+="1":n===1?t+="a":(t+="a^",t+=n)}e!==0&&(e===1?t+="x":(t+="x^",t+=e))}}return t}}class m1 extends w{}m1.kind="ArithmeticException";class gt extends h1{constructor(t,e,a){super(),this.primitive=t,this.size=e,this.generatorBase=a;const n=new Int32Array(e);let r=1;for(let h=0;h<e;h++)n[h]=r,r*=2,r>=e&&(r^=t,r&=e-1);this.expTable=n;const s=new Int32Array(e);for(let h=0;h<e-1;h++)s[n[h]]=h;this.logTable=s,this.zero=new ne(this,Int32Array.from([0])),this.one=new ne(this,Int32Array.from([1]))}getZero(){return this.zero}getOne(){return this.one}buildMonomial(t,e){if(t<0)throw new D;if(e===0)return this.zero;const a=new Int32Array(t+1);return a[0]=e,new ne(this,a)}inverse(t){if(t===0)throw new m1;return this.expTable[this.size-this.logTable[t]-1]}multiply(t,e){return t===0||e===0?0:this.expTable[(this.logTable[t]+this.logTable[e])%(this.size-1)]}getSize(){return this.size}getGeneratorBase(){return this.generatorBase}toString(){return"GF(0x"+Y.toHexString(this.primitive)+","+this.size+")"}equals(t){return t===this}}gt.AZTEC_DATA_12=new gt(4201,4096,1),gt.AZTEC_DATA_10=new gt(1033,1024,1),gt.AZTEC_DATA_6=new gt(67,64,1),gt.AZTEC_PARAM=new gt(19,16,1),gt.QR_CODE_FIELD_256=new gt(285,256,0),gt.DATA_MATRIX_FIELD_256=new gt(301,256,1),gt.AZTEC_DATA_8=gt.DATA_MATRIX_FIELD_256,gt.MAXICODE_FIELD_64=gt.AZTEC_DATA_6;class qe extends w{}qe.kind="ReedSolomonException";class ye extends w{}ye.kind="IllegalStateException";class o1{constructor(t){this.field=t}decode(t,e){const a=this.field,n=new ne(a,t),r=new Int32Array(e);let s=!0;for(let A=0;A<e;A++){const E=n.evaluateAt(a.exp(A+a.getGeneratorBase()));r[r.length-1-A]=E,E!==0&&(s=!1)}if(s)return;const h=new ne(a,r),o=this.runEuclideanAlgorithm(a.buildMonomial(e,1),h,e),c=o[0],p=o[1],x=this.findErrorLocations(c),y=this.findErrorMagnitudes(p,x);for(let A=0;A<x.length;A++){const E=t.length-1-a.log(x[A]);if(E<0)throw new qe("Bad error location");t[E]=gt.addOrSubtract(t[E],y[A])}}runEuclideanAlgorithm(t,e,a){if(t.getDegree()<e.getDegree()){const A=t;t=e,e=A}const n=this.field;let r=t,s=e,h=n.getZero(),o=n.getOne();for(;s.getDegree()>=(a/2|0);){let A=r,E=h;if(r=s,h=o,r.isZero())throw new qe("r_{i-1} was zero");s=A;let I=n.getZero();const S=r.getCoefficient(r.getDegree()),O=n.inverse(S);for(;s.getDegree()>=r.getDegree()&&!s.isZero();){const H=s.getDegree()-r.getDegree(),F=n.multiply(s.getCoefficient(s.getDegree()),O);I=I.addOrSubtract(n.buildMonomial(H,F)),s=s.addOrSubtract(r.multiplyByMonomial(H,F))}if(o=I.multiply(h).addOrSubtract(E),s.getDegree()>=r.getDegree())throw new ye("Division algorithm failed to reduce polynomial?")}const c=o.getCoefficient(0);if(c===0)throw new qe("sigmaTilde(0) was zero");const p=n.inverse(c),x=o.multiplyScalar(p),y=s.multiplyScalar(p);return[x,y]}findErrorLocations(t){const e=t.getDegree();if(e===1)return Int32Array.from([t.getCoefficient(1)]);const a=new Int32Array(e);let n=0;const r=this.field;for(let s=1;s<r.getSize()&&n<e;s++)t.evaluateAt(s)===0&&(a[n]=r.inverse(s),n++);if(n!==e)throw new qe("Error locator degree does not match number of roots");return a}findErrorMagnitudes(t,e){const a=e.length,n=new Int32Array(a),r=this.field;for(let s=0;s<a;s++){const h=r.inverse(e[s]);let o=1;for(let c=0;c<a;c++)if(s!==c){const p=r.multiply(e[c],h),x=p&1?p&-2:p|1;o=r.multiply(o,x)}n[s]=r.multiply(t.evaluateAt(h),r.inverse(o)),r.getGeneratorBase()!==0&&(n[s]=r.multiply(n[s],h))}return n}}var Xt;(function(f){f[f.UPPER=0]="UPPER",f[f.LOWER=1]="LOWER",f[f.MIXED=2]="MIXED",f[f.DIGIT=3]="DIGIT",f[f.PUNCT=4]="PUNCT",f[f.BINARY=5]="BINARY"})(Xt||(Xt={}));class Et{decode(t){this.ddata=t;let e=t.getBits(),a=this.extractBits(e),n=this.correctBits(a),r=Et.convertBoolArrayToByteArray(n),s=Et.getEncodedData(n),h=new s1(r,s,null,null);return h.setNumBits(n.length),h}static highLevelDecode(t){return this.getEncodedData(t)}static getEncodedData(t){let e=t.length,a=Xt.UPPER,n=Xt.UPPER,r="",s=0;for(;s<e;)if(n===Xt.BINARY){if(e-s<5)break;let h=Et.readCode(t,s,5);if(s+=5,h===0){if(e-s<11)break;h=Et.readCode(t,s,11)+31,s+=11}for(let o=0;o<h;o++){if(e-s<8){s=e;break}const c=Et.readCode(t,s,8);r+=tt.castAsNonUtf8Char(c),s+=8}n=a}else{let h=n===Xt.DIGIT?4:5;if(e-s<h)break;let o=Et.readCode(t,s,h);s+=h;let c=Et.getCharacter(n,o);c.startsWith("CTRL_")?(a=n,n=Et.getTable(c.charAt(5)),c.charAt(6)==="L"&&(a=n)):(r+=c,n=a)}return r}static getTable(t){switch(t){case"L":return Xt.LOWER;case"P":return Xt.PUNCT;case"M":return Xt.MIXED;case"D":return Xt.DIGIT;case"B":return Xt.BINARY;case"U":default:return Xt.UPPER}}static getCharacter(t,e){switch(t){case Xt.UPPER:return Et.UPPER_TABLE[e];case Xt.LOWER:return Et.LOWER_TABLE[e];case Xt.MIXED:return Et.MIXED_TABLE[e];case Xt.PUNCT:return Et.PUNCT_TABLE[e];case Xt.DIGIT:return Et.DIGIT_TABLE[e];default:throw new ye("Bad table")}}correctBits(t){let e,a;this.ddata.getNbLayers()<=2?(a=6,e=gt.AZTEC_DATA_6):this.ddata.getNbLayers()<=8?(a=8,e=gt.AZTEC_DATA_8):this.ddata.getNbLayers()<=22?(a=10,e=gt.AZTEC_DATA_10):(a=12,e=gt.AZTEC_DATA_12);let n=this.ddata.getNbDatablocks(),r=t.length/a;if(r<n)throw new k;let s=t.length%a,h=new Int32Array(r);for(let y=0;y<r;y++,s+=a)h[y]=Et.readCode(t,s,a);try{new o1(e).decode(h,r-n)}catch(y){throw new k(y)}let o=(1<<a)-1,c=0;for(let y=0;y<n;y++){let A=h[y];if(A===0||A===o)throw new k;(A===1||A===o-1)&&c++}let p=new Array(n*a-c),x=0;for(let y=0;y<n;y++){let A=h[y];if(A===1||A===o-1)p.fill(A>1,x,x+a-1),x+=a-1;else for(let E=a-1;E>=0;--E)p[x++]=(A&1<<E)!==0}return p}extractBits(t){let e=this.ddata.isCompact(),a=this.ddata.getNbLayers(),n=(e?11:14)+a*4,r=new Int32Array(n),s=new Array(this.totalBitsInLayer(a,e));if(e)for(let h=0;h<r.length;h++)r[h]=h;else{let h=n+1+2*Y.truncDivision(Y.truncDivision(n,2)-1,15),o=n/2,c=Y.truncDivision(h,2);for(let p=0;p<o;p++){let x=p+Y.truncDivision(p,15);r[o-p-1]=c-x-1,r[o+p]=c+x+1}}for(let h=0,o=0;h<a;h++){let c=(a-h)*4+(e?9:12),p=h*2,x=n-1-p;for(let y=0;y<c;y++){let A=y*2;for(let E=0;E<2;E++)s[o+A+E]=t.get(r[p+E],r[p+y]),s[o+2*c+A+E]=t.get(r[p+y],r[x-E]),s[o+4*c+A+E]=t.get(r[x-E],r[x-y]),s[o+6*c+A+E]=t.get(r[x-y],r[p+E])}o+=c*8}return s}static readCode(t,e,a){let n=0;for(let r=e;r<e+a;r++)n<<=1,t[r]&&(n|=1);return n}static readByte(t,e){let a=t.length-e;return a>=8?Et.readCode(t,e,8):Et.readCode(t,e,a)<<8-a}static convertBoolArrayToByteArray(t){let e=new Uint8Array((t.length+7)/8);for(let a=0;a<e.length;a++)e[a]=Et.readByte(t,8*a);return e}totalBitsInLayer(t,e){return((e?88:112)+16*t)*t}}Et.UPPER_TABLE=["CTRL_PS"," ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","CTRL_LL","CTRL_ML","CTRL_DL","CTRL_BS"],Et.LOWER_TABLE=["CTRL_PS"," ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","CTRL_US","CTRL_ML","CTRL_DL","CTRL_BS"],Et.MIXED_TABLE=["CTRL_PS"," ","\\1","\\2","\\3","\\4","\\5","\\6","\\7","\b","	",`
`,"\\13","\f","\r","\\33","\\34","\\35","\\36","\\37","@","\\","^","_","`","|","~","\\177","CTRL_LL","CTRL_UL","CTRL_PL","CTRL_BS"],Et.PUNCT_TABLE=["","\r",`\r
`,". ",", ",": ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","[","]","{","}","CTRL_UL"],Et.DIGIT_TABLE=["CTRL_PS"," ","0","1","2","3","4","5","6","7","8","9",",",".","CTRL_UL","CTRL_US"];class dt{constructor(){}static round(t){return t===NaN?0:t<=Number.MIN_SAFE_INTEGER?Number.MIN_SAFE_INTEGER:t>=Number.MAX_SAFE_INTEGER?Number.MAX_SAFE_INTEGER:t+(t<0?-.5:.5)|0}static distance(t,e,a,n){const r=t-a,s=e-n;return Math.sqrt(r*r+s*s)}static sum(t){let e=0;for(let a=0,n=t.length;a!==n;a++){const r=t[a];e+=r}return e}}class w1{static floatToIntBits(t){return t}}w1.MAX_VALUE=Number.MAX_SAFE_INTEGER;class W{constructor(t,e){this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}equals(t){if(t instanceof W){const e=t;return this.x===e.x&&this.y===e.y}return!1}hashCode(){return 31*w1.floatToIntBits(this.x)+w1.floatToIntBits(this.y)}toString(){return"("+this.x+","+this.y+")"}static orderBestPatterns(t){const e=this.distance(t[0],t[1]),a=this.distance(t[1],t[2]),n=this.distance(t[0],t[2]);let r,s,h;if(a>=e&&a>=n?(s=t[0],r=t[1],h=t[2]):n>=a&&n>=e?(s=t[1],r=t[0],h=t[2]):(s=t[2],r=t[0],h=t[1]),this.crossProductZ(r,s,h)<0){const o=r;r=h,h=o}t[0]=r,t[1]=s,t[2]=h}static distance(t,e){return dt.distance(t.x,t.y,e.x,e.y)}static crossProductZ(t,e,a){const n=e.x,r=e.y;return(a.x-n)*(t.y-r)-(a.y-r)*(t.x-n)}}class A1{constructor(t,e){this.bits=t,this.points=e}getBits(){return this.bits}getPoints(){return this.points}}class p2 extends A1{constructor(t,e,a,n,r){super(t,e),this.compact=a,this.nbDatablocks=n,this.nbLayers=r}getNbLayers(){return this.nbLayers}getNbDatablocks(){return this.nbDatablocks}isCompact(){return this.compact}}class be{constructor(t,e,a,n){this.image=t,this.height=t.getHeight(),this.width=t.getWidth(),e==null&&(e=be.INIT_SIZE),a==null&&(a=t.getWidth()/2|0),n==null&&(n=t.getHeight()/2|0);const r=e/2|0;if(this.leftInit=a-r,this.rightInit=a+r,this.upInit=n-r,this.downInit=n+r,this.upInit<0||this.leftInit<0||this.downInit>=this.height||this.rightInit>=this.width)throw new L}detect(){let t=this.leftInit,e=this.rightInit,a=this.upInit,n=this.downInit,r=!1,s=!0,h=!1,o=!1,c=!1,p=!1,x=!1;const y=this.width,A=this.height;for(;s;){s=!1;let E=!0;for(;(E||!o)&&e<y;)E=this.containsBlackPoint(a,n,e,!1),E?(e++,s=!0,o=!0):o||e++;if(e>=y){r=!0;break}let I=!0;for(;(I||!c)&&n<A;)I=this.containsBlackPoint(t,e,n,!0),I?(n++,s=!0,c=!0):c||n++;if(n>=A){r=!0;break}let S=!0;for(;(S||!p)&&t>=0;)S=this.containsBlackPoint(a,n,t,!1),S?(t--,s=!0,p=!0):p||t--;if(t<0){r=!0;break}let O=!0;for(;(O||!x)&&a>=0;)O=this.containsBlackPoint(t,e,a,!0),O?(a--,s=!0,x=!0):x||a--;if(a<0){r=!0;break}s&&(h=!0)}if(!r&&h){const E=e-t;let I=null;for(let F=1;I===null&&F<E;F++)I=this.getBlackPointOnSegment(t,n-F,t+F,n);if(I==null)throw new L;let S=null;for(let F=1;S===null&&F<E;F++)S=this.getBlackPointOnSegment(t,a+F,t+F,a);if(S==null)throw new L;let O=null;for(let F=1;O===null&&F<E;F++)O=this.getBlackPointOnSegment(e,a+F,e-F,a);if(O==null)throw new L;let H=null;for(let F=1;H===null&&F<E;F++)H=this.getBlackPointOnSegment(e,n-F,e-F,n);if(H==null)throw new L;return this.centerEdges(H,I,O,S)}else throw new L}getBlackPointOnSegment(t,e,a,n){const r=dt.round(dt.distance(t,e,a,n)),s=(a-t)/r,h=(n-e)/r,o=this.image;for(let c=0;c<r;c++){const p=dt.round(t+c*s),x=dt.round(e+c*h);if(o.get(p,x))return new W(p,x)}return null}centerEdges(t,e,a,n){const r=t.getX(),s=t.getY(),h=e.getX(),o=e.getY(),c=a.getX(),p=a.getY(),x=n.getX(),y=n.getY(),A=be.CORR;return r<this.width/2?[new W(x-A,y+A),new W(h+A,o+A),new W(c-A,p-A),new W(r+A,s-A)]:[new W(x+A,y+A),new W(h+A,o-A),new W(c-A,p+A),new W(r-A,s-A)]}containsBlackPoint(t,e,a,n){const r=this.image;if(n){for(let s=t;s<=e;s++)if(r.get(s,a))return!0}else for(let s=t;s<=e;s++)if(r.get(a,s))return!0;return!1}}be.INIT_SIZE=10,be.CORR=1;class U1{static checkAndNudgePoints(t,e){const a=t.getWidth(),n=t.getHeight();let r=!0;for(let s=0;s<e.length&&r;s+=2){const h=Math.floor(e[s]),o=Math.floor(e[s+1]);if(h<-1||h>a||o<-1||o>n)throw new L;r=!1,h===-1?(e[s]=0,r=!0):h===a&&(e[s]=a-1,r=!0),o===-1?(e[s+1]=0,r=!0):o===n&&(e[s+1]=n-1,r=!0)}r=!0;for(let s=e.length-2;s>=0&&r;s-=2){const h=Math.floor(e[s]),o=Math.floor(e[s+1]);if(h<-1||h>a||o<-1||o>n)throw new L;r=!1,h===-1?(e[s]=0,r=!0):h===a&&(e[s]=a-1,r=!0),o===-1?(e[s+1]=0,r=!0):o===n&&(e[s+1]=n-1,r=!0)}}}class xe{constructor(t,e,a,n,r,s,h,o,c){this.a11=t,this.a21=e,this.a31=a,this.a12=n,this.a22=r,this.a32=s,this.a13=h,this.a23=o,this.a33=c}static quadrilateralToQuadrilateral(t,e,a,n,r,s,h,o,c,p,x,y,A,E,I,S){const O=xe.quadrilateralToSquare(t,e,a,n,r,s,h,o);return xe.squareToQuadrilateral(c,p,x,y,A,E,I,S).times(O)}transformPoints(t){const e=t.length,a=this.a11,n=this.a12,r=this.a13,s=this.a21,h=this.a22,o=this.a23,c=this.a31,p=this.a32,x=this.a33;for(let y=0;y<e;y+=2){const A=t[y],E=t[y+1],I=r*A+o*E+x;t[y]=(a*A+s*E+c)/I,t[y+1]=(n*A+h*E+p)/I}}transformPointsWithValues(t,e){const a=this.a11,n=this.a12,r=this.a13,s=this.a21,h=this.a22,o=this.a23,c=this.a31,p=this.a32,x=this.a33,y=t.length;for(let A=0;A<y;A++){const E=t[A],I=e[A],S=r*E+o*I+x;t[A]=(a*E+s*I+c)/S,e[A]=(n*E+h*I+p)/S}}static squareToQuadrilateral(t,e,a,n,r,s,h,o){const c=t-a+r-h,p=e-n+s-o;if(c===0&&p===0)return new xe(a-t,r-a,t,n-e,s-n,e,0,0,1);{const x=a-r,y=h-r,A=n-s,E=o-s,I=x*E-y*A,S=(c*E-y*p)/I,O=(x*p-c*A)/I;return new xe(a-t+S*a,h-t+O*h,t,n-e+S*n,o-e+O*o,e,S,O,1)}}static quadrilateralToSquare(t,e,a,n,r,s,h,o){return xe.squareToQuadrilateral(t,e,a,n,r,s,h,o).buildAdjoint()}buildAdjoint(){return new xe(this.a22*this.a33-this.a23*this.a32,this.a23*this.a31-this.a21*this.a33,this.a21*this.a32-this.a22*this.a31,this.a13*this.a32-this.a12*this.a33,this.a11*this.a33-this.a13*this.a31,this.a12*this.a31-this.a11*this.a32,this.a12*this.a23-this.a13*this.a22,this.a13*this.a21-this.a11*this.a23,this.a11*this.a22-this.a12*this.a21)}times(t){return new xe(this.a11*t.a11+this.a21*t.a12+this.a31*t.a13,this.a11*t.a21+this.a21*t.a22+this.a31*t.a23,this.a11*t.a31+this.a21*t.a32+this.a31*t.a33,this.a12*t.a11+this.a22*t.a12+this.a32*t.a13,this.a12*t.a21+this.a22*t.a22+this.a32*t.a23,this.a12*t.a31+this.a22*t.a32+this.a32*t.a33,this.a13*t.a11+this.a23*t.a12+this.a33*t.a13,this.a13*t.a21+this.a23*t.a22+this.a33*t.a23,this.a13*t.a31+this.a23*t.a32+this.a33*t.a33)}}class u2 extends U1{sampleGrid(t,e,a,n,r,s,h,o,c,p,x,y,A,E,I,S,O,H,F){const P=xe.quadrilateralToQuadrilateral(n,r,s,h,o,c,p,x,y,A,E,I,S,O,H,F);return this.sampleGridWithTransform(t,e,a,P)}sampleGridWithTransform(t,e,a,n){if(e<=0||a<=0)throw new L;const r=new Ut(e,a),s=new Float32Array(2*e);for(let h=0;h<a;h++){const o=s.length,c=h+.5;for(let p=0;p<o;p+=2)s[p]=p/2+.5,s[p+1]=c;n.transformPoints(s),U1.checkAndNudgePoints(t,s);try{for(let p=0;p<o;p+=2)t.get(Math.floor(s[p]),Math.floor(s[p+1]))&&r.set(p/2,h)}catch{throw new L}}return r}}class Re{static setGridSampler(t){Re.gridSampler=t}static getInstance(){return Re.gridSampler}}Re.gridSampler=new u2;class te{constructor(t,e){this.x=t,this.y=e}toResultPoint(){return new W(this.getX(),this.getY())}getX(){return this.x}getY(){return this.y}}class g2{constructor(t){this.EXPECTED_CORNER_BITS=new Int32Array([3808,476,2107,1799]),this.image=t}detect(){return this.detectMirror(!1)}detectMirror(t){let e=this.getMatrixCenter(),a=this.getBullsEyeCorners(e);if(t){let s=a[0];a[0]=a[2],a[2]=s}this.extractParameters(a);let n=this.sampleGrid(this.image,a[this.shift%4],a[(this.shift+1)%4],a[(this.shift+2)%4],a[(this.shift+3)%4]),r=this.getMatrixCornerPoints(a);return new p2(n,r,this.compact,this.nbDataBlocks,this.nbLayers)}extractParameters(t){if(!this.isValidPoint(t[0])||!this.isValidPoint(t[1])||!this.isValidPoint(t[2])||!this.isValidPoint(t[3]))throw new L;let e=2*this.nbCenterLayers,a=new Int32Array([this.sampleLine(t[0],t[1],e),this.sampleLine(t[1],t[2],e),this.sampleLine(t[2],t[3],e),this.sampleLine(t[3],t[0],e)]);this.shift=this.getRotation(a,e);let n=0;for(let s=0;s<4;s++){let h=a[(this.shift+s)%4];this.compact?(n<<=7,n+=h>>1&127):(n<<=10,n+=(h>>2&992)+(h>>1&31))}let r=this.getCorrectedParameterData(n,this.compact);this.compact?(this.nbLayers=(r>>6)+1,this.nbDataBlocks=(r&63)+1):(this.nbLayers=(r>>11)+1,this.nbDataBlocks=(r&2047)+1)}getRotation(t,e){let a=0;t.forEach((n,r,s)=>{let h=(n>>e-2<<1)+(n&1);a=(a<<3)+h}),a=((a&1)<<11)+(a>>1);for(let n=0;n<4;n++)if(Y.bitCount(a^this.EXPECTED_CORNER_BITS[n])<=2)return n;throw new L}getCorrectedParameterData(t,e){let a,n;e?(a=7,n=2):(a=10,n=4);let r=a-n,s=new Int32Array(a);for(let o=a-1;o>=0;--o)s[o]=t&15,t>>=4;try{new o1(gt.AZTEC_PARAM).decode(s,r)}catch{throw new L}let h=0;for(let o=0;o<n;o++)h=(h<<4)+s[o];return h}getBullsEyeCorners(t){let e=t,a=t,n=t,r=t,s=!0;for(this.nbCenterLayers=1;this.nbCenterLayers<9;this.nbCenterLayers++){let x=this.getFirstDifferent(e,s,1,-1),y=this.getFirstDifferent(a,s,1,1),A=this.getFirstDifferent(n,s,-1,1),E=this.getFirstDifferent(r,s,-1,-1);if(this.nbCenterLayers>2){let I=this.distancePoint(E,x)*this.nbCenterLayers/(this.distancePoint(r,e)*(this.nbCenterLayers+2));if(I<.75||I>1.25||!this.isWhiteOrBlackRectangle(x,y,A,E))break}e=x,a=y,n=A,r=E,s=!s}if(this.nbCenterLayers!==5&&this.nbCenterLayers!==7)throw new L;this.compact=this.nbCenterLayers===5;let h=new W(e.getX()+.5,e.getY()-.5),o=new W(a.getX()+.5,a.getY()+.5),c=new W(n.getX()-.5,n.getY()+.5),p=new W(r.getX()-.5,r.getY()-.5);return this.expandSquare([h,o,c,p],2*this.nbCenterLayers-3,2*this.nbCenterLayers)}getMatrixCenter(){let t,e,a,n;try{let h=new be(this.image).detect();t=h[0],e=h[1],a=h[2],n=h[3]}catch{let o=this.image.getWidth()/2,c=this.image.getHeight()/2;t=this.getFirstDifferent(new te(o+7,c-7),!1,1,-1).toResultPoint(),e=this.getFirstDifferent(new te(o+7,c+7),!1,1,1).toResultPoint(),a=this.getFirstDifferent(new te(o-7,c+7),!1,-1,1).toResultPoint(),n=this.getFirstDifferent(new te(o-7,c-7),!1,-1,-1).toResultPoint()}let r=dt.round((t.getX()+n.getX()+e.getX()+a.getX())/4),s=dt.round((t.getY()+n.getY()+e.getY()+a.getY())/4);try{let h=new be(this.image,15,r,s).detect();t=h[0],e=h[1],a=h[2],n=h[3]}catch{t=this.getFirstDifferent(new te(r+7,s-7),!1,1,-1).toResultPoint(),e=this.getFirstDifferent(new te(r+7,s+7),!1,1,1).toResultPoint(),a=this.getFirstDifferent(new te(r-7,s+7),!1,-1,1).toResultPoint(),n=this.getFirstDifferent(new te(r-7,s-7),!1,-1,-1).toResultPoint()}return r=dt.round((t.getX()+n.getX()+e.getX()+a.getX())/4),s=dt.round((t.getY()+n.getY()+e.getY()+a.getY())/4),new te(r,s)}getMatrixCornerPoints(t){return this.expandSquare(t,2*this.nbCenterLayers,this.getDimension())}sampleGrid(t,e,a,n,r){let s=Re.getInstance(),h=this.getDimension(),o=h/2-this.nbCenterLayers,c=h/2+this.nbCenterLayers;return s.sampleGrid(t,h,h,o,o,c,o,c,c,o,c,e.getX(),e.getY(),a.getX(),a.getY(),n.getX(),n.getY(),r.getX(),r.getY())}sampleLine(t,e,a){let n=0,r=this.distanceResultPoint(t,e),s=r/a,h=t.getX(),o=t.getY(),c=s*(e.getX()-t.getX())/r,p=s*(e.getY()-t.getY())/r;for(let x=0;x<a;x++)this.image.get(dt.round(h+x*c),dt.round(o+x*p))&&(n|=1<<a-x-1);return n}isWhiteOrBlackRectangle(t,e,a,n){let r=3;t=new te(t.getX()-r,t.getY()+r),e=new te(e.getX()-r,e.getY()-r),a=new te(a.getX()+r,a.getY()-r),n=new te(n.getX()+r,n.getY()+r);let s=this.getColor(n,t);if(s===0)return!1;let h=this.getColor(t,e);return h!==s||(h=this.getColor(e,a),h!==s)?!1:(h=this.getColor(a,n),h===s)}getColor(t,e){let a=this.distancePoint(t,e),n=(e.getX()-t.getX())/a,r=(e.getY()-t.getY())/a,s=0,h=t.getX(),o=t.getY(),c=this.image.get(t.getX(),t.getY()),p=Math.ceil(a);for(let y=0;y<p;y++)h+=n,o+=r,this.image.get(dt.round(h),dt.round(o))!==c&&s++;let x=s/a;return x>.1&&x<.9?0:x<=.1===c?1:-1}getFirstDifferent(t,e,a,n){let r=t.getX()+a,s=t.getY()+n;for(;this.isValid(r,s)&&this.image.get(r,s)===e;)r+=a,s+=n;for(r-=a,s-=n;this.isValid(r,s)&&this.image.get(r,s)===e;)r+=a;for(r-=a;this.isValid(r,s)&&this.image.get(r,s)===e;)s+=n;return s-=n,new te(r,s)}expandSquare(t,e,a){let n=a/(2*e),r=t[0].getX()-t[2].getX(),s=t[0].getY()-t[2].getY(),h=(t[0].getX()+t[2].getX())/2,o=(t[0].getY()+t[2].getY())/2,c=new W(h+n*r,o+n*s),p=new W(h-n*r,o-n*s);r=t[1].getX()-t[3].getX(),s=t[1].getY()-t[3].getY(),h=(t[1].getX()+t[3].getX())/2,o=(t[1].getY()+t[3].getY())/2;let x=new W(h+n*r,o+n*s),y=new W(h-n*r,o-n*s);return[c,x,p,y]}isValid(t,e){return t>=0&&t<this.image.getWidth()&&e>0&&e<this.image.getHeight()}isValidPoint(t){let e=dt.round(t.getX()),a=dt.round(t.getY());return this.isValid(e,a)}distancePoint(t,e){return dt.distance(t.getX(),t.getY(),e.getX(),e.getY())}distanceResultPoint(t,e){return dt.distance(t.getX(),t.getY(),e.getX(),e.getY())}getDimension(){return this.compact?4*this.nbLayers+11:this.nbLayers<=4?4*this.nbLayers+15:4*this.nbLayers+2*(Y.truncDivision(this.nbLayers-4,8)+1)+15}}class C1{decode(t,e=null){let a=null,n=new g2(t.getBlackMatrix()),r=null,s=null;try{let p=n.detectMirror(!1);r=p.getPoints(),this.reportFoundResultPoints(e,r),s=new Et().decode(p)}catch(p){a=p}if(s==null)try{let p=n.detectMirror(!0);r=p.getPoints(),this.reportFoundResultPoints(e,r),s=new Et().decode(p)}catch(p){throw a??p}let h=new $t(s.getText(),s.getRawBytes(),s.getNumBits(),r,Q.AZTEC,q.currentTimeMillis()),o=s.getByteSegments();o!=null&&h.putMetadata(Gt.BYTE_SEGMENTS,o);let c=s.getECLevel();return c!=null&&h.putMetadata(Gt.ERROR_CORRECTION_LEVEL,c),h}reportFoundResultPoints(t,e){if(t!=null){let a=t.get(ut.NEED_RESULT_POINT_CALLBACK);a!=null&&e.forEach((n,r,s)=>{a.foundPossibleResultPoint(n)})}}reset(){}}class nr extends Ve{constructor(t=500){super(new C1,t)}}class Ht{decode(t,e){try{return this.doDecode(t,e)}catch{if(e&&e.get(ut.TRY_HARDER)===!0&&t.isRotateSupported()){const r=t.rotateCounterClockwise(),s=this.doDecode(r,e),h=s.getResultMetadata();let o=270;h!==null&&h.get(Gt.ORIENTATION)===!0&&(o=o+h.get(Gt.ORIENTATION)%360),s.putMetadata(Gt.ORIENTATION,o);const c=s.getResultPoints();if(c!==null){const p=r.getHeight();for(let x=0;x<c.length;x++)c[x]=new W(p-c[x].getY()-1,c[x].getX())}return s}else throw new L}}reset(){}doDecode(t,e){const a=t.getWidth(),n=t.getHeight();let r=new et(a);const s=e&&e.get(ut.TRY_HARDER)===!0,h=Math.max(1,n>>(s?8:5));let o;s?o=n:o=15;const c=Math.trunc(n/2);for(let p=0;p<o;p++){const x=Math.trunc((p+1)/2),y=(p&1)===0,A=c+h*(y?x:-x);if(A<0||A>=n)break;try{r=t.getBlackRow(A,r)}catch{continue}for(let E=0;E<2;E++){if(E===1&&(r.reverse(),e&&e.get(ut.NEED_RESULT_POINT_CALLBACK)===!0)){const I=new Map;e.forEach((S,O)=>I.set(O,S)),I.delete(ut.NEED_RESULT_POINT_CALLBACK),e=I}try{const I=this.decodeRow(A,r,e);if(E===1){I.putMetadata(Gt.ORIENTATION,180);const S=I.getResultPoints();S!==null&&(S[0]=new W(a-S[0].getX()-1,S[0].getY()),S[1]=new W(a-S[1].getX()-1,S[1].getY()))}return I}catch{}}}throw new L}static recordPattern(t,e,a){const n=a.length;for(let c=0;c<n;c++)a[c]=0;const r=t.getSize();if(e>=r)throw new L;let s=!t.get(e),h=0,o=e;for(;o<r;){if(t.get(o)!==s)a[h]++;else{if(++h===n)break;a[h]=1,s=!s}o++}if(!(h===n||h===n-1&&o===r))throw new L}static recordPatternInReverse(t,e,a){let n=a.length,r=t.get(e);for(;e>0&&n>=0;)t.get(--e)!==r&&(n--,r=!r);if(n>=0)throw new L;Ht.recordPattern(t,e+1,a)}static patternMatchVariance(t,e,a){const n=t.length;let r=0,s=0;for(let c=0;c<n;c++)r+=t[c],s+=e[c];if(r<s)return Number.POSITIVE_INFINITY;const h=r/s;a*=h;let o=0;for(let c=0;c<n;c++){const p=t[c],x=e[c]*h,y=p>x?p-x:x-p;if(y>a)return Number.POSITIVE_INFINITY;o+=y}return o/r}}class U extends Ht{static findStartPattern(t){const e=t.getSize(),a=t.getNextSet(0);let n=0,r=Int32Array.from([0,0,0,0,0,0]),s=a,h=!1;const o=6;for(let c=a;c<e;c++)if(t.get(c)!==h)r[n]++;else{if(n===o-1){let p=U.MAX_AVG_VARIANCE,x=-1;for(let y=U.CODE_START_A;y<=U.CODE_START_C;y++){const A=Ht.patternMatchVariance(r,U.CODE_PATTERNS[y],U.MAX_INDIVIDUAL_VARIANCE);A<p&&(p=A,x=y)}if(x>=0&&t.isRange(Math.max(0,s-(c-s)/2),s,!1))return Int32Array.from([s,c,x]);s+=r[0]+r[1],r=r.slice(2,r.length-1),r[n-1]=0,r[n]=0,n--}else n++;r[n]=1,h=!h}throw new L}static decodeCode(t,e,a){Ht.recordPattern(t,a,e);let n=U.MAX_AVG_VARIANCE,r=-1;for(let s=0;s<U.CODE_PATTERNS.length;s++){const h=U.CODE_PATTERNS[s],o=this.patternMatchVariance(e,h,U.MAX_INDIVIDUAL_VARIANCE);o<n&&(n=o,r=s)}if(r>=0)return r;throw new L}decodeRow(t,e,a){const n=a&&a.get(ut.ASSUME_GS1)===!0,r=U.findStartPattern(e),s=r[2];let h=0;const o=new Uint8Array(20);o[h++]=s;let c;switch(s){case U.CODE_START_A:c=U.CODE_CODE_A;break;case U.CODE_START_B:c=U.CODE_CODE_B;break;case U.CODE_START_C:c=U.CODE_CODE_C;break;default:throw new k}let p=!1,x=!1,y="",A=r[0],E=r[1];const I=Int32Array.from([0,0,0,0,0,0]);let S=0,O=0,H=s,F=0,P=!0,ht=!1,at=!1;for(;!p;){const a1=x;switch(x=!1,S=O,O=U.decodeCode(e,I,E),o[h++]=O,O!==U.CODE_STOP&&(P=!0),O!==U.CODE_STOP&&(F++,H+=F*O),A=E,E+=I.reduce((Dr,_r)=>Dr+_r,0),O){case U.CODE_START_A:case U.CODE_START_B:case U.CODE_START_C:throw new k}switch(c){case U.CODE_CODE_A:if(O<64)at===ht?y+=String.fromCharCode(32+O):y+=String.fromCharCode(32+O+128),at=!1;else if(O<96)at===ht?y+=String.fromCharCode(O-64):y+=String.fromCharCode(O+64),at=!1;else switch(O!==U.CODE_STOP&&(P=!1),O){case U.CODE_FNC_1:n&&(y.length===0?y+="]C1":y+="");break;case U.CODE_FNC_2:case U.CODE_FNC_3:break;case U.CODE_FNC_4_A:!ht&&at?(ht=!0,at=!1):ht&&at?(ht=!1,at=!1):at=!0;break;case U.CODE_SHIFT:x=!0,c=U.CODE_CODE_B;break;case U.CODE_CODE_B:c=U.CODE_CODE_B;break;case U.CODE_CODE_C:c=U.CODE_CODE_C;break;case U.CODE_STOP:p=!0;break}break;case U.CODE_CODE_B:if(O<96)at===ht?y+=String.fromCharCode(32+O):y+=String.fromCharCode(32+O+128),at=!1;else switch(O!==U.CODE_STOP&&(P=!1),O){case U.CODE_FNC_1:n&&(y.length===0?y+="]C1":y+="");break;case U.CODE_FNC_2:case U.CODE_FNC_3:break;case U.CODE_FNC_4_B:!ht&&at?(ht=!0,at=!1):ht&&at?(ht=!1,at=!1):at=!0;break;case U.CODE_SHIFT:x=!0,c=U.CODE_CODE_A;break;case U.CODE_CODE_A:c=U.CODE_CODE_A;break;case U.CODE_CODE_C:c=U.CODE_CODE_C;break;case U.CODE_STOP:p=!0;break}break;case U.CODE_CODE_C:if(O<100)O<10&&(y+="0"),y+=O;else switch(O!==U.CODE_STOP&&(P=!1),O){case U.CODE_FNC_1:n&&(y.length===0?y+="]C1":y+="");break;case U.CODE_CODE_A:c=U.CODE_CODE_A;break;case U.CODE_CODE_B:c=U.CODE_CODE_B;break;case U.CODE_STOP:p=!0;break}break}a1&&(c=c===U.CODE_CODE_A?U.CODE_CODE_B:U.CODE_CODE_A)}const he=E-A;if(E=e.getNextUnset(E),!e.isRange(E,Math.min(e.getSize(),E+(E-A)/2),!1))throw new L;if(H-=F*S,H%103!==S)throw new z;const ve=y.length;if(ve===0)throw new L;ve>0&&P&&(c===U.CODE_CODE_C?y=y.substring(0,ve-2):y=y.substring(0,ve-1));const oe=(r[1]+r[0])/2,Ct=A+he/2,jt=o.length,ce=new Uint8Array(jt);for(let a1=0;a1<jt;a1++)ce[a1]=o[a1];const e1=[new W(oe,t),new W(Ct,t)];return new $t(y,ce,0,e1,Q.CODE_128,new Date().getTime())}}U.CODE_PATTERNS=[Int32Array.from([2,1,2,2,2,2]),Int32Array.from([2,2,2,1,2,2]),Int32Array.from([2,2,2,2,2,1]),Int32Array.from([1,2,1,2,2,3]),Int32Array.from([1,2,1,3,2,2]),Int32Array.from([1,3,1,2,2,2]),Int32Array.from([1,2,2,2,1,3]),Int32Array.from([1,2,2,3,1,2]),Int32Array.from([1,3,2,2,1,2]),Int32Array.from([2,2,1,2,1,3]),Int32Array.from([2,2,1,3,1,2]),Int32Array.from([2,3,1,2,1,2]),Int32Array.from([1,1,2,2,3,2]),Int32Array.from([1,2,2,1,3,2]),Int32Array.from([1,2,2,2,3,1]),Int32Array.from([1,1,3,2,2,2]),Int32Array.from([1,2,3,1,2,2]),Int32Array.from([1,2,3,2,2,1]),Int32Array.from([2,2,3,2,1,1]),Int32Array.from([2,2,1,1,3,2]),Int32Array.from([2,2,1,2,3,1]),Int32Array.from([2,1,3,2,1,2]),Int32Array.from([2,2,3,1,1,2]),Int32Array.from([3,1,2,1,3,1]),Int32Array.from([3,1,1,2,2,2]),Int32Array.from([3,2,1,1,2,2]),Int32Array.from([3,2,1,2,2,1]),Int32Array.from([3,1,2,2,1,2]),Int32Array.from([3,2,2,1,1,2]),Int32Array.from([3,2,2,2,1,1]),Int32Array.from([2,1,2,1,2,3]),Int32Array.from([2,1,2,3,2,1]),Int32Array.from([2,3,2,1,2,1]),Int32Array.from([1,1,1,3,2,3]),Int32Array.from([1,3,1,1,2,3]),Int32Array.from([1,3,1,3,2,1]),Int32Array.from([1,1,2,3,1,3]),Int32Array.from([1,3,2,1,1,3]),Int32Array.from([1,3,2,3,1,1]),Int32Array.from([2,1,1,3,1,3]),Int32Array.from([2,3,1,1,1,3]),Int32Array.from([2,3,1,3,1,1]),Int32Array.from([1,1,2,1,3,3]),Int32Array.from([1,1,2,3,3,1]),Int32Array.from([1,3,2,1,3,1]),Int32Array.from([1,1,3,1,2,3]),Int32Array.from([1,1,3,3,2,1]),Int32Array.from([1,3,3,1,2,1]),Int32Array.from([3,1,3,1,2,1]),Int32Array.from([2,1,1,3,3,1]),Int32Array.from([2,3,1,1,3,1]),Int32Array.from([2,1,3,1,1,3]),Int32Array.from([2,1,3,3,1,1]),Int32Array.from([2,1,3,1,3,1]),Int32Array.from([3,1,1,1,2,3]),Int32Array.from([3,1,1,3,2,1]),Int32Array.from([3,3,1,1,2,1]),Int32Array.from([3,1,2,1,1,3]),Int32Array.from([3,1,2,3,1,1]),Int32Array.from([3,3,2,1,1,1]),Int32Array.from([3,1,4,1,1,1]),Int32Array.from([2,2,1,4,1,1]),Int32Array.from([4,3,1,1,1,1]),Int32Array.from([1,1,1,2,2,4]),Int32Array.from([1,1,1,4,2,2]),Int32Array.from([1,2,1,1,2,4]),Int32Array.from([1,2,1,4,2,1]),Int32Array.from([1,4,1,1,2,2]),Int32Array.from([1,4,1,2,2,1]),Int32Array.from([1,1,2,2,1,4]),Int32Array.from([1,1,2,4,1,2]),Int32Array.from([1,2,2,1,1,4]),Int32Array.from([1,2,2,4,1,1]),Int32Array.from([1,4,2,1,1,2]),Int32Array.from([1,4,2,2,1,1]),Int32Array.from([2,4,1,2,1,1]),Int32Array.from([2,2,1,1,1,4]),Int32Array.from([4,1,3,1,1,1]),Int32Array.from([2,4,1,1,1,2]),Int32Array.from([1,3,4,1,1,1]),Int32Array.from([1,1,1,2,4,2]),Int32Array.from([1,2,1,1,4,2]),Int32Array.from([1,2,1,2,4,1]),Int32Array.from([1,1,4,2,1,2]),Int32Array.from([1,2,4,1,1,2]),Int32Array.from([1,2,4,2,1,1]),Int32Array.from([4,1,1,2,1,2]),Int32Array.from([4,2,1,1,1,2]),Int32Array.from([4,2,1,2,1,1]),Int32Array.from([2,1,2,1,4,1]),Int32Array.from([2,1,4,1,2,1]),Int32Array.from([4,1,2,1,2,1]),Int32Array.from([1,1,1,1,4,3]),Int32Array.from([1,1,1,3,4,1]),Int32Array.from([1,3,1,1,4,1]),Int32Array.from([1,1,4,1,1,3]),Int32Array.from([1,1,4,3,1,1]),Int32Array.from([4,1,1,1,1,3]),Int32Array.from([4,1,1,3,1,1]),Int32Array.from([1,1,3,1,4,1]),Int32Array.from([1,1,4,1,3,1]),Int32Array.from([3,1,1,1,4,1]),Int32Array.from([4,1,1,1,3,1]),Int32Array.from([2,1,1,4,1,2]),Int32Array.from([2,1,1,2,1,4]),Int32Array.from([2,1,1,2,3,2]),Int32Array.from([2,3,3,1,1,1,2])],U.MAX_AVG_VARIANCE=.25,U.MAX_INDIVIDUAL_VARIANCE=.7,U.CODE_SHIFT=98,U.CODE_CODE_C=99,U.CODE_CODE_B=100,U.CODE_CODE_A=101,U.CODE_FNC_1=102,U.CODE_FNC_2=97,U.CODE_FNC_3=96,U.CODE_FNC_4_A=101,U.CODE_FNC_4_B=100,U.CODE_START_A=103,U.CODE_START_B=104,U.CODE_START_C=105,U.CODE_STOP=106;class Ft extends Ht{constructor(t=!1,e=!1){super(),this.usingCheckDigit=t,this.extendedMode=e,this.decodeRowResult="",this.counters=new Int32Array(9)}decodeRow(t,e,a){let n=this.counters;n.fill(0),this.decodeRowResult="";let r=Ft.findAsteriskPattern(e,n),s=e.getNextSet(r[1]),h=e.getSize(),o,c;do{Ft.recordPattern(e,s,n);let I=Ft.toNarrowWidePattern(n);if(I<0)throw new L;o=Ft.patternToChar(I),this.decodeRowResult+=o,c=s;for(let S of n)s+=S;s=e.getNextSet(s)}while(o!=="*");this.decodeRowResult=this.decodeRowResult.substring(0,this.decodeRowResult.length-1);let p=0;for(let I of n)p+=I;let x=s-c-p;if(s!==h&&x*2<p)throw new L;if(this.usingCheckDigit){let I=this.decodeRowResult.length-1,S=0;for(let O=0;O<I;O++)S+=Ft.ALPHABET_STRING.indexOf(this.decodeRowResult.charAt(O));if(this.decodeRowResult.charAt(I)!==Ft.ALPHABET_STRING.charAt(S%43))throw new z;this.decodeRowResult=this.decodeRowResult.substring(0,I)}if(this.decodeRowResult.length===0)throw new L;let y;this.extendedMode?y=Ft.decodeExtended(this.decodeRowResult):y=this.decodeRowResult;let A=(r[1]+r[0])/2,E=c+p/2;return new $t(y,null,0,[new W(A,t),new W(E,t)],Q.CODE_39,new Date().getTime())}static findAsteriskPattern(t,e){let a=t.getSize(),n=t.getNextSet(0),r=0,s=n,h=!1,o=e.length;for(let c=n;c<a;c++)if(t.get(c)!==h)e[r]++;else{if(r===o-1){if(this.toNarrowWidePattern(e)===Ft.ASTERISK_ENCODING&&t.isRange(Math.max(0,s-Math.floor((c-s)/2)),s,!1))return[s,c];s+=e[0]+e[1],e.copyWithin(0,2,2+r-1),e[r-1]=0,e[r]=0,r--}else r++;e[r]=1,h=!h}throw new L}static toNarrowWidePattern(t){let e=t.length,a=0,n;do{let r=2147483647;for(let o of t)o<r&&o>a&&(r=o);a=r,n=0;let s=0,h=0;for(let o=0;o<e;o++){let c=t[o];c>a&&(h|=1<<e-1-o,n++,s+=c)}if(n===3){for(let o=0;o<e&&n>0;o++){let c=t[o];if(c>a&&(n--,c*2>=s))return-1}return h}}while(n>3);return-1}static patternToChar(t){for(let e=0;e<Ft.CHARACTER_ENCODINGS.length;e++)if(Ft.CHARACTER_ENCODINGS[e]===t)return Ft.ALPHABET_STRING.charAt(e);if(t===Ft.ASTERISK_ENCODING)return"*";throw new L}static decodeExtended(t){let e=t.length,a="";for(let n=0;n<e;n++){let r=t.charAt(n);if(r==="+"||r==="$"||r==="%"||r==="/"){let s=t.charAt(n+1),h="\0";switch(r){case"+":if(s>="A"&&s<="Z")h=String.fromCharCode(s.charCodeAt(0)+32);else throw new k;break;case"$":if(s>="A"&&s<="Z")h=String.fromCharCode(s.charCodeAt(0)-64);else throw new k;break;case"%":if(s>="A"&&s<="E")h=String.fromCharCode(s.charCodeAt(0)-38);else if(s>="F"&&s<="J")h=String.fromCharCode(s.charCodeAt(0)-11);else if(s>="K"&&s<="O")h=String.fromCharCode(s.charCodeAt(0)+16);else if(s>="P"&&s<="T")h=String.fromCharCode(s.charCodeAt(0)+43);else if(s==="U")h="\0";else if(s==="V")h="@";else if(s==="W")h="`";else if(s==="X"||s==="Y"||s==="Z")h="";else throw new k;break;case"/":if(s>="A"&&s<="O")h=String.fromCharCode(s.charCodeAt(0)-32);else if(s==="Z")h=":";else throw new k;break}a+=h,n++}else a+=r}return a}}Ft.ALPHABET_STRING="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%",Ft.CHARACTER_ENCODINGS=[52,289,97,352,49,304,112,37,292,100,265,73,328,25,280,88,13,268,76,28,259,67,322,19,274,82,7,262,70,22,385,193,448,145,400,208,133,388,196,168,162,138,42],Ft.ASTERISK_ENCODING=148;class wt extends Ht{constructor(){super(...arguments),this.narrowLineWidth=-1}decodeRow(t,e,a){let n=this.decodeStart(e),r=this.decodeEnd(e),s=new yt;wt.decodeMiddle(e,n[1],r[0],s);let h=s.toString(),o=null;a!=null&&(o=a.get(ut.ALLOWED_LENGTHS)),o==null&&(o=wt.DEFAULT_ALLOWED_LENGTHS);let c=h.length,p=!1,x=0;for(let E of o){if(c===E){p=!0;break}E>x&&(x=E)}if(!p&&c>x&&(p=!0),!p)throw new k;const y=[new W(n[1],t),new W(r[0],t)];return new $t(h,null,0,y,Q.ITF,new Date().getTime())}static decodeMiddle(t,e,a,n){let r=new Int32Array(10),s=new Int32Array(5),h=new Int32Array(5);for(r.fill(0),s.fill(0),h.fill(0);e<a;){Ht.recordPattern(t,e,r);for(let c=0;c<5;c++){let p=2*c;s[c]=r[p],h[c]=r[p+1]}let o=wt.decodeDigit(s);n.append(o.toString()),o=this.decodeDigit(h),n.append(o.toString()),r.forEach(function(c){e+=c})}}decodeStart(t){let e=wt.skipWhiteSpace(t),a=wt.findGuardPattern(t,e,wt.START_PATTERN);return this.narrowLineWidth=(a[1]-a[0])/4,this.validateQuietZone(t,a[0]),a}validateQuietZone(t,e){let a=this.narrowLineWidth*10;a=a<e?a:e;for(let n=e-1;a>0&&n>=0&&!t.get(n);n--)a--;if(a!==0)throw new L}static skipWhiteSpace(t){const e=t.getSize(),a=t.getNextSet(0);if(a===e)throw new L;return a}decodeEnd(t){t.reverse();try{let e=wt.skipWhiteSpace(t),a;try{a=wt.findGuardPattern(t,e,wt.END_PATTERN_REVERSED[0])}catch(r){r instanceof L&&(a=wt.findGuardPattern(t,e,wt.END_PATTERN_REVERSED[1]))}this.validateQuietZone(t,a[0]);let n=a[0];return a[0]=t.getSize()-a[1],a[1]=t.getSize()-n,a}finally{t.reverse()}}static findGuardPattern(t,e,a){let n=a.length,r=new Int32Array(n),s=t.getSize(),h=!1,o=0,c=e;r.fill(0);for(let p=e;p<s;p++)if(t.get(p)!==h)r[o]++;else{if(o===n-1){if(Ht.patternMatchVariance(r,a,wt.MAX_INDIVIDUAL_VARIANCE)<wt.MAX_AVG_VARIANCE)return[c,p];c+=r[0]+r[1],q.arraycopy(r,2,r,0,o-1),r[o-1]=0,r[o]=0,o--}else o++;r[o]=1,h=!h}throw new L}static decodeDigit(t){let e=wt.MAX_AVG_VARIANCE,a=-1,n=wt.PATTERNS.length;for(let r=0;r<n;r++){let s=wt.PATTERNS[r],h=Ht.patternMatchVariance(t,s,wt.MAX_INDIVIDUAL_VARIANCE);h<e?(e=h,a=r):h===e&&(a=-1)}if(a>=0)return a%10;throw new L}}wt.PATTERNS=[Int32Array.from([1,1,2,2,1]),Int32Array.from([2,1,1,1,2]),Int32Array.from([1,2,1,1,2]),Int32Array.from([2,2,1,1,1]),Int32Array.from([1,1,2,1,2]),Int32Array.from([2,1,2,1,1]),Int32Array.from([1,2,2,1,1]),Int32Array.from([1,1,1,2,2]),Int32Array.from([2,1,1,2,1]),Int32Array.from([1,2,1,2,1]),Int32Array.from([1,1,3,3,1]),Int32Array.from([3,1,1,1,3]),Int32Array.from([1,3,1,1,3]),Int32Array.from([3,3,1,1,1]),Int32Array.from([1,1,3,1,3]),Int32Array.from([3,1,3,1,1]),Int32Array.from([1,3,3,1,1]),Int32Array.from([1,1,1,3,3]),Int32Array.from([3,1,1,3,1]),Int32Array.from([1,3,1,3,1])],wt.MAX_AVG_VARIANCE=.38,wt.MAX_INDIVIDUAL_VARIANCE=.5,wt.DEFAULT_ALLOWED_LENGTHS=[6,8,10,12,14],wt.START_PATTERN=Int32Array.from([1,1,1,1]),wt.END_PATTERN_REVERSED=[Int32Array.from([1,1,2]),Int32Array.from([1,1,3])];class Dt extends Ht{constructor(){super(...arguments),this.decodeRowStringBuffer=""}static findStartGuardPattern(t){let e=!1,a,n=0,r=Int32Array.from([0,0,0]);for(;!e;){r=Int32Array.from([0,0,0]),a=Dt.findGuardPattern(t,n,!1,this.START_END_PATTERN,r);let s=a[0];n=a[1];let h=s-(n-s);h>=0&&(e=t.isRange(h,s,!1))}return a}static checkChecksum(t){return Dt.checkStandardUPCEANChecksum(t)}static checkStandardUPCEANChecksum(t){let e=t.length;if(e===0)return!1;let a=parseInt(t.charAt(e-1),10);return Dt.getStandardUPCEANChecksum(t.substring(0,e-1))===a}static getStandardUPCEANChecksum(t){let e=t.length,a=0;for(let n=e-1;n>=0;n-=2){let r=t.charAt(n).charCodeAt(0)-48;if(r<0||r>9)throw new k;a+=r}a*=3;for(let n=e-2;n>=0;n-=2){let r=t.charAt(n).charCodeAt(0)-48;if(r<0||r>9)throw new k;a+=r}return(1e3-a)%10}static decodeEnd(t,e){return Dt.findGuardPattern(t,e,!1,Dt.START_END_PATTERN,new Int32Array(Dt.START_END_PATTERN.length).fill(0))}static findGuardPatternWithoutCounters(t,e,a,n){return this.findGuardPattern(t,e,a,n,new Int32Array(n.length))}static findGuardPattern(t,e,a,n,r){let s=t.getSize();e=a?t.getNextUnset(e):t.getNextSet(e);let h=0,o=e,c=n.length,p=a;for(let x=e;x<s;x++)if(t.get(x)!==p)r[h]++;else{if(h===c-1){if(Ht.patternMatchVariance(r,n,Dt.MAX_INDIVIDUAL_VARIANCE)<Dt.MAX_AVG_VARIANCE)return Int32Array.from([o,x]);o+=r[0]+r[1];let y=r.slice(2,r.length-1);for(let A=0;A<h-1;A++)r[A]=y[A];r[h-1]=0,r[h]=0,h--}else h++;r[h]=1,p=!p}throw new L}static decodeDigit(t,e,a,n){this.recordPattern(t,a,e);let r=this.MAX_AVG_VARIANCE,s=-1,h=n.length;for(let o=0;o<h;o++){let c=n[o],p=Ht.patternMatchVariance(e,c,Dt.MAX_INDIVIDUAL_VARIANCE);p<r&&(r=p,s=o)}if(s>=0)return s;throw new L}}Dt.MAX_AVG_VARIANCE=.48,Dt.MAX_INDIVIDUAL_VARIANCE=.7,Dt.START_END_PATTERN=Int32Array.from([1,1,1]),Dt.MIDDLE_PATTERN=Int32Array.from([1,1,1,1,1]),Dt.END_PATTERN=Int32Array.from([1,1,1,1,1,1]),Dt.L_PATTERNS=[Int32Array.from([3,2,1,1]),Int32Array.from([2,2,2,1]),Int32Array.from([2,1,2,2]),Int32Array.from([1,4,1,1]),Int32Array.from([1,1,3,2]),Int32Array.from([1,2,3,1]),Int32Array.from([1,1,1,4]),Int32Array.from([1,3,1,2]),Int32Array.from([1,2,1,3]),Int32Array.from([3,1,1,2])];class c1{constructor(){this.CHECK_DIGIT_ENCODINGS=[24,20,18,17,12,6,3,10,9,5],this.decodeMiddleCounters=Int32Array.from([0,0,0,0]),this.decodeRowStringBuffer=""}decodeRow(t,e,a){let n=this.decodeRowStringBuffer,r=this.decodeMiddle(e,a,n),s=n.toString(),h=c1.parseExtensionString(s),o=[new W((a[0]+a[1])/2,t),new W(r,t)],c=new $t(s,null,0,o,Q.UPC_EAN_EXTENSION,new Date().getTime());return h!=null&&c.putAllMetadata(h),c}decodeMiddle(t,e,a){let n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=t.getSize(),s=e[1],h=0;for(let c=0;c<5&&s<r;c++){let p=Dt.decodeDigit(t,n,s,Dt.L_AND_G_PATTERNS);a+=String.fromCharCode(48+p%10);for(let x of n)s+=x;p>=10&&(h|=1<<4-c),c!==4&&(s=t.getNextSet(s),s=t.getNextUnset(s))}if(a.length!==5)throw new L;let o=this.determineCheckDigit(h);if(c1.extensionChecksum(a.toString())!==o)throw new L;return s}static extensionChecksum(t){let e=t.length,a=0;for(let n=e-2;n>=0;n-=2)a+=t.charAt(n).charCodeAt(0)-48;a*=3;for(let n=e-1;n>=0;n-=2)a+=t.charAt(n).charCodeAt(0)-48;return a*=3,a%10}determineCheckDigit(t){for(let e=0;e<10;e++)if(t===this.CHECK_DIGIT_ENCODINGS[e])return e;throw new L}static parseExtensionString(t){if(t.length!==5)return null;let e=c1.parseExtension5String(t);return e==null?null:new Map([[Gt.SUGGESTED_PRICE,e]])}static parseExtension5String(t){let e;switch(t.charAt(0)){case"0":e="£";break;case"5":e="$";break;case"9":switch(t){case"90000":return null;case"99991":return"0.00";case"99990":return"Used"}e="";break;default:e="";break}let a=parseInt(t.substring(1)),n=(a/100).toString(),r=a%100,s=r<10?"0"+r:r.toString();return e+n+"."+s}}class Z1{constructor(){this.decodeMiddleCounters=Int32Array.from([0,0,0,0]),this.decodeRowStringBuffer=""}decodeRow(t,e,a){let n=this.decodeRowStringBuffer,r=this.decodeMiddle(e,a,n),s=n.toString(),h=Z1.parseExtensionString(s),o=[new W((a[0]+a[1])/2,t),new W(r,t)],c=new $t(s,null,0,o,Q.UPC_EAN_EXTENSION,new Date().getTime());return h!=null&&c.putAllMetadata(h),c}decodeMiddle(t,e,a){let n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=t.getSize(),s=e[1],h=0;for(let o=0;o<2&&s<r;o++){let c=Dt.decodeDigit(t,n,s,Dt.L_AND_G_PATTERNS);a+=String.fromCharCode(48+c%10);for(let p of n)s+=p;c>=10&&(h|=1<<1-o),o!==1&&(s=t.getNextSet(s),s=t.getNextUnset(s))}if(a.length!==2)throw new L;if(parseInt(a.toString())%4!==h)throw new L;return s}static parseExtensionString(t){return t.length!==2?null:new Map([[Gt.ISSUE_NUMBER,parseInt(t)]])}}class f2{static decodeRow(t,e,a){let n=Dt.findGuardPattern(e,a,!1,this.EXTENSION_START_PATTERN,new Int32Array(this.EXTENSION_START_PATTERN.length).fill(0));try{return new c1().decodeRow(t,e,n)}catch{return new Z1().decodeRow(t,e,n)}}}f2.EXTENSION_START_PATTERN=Int32Array.from([1,1,2]);class ft extends Dt{constructor(){super(),this.decodeRowStringBuffer="",ft.L_AND_G_PATTERNS=ft.L_PATTERNS.map(t=>Int32Array.from(t));for(let t=10;t<20;t++){let e=ft.L_PATTERNS[t-10],a=new Int32Array(e.length);for(let n=0;n<e.length;n++)a[n]=e[e.length-n-1];ft.L_AND_G_PATTERNS[t]=a}}decodeRow(t,e,a){let n=ft.findStartGuardPattern(e),r=a==null?null:a.get(ut.NEED_RESULT_POINT_CALLBACK);if(r!=null){const P=new W((n[0]+n[1])/2,t);r.foundPossibleResultPoint(P)}let s=this.decodeMiddle(e,n,this.decodeRowStringBuffer),h=s.rowOffset,o=s.resultString;if(r!=null){const P=new W(h,t);r.foundPossibleResultPoint(P)}let c=this.decodeEnd(e,h);if(r!=null){const P=new W((c[0]+c[1])/2,t);r.foundPossibleResultPoint(P)}let p=c[1],x=p+(p-c[0]);if(x>=e.getSize()||!e.isRange(p,x,!1))throw new L;let y=o.toString();if(y.length<8)throw new k;if(!ft.checkChecksum(y))throw new z;let A=(n[1]+n[0])/2,E=(c[1]+c[0])/2,I=this.getBarcodeFormat(),S=[new W(A,t),new W(E,t)],O=new $t(y,null,0,S,I,new Date().getTime()),H=0;try{let P=f2.decodeRow(t,e,c[1]);O.putMetadata(Gt.UPC_EAN_EXTENSION,P.getText()),O.putAllMetadata(P.getResultMetadata()),O.addResultPoints(P.getResultPoints()),H=P.getText().length}catch{}let F=a==null?null:a.get(ut.ALLOWED_EAN_EXTENSIONS);if(F!=null){let P=!1;for(let ht in F)if(H.toString()===ht){P=!0;break}if(!P)throw new L}return O}decodeEnd(t,e){return ft.findGuardPattern(t,e,!1,ft.START_END_PATTERN,new Int32Array(ft.START_END_PATTERN.length).fill(0))}static checkChecksum(t){return ft.checkStandardUPCEANChecksum(t)}static checkStandardUPCEANChecksum(t){let e=t.length;if(e===0)return!1;let a=parseInt(t.charAt(e-1),10);return ft.getStandardUPCEANChecksum(t.substring(0,e-1))===a}static getStandardUPCEANChecksum(t){let e=t.length,a=0;for(let n=e-1;n>=0;n-=2){let r=t.charAt(n).charCodeAt(0)-48;if(r<0||r>9)throw new k;a+=r}a*=3;for(let n=e-2;n>=0;n-=2){let r=t.charAt(n).charCodeAt(0)-48;if(r<0||r>9)throw new k;a+=r}return(1e3-a)%10}}class ke extends ft{constructor(){super(),this.decodeMiddleCounters=Int32Array.from([0,0,0,0])}decodeMiddle(t,e,a){let n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=t.getSize(),s=e[1],h=0;for(let c=0;c<6&&s<r;c++){let p=ft.decodeDigit(t,n,s,ft.L_AND_G_PATTERNS);a+=String.fromCharCode(48+p%10);for(let x of n)s+=x;p>=10&&(h|=1<<5-c)}a=ke.determineFirstDigit(a,h),s=ft.findGuardPattern(t,s,!0,ft.MIDDLE_PATTERN,new Int32Array(ft.MIDDLE_PATTERN.length).fill(0))[1];for(let c=0;c<6&&s<r;c++){let p=ft.decodeDigit(t,n,s,ft.L_PATTERNS);a+=String.fromCharCode(48+p);for(let x of n)s+=x}return{rowOffset:s,resultString:a}}getBarcodeFormat(){return Q.EAN_13}static determineFirstDigit(t,e){for(let a=0;a<10;a++)if(e===this.FIRST_DIGIT_ENCODINGS[a])return t=String.fromCharCode(48+a)+t,t;throw new L}}ke.FIRST_DIGIT_ENCODINGS=[0,11,13,14,19,25,28,21,22,26];class x2 extends ft{constructor(){super(),this.decodeMiddleCounters=Int32Array.from([0,0,0,0])}decodeMiddle(t,e,a){const n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=t.getSize(),s=e[1];for(let o=0;o<4&&s<r;o++){let c=ft.decodeDigit(t,n,s,ft.L_PATTERNS);a+=String.fromCharCode(48+c);for(let p of n)s+=p}s=ft.findGuardPattern(t,s,!0,ft.MIDDLE_PATTERN,new Int32Array(ft.MIDDLE_PATTERN.length).fill(0))[1];for(let o=0;o<4&&s<r;o++){let c=ft.decodeDigit(t,n,s,ft.L_PATTERNS);a+=String.fromCharCode(48+c);for(let p of n)s+=p}return{rowOffset:s,resultString:a}}getBarcodeFormat(){return Q.EAN_8}}class M2 extends ft{constructor(){super(...arguments),this.ean13Reader=new ke}getBarcodeFormat(){return Q.UPC_A}decode(t,e){return this.maybeReturnResult(this.ean13Reader.decode(t))}decodeRow(t,e,a){return this.maybeReturnResult(this.ean13Reader.decodeRow(t,e,a))}decodeMiddle(t,e,a){return this.ean13Reader.decodeMiddle(t,e,a)}maybeReturnResult(t){let e=t.getText();if(e.charAt(0)==="0"){let a=new $t(e.substring(1),null,null,t.getResultPoints(),Q.UPC_A);return t.getResultMetadata()!=null&&a.putAllMetadata(t.getResultMetadata()),a}else throw new L}reset(){this.ean13Reader.reset()}}class Me extends ft{constructor(){super(),this.decodeMiddleCounters=new Int32Array(4)}decodeMiddle(t,e,a){const n=this.decodeMiddleCounters.map(c=>c);n[0]=0,n[1]=0,n[2]=0,n[3]=0;const r=t.getSize();let s=e[1],h=0;for(let c=0;c<6&&s<r;c++){const p=Me.decodeDigit(t,n,s,Me.L_AND_G_PATTERNS);a+=String.fromCharCode(48+p%10);for(let x of n)s+=x;p>=10&&(h|=1<<5-c)}let o=Me.determineNumSysAndCheckDigit(a,h);return{rowOffset:s,resultString:o}}decodeEnd(t,e){return Me.findGuardPatternWithoutCounters(t,e,!0,Me.MIDDLE_END_PATTERN)}checkChecksum(t){return ft.checkChecksum(Me.convertUPCEtoUPCA(t))}static determineNumSysAndCheckDigit(t,e){for(let a=0;a<=1;a++)for(let n=0;n<10;n++)if(e===this.NUMSYS_AND_CHECK_DIGIT_PATTERNS[a][n]){let r=String.fromCharCode(48+a),s=String.fromCharCode(48+n);return r+t+s}throw L.getNotFoundInstance()}getBarcodeFormat(){return Q.UPC_E}static convertUPCEtoUPCA(t){const e=t.slice(1,7).split("").map(r=>r.charCodeAt(0)),a=new yt;a.append(t.charAt(0));let n=e[5];switch(n){case 0:case 1:case 2:a.appendChars(e,0,2),a.append(n),a.append("0000"),a.appendChars(e,2,3);break;case 3:a.appendChars(e,0,3),a.append("00000"),a.appendChars(e,3,2);break;case 4:a.appendChars(e,0,4),a.append("00000"),a.append(e[4]);break;default:a.appendChars(e,0,5),a.append("0000"),a.append(n);break}return t.length>=8&&a.append(t.charAt(7)),a.toString()}}Me.MIDDLE_END_PATTERN=Int32Array.from([1,1,1,1,1,1]),Me.NUMSYS_AND_CHECK_DIGIT_PATTERNS=[Int32Array.from([56,52,50,49,44,38,35,42,41,37]),Int32Array.from([7,11,13,14,19,25,28,21,22,26])];class G1 extends Ht{constructor(t){super();let e=t==null?null:t.get(ut.POSSIBLE_FORMATS),a=[];u(e)?(a.push(new ke),a.push(new M2),a.push(new x2),a.push(new Me)):(e.indexOf(Q.EAN_13)>-1&&a.push(new ke),e.indexOf(Q.UPC_A)>-1&&a.push(new M2),e.indexOf(Q.EAN_8)>-1&&a.push(new x2),e.indexOf(Q.UPC_E)>-1&&a.push(new Me)),this.readers=a}decodeRow(t,e,a){for(let n of this.readers)try{const r=n.decodeRow(t,e,a),s=r.getBarcodeFormat()===Q.EAN_13&&r.getText().charAt(0)==="0",h=a==null?null:a.get(ut.POSSIBLE_FORMATS),o=h==null||h.includes(Q.UPC_A);if(s&&o){const c=r.getRawBytes(),p=new $t(r.getText().substring(1),c,c?c.length:null,r.getResultPoints(),Q.UPC_A);return p.putAllMetadata(r.getResultMetadata()),p}return r}catch{}throw new L}reset(){for(let t of this.readers)t.reset()}}class Kt extends Ht{constructor(){super(),this.decodeFinderCounters=new Int32Array(4),this.dataCharacterCounters=new Int32Array(8),this.oddRoundingErrors=new Array(4),this.evenRoundingErrors=new Array(4),this.oddCounts=new Array(this.dataCharacterCounters.length/2),this.evenCounts=new Array(this.dataCharacterCounters.length/2)}getDecodeFinderCounters(){return this.decodeFinderCounters}getDataCharacterCounters(){return this.dataCharacterCounters}getOddRoundingErrors(){return this.oddRoundingErrors}getEvenRoundingErrors(){return this.evenRoundingErrors}getOddCounts(){return this.oddCounts}getEvenCounts(){return this.evenCounts}parseFinderValue(t,e){for(let a=0;a<e.length;a++)if(Ht.patternMatchVariance(t,e[a],Kt.MAX_INDIVIDUAL_VARIANCE)<Kt.MAX_AVG_VARIANCE)return a;throw new L}static count(t){return dt.sum(new Int32Array(t))}static increment(t,e){let a=0,n=e[0];for(let r=1;r<t.length;r++)e[r]>n&&(n=e[r],a=r);t[a]++}static decrement(t,e){let a=0,n=e[0];for(let r=1;r<t.length;r++)e[r]<n&&(n=e[r],a=r);t[a]--}static isFinderPattern(t){let e=t[0]+t[1],a=e+t[2]+t[3],n=e/a;if(n>=Kt.MIN_FINDER_PATTERN_RATIO&&n<=Kt.MAX_FINDER_PATTERN_RATIO){let r=Number.MAX_SAFE_INTEGER,s=Number.MIN_SAFE_INTEGER;for(let h of t)h>s&&(s=h),h<r&&(r=h);return s<10*r}return!1}}Kt.MAX_AVG_VARIANCE=.2,Kt.MAX_INDIVIDUAL_VARIANCE=.45,Kt.MIN_FINDER_PATTERN_RATIO=9.5/12,Kt.MAX_FINDER_PATTERN_RATIO=12.5/14;class Ye{constructor(t,e){this.value=t,this.checksumPortion=e}getValue(){return this.value}getChecksumPortion(){return this.checksumPortion}toString(){return this.value+"("+this.checksumPortion+")"}equals(t){if(!(t instanceof Ye))return!1;const e=t;return this.value===e.value&&this.checksumPortion===e.checksumPortion}hashCode(){return this.value^this.checksumPortion}}class E1{constructor(t,e,a,n,r){this.value=t,this.startEnd=e,this.value=t,this.startEnd=e,this.resultPoints=new Array,this.resultPoints.push(new W(a,r)),this.resultPoints.push(new W(n,r))}getValue(){return this.value}getStartEnd(){return this.startEnd}getResultPoints(){return this.resultPoints}equals(t){if(!(t instanceof E1))return!1;const e=t;return this.value===e.value}hashCode(){return this.value}}class me{constructor(){}static getRSSvalue(t,e,a){let n=0;for(let o of t)n+=o;let r=0,s=0,h=t.length;for(let o=0;o<h-1;o++){let c;for(c=1,s|=1<<o;c<t[o];c++,s&=~(1<<o)){let p=me.combins(n-c-1,h-o-2);if(a&&s===0&&n-c-(h-o-1)>=h-o-1&&(p-=me.combins(n-c-(h-o),h-o-2)),h-o-1>1){let x=0;for(let y=n-c-(h-o-2);y>e;y--)x+=me.combins(n-c-y-1,h-o-3);p-=x*(h-1-o)}else n-c>e&&p--;r+=p}n-=c}return r}static combins(t,e){let a,n;t-e>e?(n=e,a=t-e):(n=t-e,a=e);let r=1,s=1;for(let h=t;h>a;h--)r*=h,s<=n&&(r/=s,s++);for(;s<=n;)r/=s,s++;return r}}class rr{static buildBitArray(t){let e=t.length*2-1;t[t.length-1].getRightChar()==null&&(e-=1);let a=12*e,n=new et(a),r=0,h=t[0].getRightChar().getValue();for(let o=11;o>=0;--o)h&1<<o&&n.set(r),r++;for(let o=1;o<t.length;++o){let c=t[o],p=c.getLeftChar().getValue();for(let x=11;x>=0;--x)p&1<<x&&n.set(r),r++;if(c.getRightChar()!=null){let x=c.getRightChar().getValue();for(let y=11;y>=0;--y)x&1<<y&&n.set(r),r++}}return n}}class Ue{constructor(t,e){e?this.decodedInformation=null:(this.finished=t,this.decodedInformation=e)}getDecodedInformation(){return this.decodedInformation}isFinished(){return this.finished}}class W1{constructor(t){this.newPosition=t}getNewPosition(){return this.newPosition}}class re extends W1{constructor(t,e){super(t),this.value=e}getValue(){return this.value}isFNC1(){return this.value===re.FNC1}}re.FNC1="$";class Ze extends W1{constructor(t,e,a){super(t),a?(this.remaining=!0,this.remainingValue=this.remainingValue):(this.remaining=!1,this.remainingValue=0),this.newString=e}getNewString(){return this.newString}isRemaining(){return this.remaining}getRemainingValue(){return this.remainingValue}}class pe extends W1{constructor(t,e,a){if(super(t),e<0||e>10||a<0||a>10)throw new k;this.firstDigit=e,this.secondDigit=a}getFirstDigit(){return this.firstDigit}getSecondDigit(){return this.secondDigit}getValue(){return this.firstDigit*10+this.secondDigit}isFirstDigitFNC1(){return this.firstDigit===pe.FNC1}isSecondDigitFNC1(){return this.secondDigit===pe.FNC1}isAnyFNC1(){return this.firstDigit===pe.FNC1||this.secondDigit===pe.FNC1}}pe.FNC1=10;class Z{constructor(){}static parseFieldsInGeneralPurpose(t){if(!t)return null;if(t.length<2)throw new L;let e=t.substring(0,2);for(let r of Z.TWO_DIGIT_DATA_LENGTH)if(r[0]===e)return r[1]===Z.VARIABLE_LENGTH?Z.processVariableAI(2,r[2],t):Z.processFixedAI(2,r[1],t);if(t.length<3)throw new L;let a=t.substring(0,3);for(let r of Z.THREE_DIGIT_DATA_LENGTH)if(r[0]===a)return r[1]===Z.VARIABLE_LENGTH?Z.processVariableAI(3,r[2],t):Z.processFixedAI(3,r[1],t);for(let r of Z.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH)if(r[0]===a)return r[1]===Z.VARIABLE_LENGTH?Z.processVariableAI(4,r[2],t):Z.processFixedAI(4,r[1],t);if(t.length<4)throw new L;let n=t.substring(0,4);for(let r of Z.FOUR_DIGIT_DATA_LENGTH)if(r[0]===n)return r[1]===Z.VARIABLE_LENGTH?Z.processVariableAI(4,r[2],t):Z.processFixedAI(4,r[1],t);throw new L}static processFixedAI(t,e,a){if(a.length<t)throw new L;let n=a.substring(0,t);if(a.length<t+e)throw new L;let r=a.substring(t,t+e),s=a.substring(t+e),h="("+n+")"+r,o=Z.parseFieldsInGeneralPurpose(s);return o==null?h:h+o}static processVariableAI(t,e,a){let n=a.substring(0,t),r;a.length<t+e?r=a.length:r=t+e;let s=a.substring(t,r),h=a.substring(r),o="("+n+")"+s,c=Z.parseFieldsInGeneralPurpose(h);return c==null?o:o+c}}Z.VARIABLE_LENGTH=[],Z.TWO_DIGIT_DATA_LENGTH=[["00",18],["01",14],["02",14],["10",Z.VARIABLE_LENGTH,20],["11",6],["12",6],["13",6],["15",6],["17",6],["20",2],["21",Z.VARIABLE_LENGTH,20],["22",Z.VARIABLE_LENGTH,29],["30",Z.VARIABLE_LENGTH,8],["37",Z.VARIABLE_LENGTH,8],["90",Z.VARIABLE_LENGTH,30],["91",Z.VARIABLE_LENGTH,30],["92",Z.VARIABLE_LENGTH,30],["93",Z.VARIABLE_LENGTH,30],["94",Z.VARIABLE_LENGTH,30],["95",Z.VARIABLE_LENGTH,30],["96",Z.VARIABLE_LENGTH,30],["97",Z.VARIABLE_LENGTH,3],["98",Z.VARIABLE_LENGTH,30],["99",Z.VARIABLE_LENGTH,30]],Z.THREE_DIGIT_DATA_LENGTH=[["240",Z.VARIABLE_LENGTH,30],["241",Z.VARIABLE_LENGTH,30],["242",Z.VARIABLE_LENGTH,6],["250",Z.VARIABLE_LENGTH,30],["251",Z.VARIABLE_LENGTH,30],["253",Z.VARIABLE_LENGTH,17],["254",Z.VARIABLE_LENGTH,20],["400",Z.VARIABLE_LENGTH,30],["401",Z.VARIABLE_LENGTH,30],["402",17],["403",Z.VARIABLE_LENGTH,30],["410",13],["411",13],["412",13],["413",13],["414",13],["420",Z.VARIABLE_LENGTH,20],["421",Z.VARIABLE_LENGTH,15],["422",3],["423",Z.VARIABLE_LENGTH,15],["424",3],["425",3],["426",3]],Z.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH=[["310",6],["311",6],["312",6],["313",6],["314",6],["315",6],["316",6],["320",6],["321",6],["322",6],["323",6],["324",6],["325",6],["326",6],["327",6],["328",6],["329",6],["330",6],["331",6],["332",6],["333",6],["334",6],["335",6],["336",6],["340",6],["341",6],["342",6],["343",6],["344",6],["345",6],["346",6],["347",6],["348",6],["349",6],["350",6],["351",6],["352",6],["353",6],["354",6],["355",6],["356",6],["357",6],["360",6],["361",6],["362",6],["363",6],["364",6],["365",6],["366",6],["367",6],["368",6],["369",6],["390",Z.VARIABLE_LENGTH,15],["391",Z.VARIABLE_LENGTH,18],["392",Z.VARIABLE_LENGTH,15],["393",Z.VARIABLE_LENGTH,18],["703",Z.VARIABLE_LENGTH,30]],Z.FOUR_DIGIT_DATA_LENGTH=[["7001",13],["7002",Z.VARIABLE_LENGTH,30],["7003",10],["8001",14],["8002",Z.VARIABLE_LENGTH,20],["8003",Z.VARIABLE_LENGTH,30],["8004",Z.VARIABLE_LENGTH,30],["8005",6],["8006",18],["8007",Z.VARIABLE_LENGTH,30],["8008",Z.VARIABLE_LENGTH,12],["8018",18],["8020",Z.VARIABLE_LENGTH,25],["8100",6],["8101",10],["8102",2],["8110",Z.VARIABLE_LENGTH,70],["8200",Z.VARIABLE_LENGTH,70]];class je{constructor(t){this.buffer=new yt,this.information=t}decodeAllCodes(t,e){let a=e,n=null;do{let r=this.decodeGeneralPurposeField(a,n),s=Z.parseFieldsInGeneralPurpose(r.getNewString());if(s!=null&&t.append(s),r.isRemaining()?n=""+r.getRemainingValue():n=null,a===r.getNewPosition())break;a=r.getNewPosition()}while(!0);return t.toString()}isStillNumeric(t){if(t+7>this.information.getSize())return t+4<=this.information.getSize();for(let e=t;e<t+3;++e)if(this.information.get(e))return!0;return this.information.get(t+3)}decodeNumeric(t){if(t+7>this.information.getSize()){let r=this.extractNumericValueFromBitArray(t,4);return r===0?new pe(this.information.getSize(),pe.FNC1,pe.FNC1):new pe(this.information.getSize(),r-1,pe.FNC1)}let e=this.extractNumericValueFromBitArray(t,7),a=(e-8)/11,n=(e-8)%11;return new pe(t+7,a,n)}extractNumericValueFromBitArray(t,e){return je.extractNumericValueFromBitArray(this.information,t,e)}static extractNumericValueFromBitArray(t,e,a){let n=0;for(let r=0;r<a;++r)t.get(e+r)&&(n|=1<<a-r-1);return n}decodeGeneralPurposeField(t,e){this.buffer.setLengthToZero(),e!=null&&this.buffer.append(e),this.current.setPosition(t);let a=this.parseBlocks();return a!=null&&a.isRemaining()?new Ze(this.current.getPosition(),this.buffer.toString(),a.getRemainingValue()):new Ze(this.current.getPosition(),this.buffer.toString())}parseBlocks(){let t,e;do{let a=this.current.getPosition();if(this.current.isAlpha()?(e=this.parseAlphaBlock(),t=e.isFinished()):this.current.isIsoIec646()?(e=this.parseIsoIec646Block(),t=e.isFinished()):(e=this.parseNumericBlock(),t=e.isFinished()),!(a!==this.current.getPosition())&&!t)break}while(!t);return e.getDecodedInformation()}parseNumericBlock(){for(;this.isStillNumeric(this.current.getPosition());){let t=this.decodeNumeric(this.current.getPosition());if(this.current.setPosition(t.getNewPosition()),t.isFirstDigitFNC1()){let e;return t.isSecondDigitFNC1()?e=new Ze(this.current.getPosition(),this.buffer.toString()):e=new Ze(this.current.getPosition(),this.buffer.toString(),t.getSecondDigit()),new Ue(!0,e)}if(this.buffer.append(t.getFirstDigit()),t.isSecondDigitFNC1()){let e=new Ze(this.current.getPosition(),this.buffer.toString());return new Ue(!0,e)}this.buffer.append(t.getSecondDigit())}return this.isNumericToAlphaNumericLatch(this.current.getPosition())&&(this.current.setAlpha(),this.current.incrementPosition(4)),new Ue(!1)}parseIsoIec646Block(){for(;this.isStillIsoIec646(this.current.getPosition());){let t=this.decodeIsoIec646(this.current.getPosition());if(this.current.setPosition(t.getNewPosition()),t.isFNC1()){let e=new Ze(this.current.getPosition(),this.buffer.toString());return new Ue(!0,e)}this.buffer.append(t.getValue())}return this.isAlphaOr646ToNumericLatch(this.current.getPosition())?(this.current.incrementPosition(3),this.current.setNumeric()):this.isAlphaTo646ToAlphaLatch(this.current.getPosition())&&(this.current.getPosition()+5<this.information.getSize()?this.current.incrementPosition(5):this.current.setPosition(this.information.getSize()),this.current.setAlpha()),new Ue(!1)}parseAlphaBlock(){for(;this.isStillAlpha(this.current.getPosition());){let t=this.decodeAlphanumeric(this.current.getPosition());if(this.current.setPosition(t.getNewPosition()),t.isFNC1()){let e=new Ze(this.current.getPosition(),this.buffer.toString());return new Ue(!0,e)}this.buffer.append(t.getValue())}return this.isAlphaOr646ToNumericLatch(this.current.getPosition())?(this.current.incrementPosition(3),this.current.setNumeric()):this.isAlphaTo646ToAlphaLatch(this.current.getPosition())&&(this.current.getPosition()+5<this.information.getSize()?this.current.incrementPosition(5):this.current.setPosition(this.information.getSize()),this.current.setIsoIec646()),new Ue(!1)}isStillIsoIec646(t){if(t+5>this.information.getSize())return!1;let e=this.extractNumericValueFromBitArray(t,5);if(e>=5&&e<16)return!0;if(t+7>this.information.getSize())return!1;let a=this.extractNumericValueFromBitArray(t,7);if(a>=64&&a<116)return!0;if(t+8>this.information.getSize())return!1;let n=this.extractNumericValueFromBitArray(t,8);return n>=232&&n<253}decodeIsoIec646(t){let e=this.extractNumericValueFromBitArray(t,5);if(e===15)return new re(t+5,re.FNC1);if(e>=5&&e<15)return new re(t+5,"0"+(e-5));let a=this.extractNumericValueFromBitArray(t,7);if(a>=64&&a<90)return new re(t+7,""+(a+1));if(a>=90&&a<116)return new re(t+7,""+(a+7));let n=this.extractNumericValueFromBitArray(t,8),r;switch(n){case 232:r="!";break;case 233:r='"';break;case 234:r="%";break;case 235:r="&";break;case 236:r="'";break;case 237:r="(";break;case 238:r=")";break;case 239:r="*";break;case 240:r="+";break;case 241:r=",";break;case 242:r="-";break;case 243:r=".";break;case 244:r="/";break;case 245:r=":";break;case 246:r=";";break;case 247:r="<";break;case 248:r="=";break;case 249:r=">";break;case 250:r="?";break;case 251:r="_";break;case 252:r=" ";break;default:throw new k}return new re(t+8,r)}isStillAlpha(t){if(t+5>this.information.getSize())return!1;let e=this.extractNumericValueFromBitArray(t,5);if(e>=5&&e<16)return!0;if(t+6>this.information.getSize())return!1;let a=this.extractNumericValueFromBitArray(t,6);return a>=16&&a<63}decodeAlphanumeric(t){let e=this.extractNumericValueFromBitArray(t,5);if(e===15)return new re(t+5,re.FNC1);if(e>=5&&e<15)return new re(t+5,"0"+(e-5));let a=this.extractNumericValueFromBitArray(t,6);if(a>=32&&a<58)return new re(t+6,""+(a+33));let n;switch(a){case 58:n="*";break;case 59:n=",";break;case 60:n="-";break;case 61:n=".";break;case 62:n="/";break;default:throw new ye("Decoding invalid alphanumeric value: "+a)}return new re(t+6,n)}isAlphaTo646ToAlphaLatch(t){if(t+1>this.information.getSize())return!1;for(let e=0;e<5&&e+t<this.information.getSize();++e)if(e===2){if(!this.information.get(t+2))return!1}else if(this.information.get(t+e))return!1;return!0}isAlphaOr646ToNumericLatch(t){if(t+3>this.information.getSize())return!1;for(let e=t;e<t+3;++e)if(this.information.get(e))return!1;return!0}isNumericToAlphaNumericLatch(t){if(t+1>this.information.getSize())return!1;for(let e=0;e<4&&e+t<this.information.getSize();++e)if(this.information.get(t+e))return!1;return!0}}class z1{constructor(t){this.information=t,this.generalDecoder=new je(t)}getInformation(){return this.information}getGeneralDecoder(){return this.generalDecoder}}class ie extends z1{constructor(t){super(t)}encodeCompressedGtin(t,e){t.append("(01)");let a=t.length();t.append("9"),this.encodeCompressedGtinWithoutAI(t,e,a)}encodeCompressedGtinWithoutAI(t,e,a){for(let n=0;n<4;++n){let r=this.getGeneralDecoder().extractNumericValueFromBitArray(e+10*n,10);r/100===0&&t.append("0"),r/10===0&&t.append("0"),t.append(r)}ie.appendCheckDigit(t,a)}static appendCheckDigit(t,e){let a=0;for(let n=0;n<13;n++){let r=t.charAt(n+e).charCodeAt(0)-48;a+=n&1?r:3*r}a=10-a%10,a===10&&(a=0),t.append(a)}}ie.GTIN_SIZE=40;class Ke extends ie{constructor(t){super(t)}parseInformation(){let t=new yt;t.append("(01)");let e=t.length(),a=this.getGeneralDecoder().extractNumericValueFromBitArray(Ke.HEADER_SIZE,4);return t.append(a),this.encodeCompressedGtinWithoutAI(t,Ke.HEADER_SIZE+4,e),this.getGeneralDecoder().decodeAllCodes(t,Ke.HEADER_SIZE+44)}}Ke.HEADER_SIZE=4;class I1 extends z1{constructor(t){super(t)}parseInformation(){let t=new yt;return this.getGeneralDecoder().decodeAllCodes(t,I1.HEADER_SIZE)}}I1.HEADER_SIZE=5;class b1 extends ie{constructor(t){super(t)}encodeCompressedWeight(t,e,a){let n=this.getGeneralDecoder().extractNumericValueFromBitArray(e,a);this.addWeightCode(t,n);let r=this.checkWeight(n),s=1e5;for(let h=0;h<5;++h)r/s===0&&t.append("0"),s/=10;t.append(r)}}class we extends b1{constructor(t){super(t)}parseInformation(){if(this.getInformation().getSize()!=we.HEADER_SIZE+b1.GTIN_SIZE+we.WEIGHT_SIZE)throw new L;let t=new yt;return this.encodeCompressedGtin(t,we.HEADER_SIZE),this.encodeCompressedWeight(t,we.HEADER_SIZE+b1.GTIN_SIZE,we.WEIGHT_SIZE),t.toString()}}we.HEADER_SIZE=5,we.WEIGHT_SIZE=15;class ir extends we{constructor(t){super(t)}addWeightCode(t,e){t.append("(3103)")}checkWeight(t){return t}}class sr extends we{constructor(t){super(t)}addWeightCode(t,e){e<1e4?t.append("(3202)"):t.append("(3203)")}checkWeight(t){return t<1e4?t:t-1e4}}class Ae extends ie{constructor(t){super(t)}parseInformation(){if(this.getInformation().getSize()<Ae.HEADER_SIZE+ie.GTIN_SIZE)throw new L;let t=new yt;this.encodeCompressedGtin(t,Ae.HEADER_SIZE);let e=this.getGeneralDecoder().extractNumericValueFromBitArray(Ae.HEADER_SIZE+ie.GTIN_SIZE,Ae.LAST_DIGIT_SIZE);t.append("(392"),t.append(e),t.append(")");let a=this.getGeneralDecoder().decodeGeneralPurposeField(Ae.HEADER_SIZE+ie.GTIN_SIZE+Ae.LAST_DIGIT_SIZE,null);return t.append(a.getNewString()),t.toString()}}Ae.HEADER_SIZE=8,Ae.LAST_DIGIT_SIZE=2;class ee extends ie{constructor(t){super(t)}parseInformation(){if(this.getInformation().getSize()<ee.HEADER_SIZE+ie.GTIN_SIZE)throw new L;let t=new yt;this.encodeCompressedGtin(t,ee.HEADER_SIZE);let e=this.getGeneralDecoder().extractNumericValueFromBitArray(ee.HEADER_SIZE+ie.GTIN_SIZE,ee.LAST_DIGIT_SIZE);t.append("(393"),t.append(e),t.append(")");let a=this.getGeneralDecoder().extractNumericValueFromBitArray(ee.HEADER_SIZE+ie.GTIN_SIZE+ee.LAST_DIGIT_SIZE,ee.FIRST_THREE_DIGITS_SIZE);a/100==0&&t.append("0"),a/10==0&&t.append("0"),t.append(a);let n=this.getGeneralDecoder().decodeGeneralPurposeField(ee.HEADER_SIZE+ie.GTIN_SIZE+ee.LAST_DIGIT_SIZE+ee.FIRST_THREE_DIGITS_SIZE,null);return t.append(n.getNewString()),t.toString()}}ee.HEADER_SIZE=8,ee.LAST_DIGIT_SIZE=2,ee.FIRST_THREE_DIGITS_SIZE=10;class Nt extends b1{constructor(t,e,a){super(t),this.dateCode=a,this.firstAIdigits=e}parseInformation(){if(this.getInformation().getSize()!=Nt.HEADER_SIZE+Nt.GTIN_SIZE+Nt.WEIGHT_SIZE+Nt.DATE_SIZE)throw new L;let t=new yt;return this.encodeCompressedGtin(t,Nt.HEADER_SIZE),this.encodeCompressedWeight(t,Nt.HEADER_SIZE+Nt.GTIN_SIZE,Nt.WEIGHT_SIZE),this.encodeCompressedDate(t,Nt.HEADER_SIZE+Nt.GTIN_SIZE+Nt.WEIGHT_SIZE),t.toString()}encodeCompressedDate(t,e){let a=this.getGeneralDecoder().extractNumericValueFromBitArray(e,Nt.DATE_SIZE);if(a==38400)return;t.append("("),t.append(this.dateCode),t.append(")");let n=a%32;a/=32;let r=a%12+1;a/=12;let s=a;s/10==0&&t.append("0"),t.append(s),r/10==0&&t.append("0"),t.append(r),n/10==0&&t.append("0"),t.append(n)}addWeightCode(t,e){t.append("("),t.append(this.firstAIdigits),t.append(e/1e5),t.append(")")}checkWeight(t){return t%1e5}}Nt.HEADER_SIZE=8,Nt.WEIGHT_SIZE=20,Nt.DATE_SIZE=16;function v2(f){try{if(f.get(1))return new Ke(f);if(!f.get(2))return new I1(f);switch(je.extractNumericValueFromBitArray(f,1,4)){case 4:return new ir(f);case 5:return new sr(f)}switch(je.extractNumericValueFromBitArray(f,1,5)){case 12:return new Ae(f);case 13:return new ee(f)}switch(je.extractNumericValueFromBitArray(f,1,7)){case 56:return new Nt(f,"310","11");case 57:return new Nt(f,"320","11");case 58:return new Nt(f,"310","13");case 59:return new Nt(f,"320","13");case 60:return new Nt(f,"310","15");case 61:return new Nt(f,"320","15");case 62:return new Nt(f,"310","17");case 63:return new Nt(f,"320","17")}}catch(t){throw console.log(t),new ye("unknown decoder: "+f)}}class Oe{constructor(t,e,a,n){this.leftchar=t,this.rightchar=e,this.finderpattern=a,this.maybeLast=n}mayBeLast(){return this.maybeLast}getLeftChar(){return this.leftchar}getRightChar(){return this.rightchar}getFinderPattern(){return this.finderpattern}mustBeLast(){return this.rightchar==null}toString(){return"[ "+this.leftchar+", "+this.rightchar+" : "+(this.finderpattern==null?"null":this.finderpattern.getValue())+" ]"}static equals(t,e){return t instanceof Oe?Oe.equalsOrNull(t.leftchar,e.leftchar)&&Oe.equalsOrNull(t.rightchar,e.rightchar)&&Oe.equalsOrNull(t.finderpattern,e.finderpattern):!1}static equalsOrNull(t,e){return t===null?e===null:Oe.equals(t,e)}hashCode(){return this.leftchar.getValue()^this.rightchar.getValue()^this.finderpattern.getValue()}}class X1{constructor(t,e,a){this.pairs=t,this.rowNumber=e,this.wasReversed=a}getPairs(){return this.pairs}getRowNumber(){return this.rowNumber}isReversed(){return this.wasReversed}isEquivalent(t){return this.checkEqualitity(this,t)}toString(){return"{ "+this.pairs+" }"}equals(t,e){return t instanceof X1?this.checkEqualitity(t,e)&&t.wasReversed===e.wasReversed:!1}checkEqualitity(t,e){if(!t||!e)return;let a;return t.forEach((n,r)=>{e.forEach(s=>{n.getLeftChar().getValue()===s.getLeftChar().getValue()&&n.getRightChar().getValue()===s.getRightChar().getValue()&&n.getFinderPatter().getValue()===s.getFinderPatter().getValue()&&(a=!0)})}),a}}class B extends Kt{constructor(t){super(...arguments),this.pairs=new Array(B.MAX_PAIRS),this.rows=new Array,this.startEnd=[2],this.verbose=t===!0}decodeRow(t,e,a){this.pairs.length=0,this.startFromEven=!1;try{return B.constructResult(this.decodeRow2pairs(t,e))}catch(n){this.verbose&&console.log(n)}return this.pairs.length=0,this.startFromEven=!0,B.constructResult(this.decodeRow2pairs(t,e))}reset(){this.pairs.length=0,this.rows.length=0}decodeRow2pairs(t,e){let a=!1;for(;!a;)try{this.pairs.push(this.retrieveNextPair(e,this.pairs,t))}catch(r){if(r instanceof L){if(!this.pairs.length)throw new L;a=!0}}if(this.checkChecksum())return this.pairs;let n;if(this.rows.length?n=!0:n=!1,this.storeRow(t,!1),n){let r=this.checkRowsBoolean(!1);if(r!=null||(r=this.checkRowsBoolean(!0),r!=null))return r}throw new L}checkRowsBoolean(t){if(this.rows.length>25)return this.rows.length=0,null;this.pairs.length=0,t&&(this.rows=this.rows.reverse());let e=null;try{e=this.checkRows(new Array,0)}catch(a){this.verbose&&console.log(a)}return t&&(this.rows=this.rows.reverse()),e}checkRows(t,e){for(let a=e;a<this.rows.length;a++){let n=this.rows[a];this.pairs.length=0;for(let s of t)this.pairs.push(s.getPairs());if(this.pairs.push(n.getPairs()),!B.isValidSequence(this.pairs))continue;if(this.checkChecksum())return this.pairs;let r=new Array(t);r.push(n);try{return this.checkRows(r,a+1)}catch(s){this.verbose&&console.log(s)}}throw new L}static isValidSequence(t){for(let e of B.FINDER_PATTERN_SEQUENCES){if(t.length>e.length)continue;let a=!0;for(let n=0;n<t.length;n++)if(t[n].getFinderPattern().getValue()!=e[n]){a=!1;break}if(a)return!0}return!1}storeRow(t,e){let a=0,n=!1,r=!1;for(;a<this.rows.length;){let s=this.rows[a];if(s.getRowNumber()>t){r=s.isEquivalent(this.pairs);break}n=s.isEquivalent(this.pairs),a++}r||n||B.isPartialRow(this.pairs,this.rows)||(this.rows.push(a,new X1(this.pairs,t,e)),this.removePartialRows(this.pairs,this.rows))}removePartialRows(t,e){for(let a of e)if(a.getPairs().length!==t.length){for(let n of a.getPairs())for(let r of t)if(Oe.equals(n,r))break}}static isPartialRow(t,e){for(let a of e){let n=!0;for(let r of t){let s=!1;for(let h of a.getPairs())if(r.equals(h)){s=!0;break}if(!s){n=!1;break}}if(n)return!0}return!1}getRows(){return this.rows}static constructResult(t){let e=rr.buildBitArray(t),n=v2(e).parseInformation(),r=t[0].getFinderPattern().getResultPoints(),s=t[t.length-1].getFinderPattern().getResultPoints(),h=[r[0],r[1],s[0],s[1]];return new $t(n,null,null,h,Q.RSS_EXPANDED,null)}checkChecksum(){let t=this.pairs.get(0),e=t.getLeftChar(),a=t.getRightChar();if(a==null)return!1;let n=a.getChecksumPortion(),r=2;for(let h=1;h<this.pairs.size();++h){let o=this.pairs.get(h);n+=o.getLeftChar().getChecksumPortion(),r++;let c=o.getRightChar();c!=null&&(n+=c.getChecksumPortion(),r++)}return n%=211,211*(r-4)+n==e.getValue()}static getNextSecondBar(t,e){let a;return t.get(e)?(a=t.getNextUnset(e),a=t.getNextSet(a)):(a=t.getNextSet(e),a=t.getNextUnset(a)),a}retrieveNextPair(t,e,a){let n=e.length%2==0;this.startFromEven&&(n=!n);let r,s=!0,h=-1;do this.findNextPair(t,e,h),r=this.parseFoundFinderPattern(t,a,n),r==null?h=B.getNextSecondBar(t,this.startEnd[0]):s=!1;while(s);let o=this.decodeDataCharacter(t,r,n,!0);if(!this.isEmptyPair(e)&&e[e.length-1].mustBeLast())throw new L;let c;try{c=this.decodeDataCharacter(t,r,n,!1)}catch(p){c=null,this.verbose&&console.log(p)}return new Oe(o,c,r,!0)}isEmptyPair(t){return t.length===0}findNextPair(t,e,a){let n=this.getDecodeFinderCounters();n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=t.getSize(),s;a>=0?s=a:this.isEmptyPair(e)?s=0:s=e[e.length-1].getFinderPattern().getStartEnd()[1];let h=e.length%2!=0;this.startFromEven&&(h=!h);let o=!1;for(;s<r&&(o=!t.get(s),!!o);)s++;let c=0,p=s;for(let x=s;x<r;x++)if(t.get(x)!=o)n[c]++;else{if(c==3){if(h&&B.reverseCounters(n),B.isFinderPattern(n)){this.startEnd[0]=p,this.startEnd[1]=x;return}h&&B.reverseCounters(n),p+=n[0]+n[1],n[0]=n[2],n[1]=n[3],n[2]=0,n[3]=0,c--}else c++;n[c]=1,o=!o}throw new L}static reverseCounters(t){let e=t.length;for(let a=0;a<e/2;++a){let n=t[a];t[a]=t[e-a-1],t[e-a-1]=n}}parseFoundFinderPattern(t,e,a){let n,r,s;if(a){let c=this.startEnd[0]-1;for(;c>=0&&!t.get(c);)c--;c++,n=this.startEnd[0]-c,r=c,s=this.startEnd[1]}else r=this.startEnd[0],s=t.getNextUnset(this.startEnd[1]+1),n=s-this.startEnd[1];let h=this.getDecodeFinderCounters();q.arraycopy(h,0,h,1,h.length-1),h[0]=n;let o;try{o=this.parseFinderValue(h,B.FINDER_PATTERNS)}catch{return null}return new E1(o,[r,s],r,s,e)}decodeDataCharacter(t,e,a,n){let r=this.getDataCharacterCounters();for(let Ct=0;Ct<r.length;Ct++)r[Ct]=0;if(n)B.recordPatternInReverse(t,e.getStartEnd()[0],r);else{B.recordPattern(t,e.getStartEnd()[1],r);for(let Ct=0,jt=r.length-1;Ct<jt;Ct++,jt--){let ce=r[Ct];r[Ct]=r[jt],r[jt]=ce}}let s=17,h=dt.sum(new Int32Array(r))/s,o=(e.getStartEnd()[1]-e.getStartEnd()[0])/15;if(Math.abs(h-o)/o>.3)throw new L;let c=this.getOddCounts(),p=this.getEvenCounts(),x=this.getOddRoundingErrors(),y=this.getEvenRoundingErrors();for(let Ct=0;Ct<r.length;Ct++){let jt=1*r[Ct]/h,ce=jt+.5;if(ce<1){if(jt<.3)throw new L;ce=1}else if(ce>8){if(jt>8.7)throw new L;ce=8}let e1=Ct/2;Ct&1?(p[e1]=ce,y[e1]=jt-ce):(c[e1]=ce,x[e1]=jt-ce)}this.adjustOddEvenCounts(s);let A=4*e.getValue()+(a?0:2)+(n?0:1)-1,E=0,I=0;for(let Ct=c.length-1;Ct>=0;Ct--){if(B.isNotA1left(e,a,n)){let jt=B.WEIGHTS[A][2*Ct];I+=c[Ct]*jt}E+=c[Ct]}let S=0;for(let Ct=p.length-1;Ct>=0;Ct--)if(B.isNotA1left(e,a,n)){let jt=B.WEIGHTS[A][2*Ct+1];S+=p[Ct]*jt}let O=I+S;if(E&1||E>13||E<4)throw new L;let H=(13-E)/2,F=B.SYMBOL_WIDEST[H],P=9-F,ht=me.getRSSvalue(c,F,!0),at=me.getRSSvalue(p,P,!1),he=B.EVEN_TOTAL_SUBSET[H],ve=B.GSUM[H],oe=ht*he+at+ve;return new Ye(oe,O)}static isNotA1left(t,e,a){return!(t.getValue()==0&&e&&a)}adjustOddEvenCounts(t){let e=dt.sum(new Int32Array(this.getOddCounts())),a=dt.sum(new Int32Array(this.getEvenCounts())),n=!1,r=!1;e>13?r=!0:e<4&&(n=!0);let s=!1,h=!1;a>13?h=!0:a<4&&(s=!0);let o=e+a-t,c=(e&1)==1,p=(a&1)==0;if(o==1)if(c){if(p)throw new L;r=!0}else{if(!p)throw new L;h=!0}else if(o==-1)if(c){if(p)throw new L;n=!0}else{if(!p)throw new L;s=!0}else if(o==0){if(c){if(!p)throw new L;e<a?(n=!0,h=!0):(r=!0,s=!0)}else if(p)throw new L}else throw new L;if(n){if(r)throw new L;B.increment(this.getOddCounts(),this.getOddRoundingErrors())}if(r&&B.decrement(this.getOddCounts(),this.getOddRoundingErrors()),s){if(h)throw new L;B.increment(this.getEvenCounts(),this.getOddRoundingErrors())}h&&B.decrement(this.getEvenCounts(),this.getEvenRoundingErrors())}}B.SYMBOL_WIDEST=[7,5,4,3,1],B.EVEN_TOTAL_SUBSET=[4,20,52,104,204],B.GSUM=[0,348,1388,2948,3988],B.FINDER_PATTERNS=[Int32Array.from([1,8,4,1]),Int32Array.from([3,6,4,1]),Int32Array.from([3,4,6,1]),Int32Array.from([3,2,8,1]),Int32Array.from([2,6,5,1]),Int32Array.from([2,2,9,1])],B.WEIGHTS=[[1,3,9,27,81,32,96,77],[20,60,180,118,143,7,21,63],[189,145,13,39,117,140,209,205],[193,157,49,147,19,57,171,91],[62,186,136,197,169,85,44,132],[185,133,188,142,4,12,36,108],[113,128,173,97,80,29,87,50],[150,28,84,41,123,158,52,156],[46,138,203,187,139,206,196,166],[76,17,51,153,37,111,122,155],[43,129,176,106,107,110,119,146],[16,48,144,10,30,90,59,177],[109,116,137,200,178,112,125,164],[70,210,208,202,184,130,179,115],[134,191,151,31,93,68,204,190],[148,22,66,198,172,94,71,2],[6,18,54,162,64,192,154,40],[120,149,25,75,14,42,126,167],[79,26,78,23,69,207,199,175],[103,98,83,38,114,131,182,124],[161,61,183,127,170,88,53,159],[55,165,73,8,24,72,5,15],[45,135,194,160,58,174,100,89]],B.FINDER_PAT_A=0,B.FINDER_PAT_B=1,B.FINDER_PAT_C=2,B.FINDER_PAT_D=3,B.FINDER_PAT_E=4,B.FINDER_PAT_F=5,B.FINDER_PATTERN_SEQUENCES=[[B.FINDER_PAT_A,B.FINDER_PAT_A],[B.FINDER_PAT_A,B.FINDER_PAT_B,B.FINDER_PAT_B],[B.FINDER_PAT_A,B.FINDER_PAT_C,B.FINDER_PAT_B,B.FINDER_PAT_D],[B.FINDER_PAT_A,B.FINDER_PAT_E,B.FINDER_PAT_B,B.FINDER_PAT_D,B.FINDER_PAT_C],[B.FINDER_PAT_A,B.FINDER_PAT_E,B.FINDER_PAT_B,B.FINDER_PAT_D,B.FINDER_PAT_D,B.FINDER_PAT_F],[B.FINDER_PAT_A,B.FINDER_PAT_E,B.FINDER_PAT_B,B.FINDER_PAT_D,B.FINDER_PAT_E,B.FINDER_PAT_F,B.FINDER_PAT_F],[B.FINDER_PAT_A,B.FINDER_PAT_A,B.FINDER_PAT_B,B.FINDER_PAT_B,B.FINDER_PAT_C,B.FINDER_PAT_C,B.FINDER_PAT_D,B.FINDER_PAT_D],[B.FINDER_PAT_A,B.FINDER_PAT_A,B.FINDER_PAT_B,B.FINDER_PAT_B,B.FINDER_PAT_C,B.FINDER_PAT_C,B.FINDER_PAT_D,B.FINDER_PAT_E,B.FINDER_PAT_E],[B.FINDER_PAT_A,B.FINDER_PAT_A,B.FINDER_PAT_B,B.FINDER_PAT_B,B.FINDER_PAT_C,B.FINDER_PAT_C,B.FINDER_PAT_D,B.FINDER_PAT_E,B.FINDER_PAT_F,B.FINDER_PAT_F],[B.FINDER_PAT_A,B.FINDER_PAT_A,B.FINDER_PAT_B,B.FINDER_PAT_B,B.FINDER_PAT_C,B.FINDER_PAT_D,B.FINDER_PAT_D,B.FINDER_PAT_E,B.FINDER_PAT_E,B.FINDER_PAT_F,B.FINDER_PAT_F]],B.MAX_PAIRS=11;class hr extends Ye{constructor(t,e,a){super(t,e),this.count=0,this.finderPattern=a}getFinderPattern(){return this.finderPattern}getCount(){return this.count}incrementCount(){this.count++}}class _t extends Kt{constructor(){super(...arguments),this.possibleLeftPairs=[],this.possibleRightPairs=[]}decodeRow(t,e,a){const n=this.decodePair(e,!1,t,a);_t.addOrTally(this.possibleLeftPairs,n),e.reverse();let r=this.decodePair(e,!0,t,a);_t.addOrTally(this.possibleRightPairs,r),e.reverse();for(let s of this.possibleLeftPairs)if(s.getCount()>1){for(let h of this.possibleRightPairs)if(h.getCount()>1&&_t.checkChecksum(s,h))return _t.constructResult(s,h)}throw new L}static addOrTally(t,e){if(e==null)return;let a=!1;for(let n of t)if(n.getValue()===e.getValue()){n.incrementCount(),a=!0;break}a||t.push(e)}reset(){this.possibleLeftPairs.length=0,this.possibleRightPairs.length=0}static constructResult(t,e){let a=4537077*t.getValue()+e.getValue(),n=new String(a).toString(),r=new yt;for(let c=13-n.length;c>0;c--)r.append("0");r.append(n);let s=0;for(let c=0;c<13;c++){let p=r.charAt(c).charCodeAt(0)-48;s+=c&1?p:3*p}s=10-s%10,s===10&&(s=0),r.append(s.toString());let h=t.getFinderPattern().getResultPoints(),o=e.getFinderPattern().getResultPoints();return new $t(r.toString(),null,0,[h[0],h[1],o[0],o[1]],Q.RSS_14,new Date().getTime())}static checkChecksum(t,e){let a=(t.getChecksumPortion()+16*e.getChecksumPortion())%79,n=9*t.getFinderPattern().getValue()+e.getFinderPattern().getValue();return n>72&&n--,n>8&&n--,a===n}decodePair(t,e,a,n){try{let r=this.findFinderPattern(t,e),s=this.parseFoundFinderPattern(t,a,e,r),h=n==null?null:n.get(ut.NEED_RESULT_POINT_CALLBACK);if(h!=null){let p=(r[0]+r[1])/2;e&&(p=t.getSize()-1-p),h.foundPossibleResultPoint(new W(p,a))}let o=this.decodeDataCharacter(t,s,!0),c=this.decodeDataCharacter(t,s,!1);return new hr(1597*o.getValue()+c.getValue(),o.getChecksumPortion()+4*c.getChecksumPortion(),s)}catch{return null}}decodeDataCharacter(t,e,a){let n=this.getDataCharacterCounters();for(let S=0;S<n.length;S++)n[S]=0;if(a)Ht.recordPatternInReverse(t,e.getStartEnd()[0],n);else{Ht.recordPattern(t,e.getStartEnd()[1]+1,n);for(let S=0,O=n.length-1;S<O;S++,O--){let H=n[S];n[S]=n[O],n[O]=H}}let r=a?16:15,s=dt.sum(new Int32Array(n))/r,h=this.getOddCounts(),o=this.getEvenCounts(),c=this.getOddRoundingErrors(),p=this.getEvenRoundingErrors();for(let S=0;S<n.length;S++){let O=n[S]/s,H=Math.floor(O+.5);H<1?H=1:H>8&&(H=8);let F=Math.floor(S/2);S&1?(o[F]=H,p[F]=O-H):(h[F]=H,c[F]=O-H)}this.adjustOddEvenCounts(a,r);let x=0,y=0;for(let S=h.length-1;S>=0;S--)y*=9,y+=h[S],x+=h[S];let A=0,E=0;for(let S=o.length-1;S>=0;S--)A*=9,A+=o[S],E+=o[S];let I=y+3*A;if(a){if(x&1||x>12||x<4)throw new L;let S=(12-x)/2,O=_t.OUTSIDE_ODD_WIDEST[S],H=9-O,F=me.getRSSvalue(h,O,!1),P=me.getRSSvalue(o,H,!0),ht=_t.OUTSIDE_EVEN_TOTAL_SUBSET[S],at=_t.OUTSIDE_GSUM[S];return new Ye(F*ht+P+at,I)}else{if(E&1||E>10||E<4)throw new L;let S=(10-E)/2,O=_t.INSIDE_ODD_WIDEST[S],H=9-O,F=me.getRSSvalue(h,O,!0),P=me.getRSSvalue(o,H,!1),ht=_t.INSIDE_ODD_TOTAL_SUBSET[S],at=_t.INSIDE_GSUM[S];return new Ye(P*ht+F+at,I)}}findFinderPattern(t,e){let a=this.getDecodeFinderCounters();a[0]=0,a[1]=0,a[2]=0,a[3]=0;let n=t.getSize(),r=!1,s=0;for(;s<n&&(r=!t.get(s),e!==r);)s++;let h=0,o=s;for(let c=s;c<n;c++)if(t.get(c)!==r)a[h]++;else{if(h===3){if(Kt.isFinderPattern(a))return[o,c];o+=a[0]+a[1],a[0]=a[2],a[1]=a[3],a[2]=0,a[3]=0,h--}else h++;a[h]=1,r=!r}throw new L}parseFoundFinderPattern(t,e,a,n){let r=t.get(n[0]),s=n[0]-1;for(;s>=0&&r!==t.get(s);)s--;s++;const h=n[0]-s,o=this.getDecodeFinderCounters(),c=new Int32Array(o.length);q.arraycopy(o,0,c,1,o.length-1),c[0]=h;const p=this.parseFinderValue(c,_t.FINDER_PATTERNS);let x=s,y=n[1];return a&&(x=t.getSize()-1-x,y=t.getSize()-1-y),new E1(p,[s,n[1]],x,y,e)}adjustOddEvenCounts(t,e){let a=dt.sum(new Int32Array(this.getOddCounts())),n=dt.sum(new Int32Array(this.getEvenCounts())),r=!1,s=!1,h=!1,o=!1;t?(a>12?s=!0:a<4&&(r=!0),n>12?o=!0:n<4&&(h=!0)):(a>11?s=!0:a<5&&(r=!0),n>10?o=!0:n<4&&(h=!0));let c=a+n-e,p=(a&1)===(t?1:0),x=(n&1)===1;if(c===1)if(p){if(x)throw new L;s=!0}else{if(!x)throw new L;o=!0}else if(c===-1)if(p){if(x)throw new L;r=!0}else{if(!x)throw new L;h=!0}else if(c===0){if(p){if(!x)throw new L;a<n?(r=!0,o=!0):(s=!0,h=!0)}else if(x)throw new L}else throw new L;if(r){if(s)throw new L;Kt.increment(this.getOddCounts(),this.getOddRoundingErrors())}if(s&&Kt.decrement(this.getOddCounts(),this.getOddRoundingErrors()),h){if(o)throw new L;Kt.increment(this.getEvenCounts(),this.getOddRoundingErrors())}o&&Kt.decrement(this.getEvenCounts(),this.getEvenRoundingErrors())}}_t.OUTSIDE_EVEN_TOTAL_SUBSET=[1,10,34,70,126],_t.INSIDE_ODD_TOTAL_SUBSET=[4,20,48,81],_t.OUTSIDE_GSUM=[0,161,961,2015,2715],_t.INSIDE_GSUM=[0,336,1036,1516],_t.OUTSIDE_ODD_WIDEST=[8,6,4,3,1],_t.INSIDE_ODD_WIDEST=[2,4,6,8],_t.FINDER_PATTERNS=[Int32Array.from([3,8,2,1]),Int32Array.from([3,5,5,1]),Int32Array.from([3,3,7,1]),Int32Array.from([3,1,9,1]),Int32Array.from([2,7,4,1]),Int32Array.from([2,5,6,1]),Int32Array.from([2,3,8,1]),Int32Array.from([1,5,7,1]),Int32Array.from([1,3,9,1])];class Qe extends Ht{constructor(t,e){super(),this.readers=[],this.verbose=e===!0;const a=t?t.get(ut.POSSIBLE_FORMATS):null,n=t&&t.get(ut.ASSUME_CODE_39_CHECK_DIGIT)!==void 0;a?((a.includes(Q.EAN_13)||a.includes(Q.UPC_A)||a.includes(Q.EAN_8)||a.includes(Q.UPC_E))&&this.readers.push(new G1(t)),a.includes(Q.CODE_39)&&this.readers.push(new Ft(n)),a.includes(Q.CODE_128)&&this.readers.push(new U),a.includes(Q.ITF)&&this.readers.push(new wt),a.includes(Q.RSS_14)&&this.readers.push(new _t),a.includes(Q.RSS_EXPANDED)&&this.readers.push(new B(this.verbose))):(this.readers.push(new G1(t)),this.readers.push(new Ft),this.readers.push(new G1(t)),this.readers.push(new U),this.readers.push(new wt),this.readers.push(new _t),this.readers.push(new B(this.verbose)))}decodeRow(t,e,a){for(let n=0;n<this.readers.length;n++)try{return this.readers[n].decodeRow(t,e,a)}catch{}throw new L}reset(){this.readers.forEach(t=>t.reset())}}class or extends Ve{constructor(t=500,e){super(new Qe(e),t,e)}}class Mt{constructor(t,e,a){this.ecCodewords=t,this.ecBlocks=[e],a&&this.ecBlocks.push(a)}getECCodewords(){return this.ecCodewords}getECBlocks(){return this.ecBlocks}}class xt{constructor(t,e){this.count=t,this.dataCodewords=e}getCount(){return this.count}getDataCodewords(){return this.dataCodewords}}class ot{constructor(t,e,a,n,r,s){this.versionNumber=t,this.symbolSizeRows=e,this.symbolSizeColumns=a,this.dataRegionSizeRows=n,this.dataRegionSizeColumns=r,this.ecBlocks=s;let h=0;const o=s.getECCodewords(),c=s.getECBlocks();for(let p of c)h+=p.getCount()*(p.getDataCodewords()+o);this.totalCodewords=h}getVersionNumber(){return this.versionNumber}getSymbolSizeRows(){return this.symbolSizeRows}getSymbolSizeColumns(){return this.symbolSizeColumns}getDataRegionSizeRows(){return this.dataRegionSizeRows}getDataRegionSizeColumns(){return this.dataRegionSizeColumns}getTotalCodewords(){return this.totalCodewords}getECBlocks(){return this.ecBlocks}static getVersionForDimensions(t,e){if(t&1||e&1)throw new k;for(let a of ot.VERSIONS)if(a.symbolSizeRows===t&&a.symbolSizeColumns===e)return a;throw new k}toString(){return""+this.versionNumber}static buildVersions(){return[new ot(1,10,10,8,8,new Mt(5,new xt(1,3))),new ot(2,12,12,10,10,new Mt(7,new xt(1,5))),new ot(3,14,14,12,12,new Mt(10,new xt(1,8))),new ot(4,16,16,14,14,new Mt(12,new xt(1,12))),new ot(5,18,18,16,16,new Mt(14,new xt(1,18))),new ot(6,20,20,18,18,new Mt(18,new xt(1,22))),new ot(7,22,22,20,20,new Mt(20,new xt(1,30))),new ot(8,24,24,22,22,new Mt(24,new xt(1,36))),new ot(9,26,26,24,24,new Mt(28,new xt(1,44))),new ot(10,32,32,14,14,new Mt(36,new xt(1,62))),new ot(11,36,36,16,16,new Mt(42,new xt(1,86))),new ot(12,40,40,18,18,new Mt(48,new xt(1,114))),new ot(13,44,44,20,20,new Mt(56,new xt(1,144))),new ot(14,48,48,22,22,new Mt(68,new xt(1,174))),new ot(15,52,52,24,24,new Mt(42,new xt(2,102))),new ot(16,64,64,14,14,new Mt(56,new xt(2,140))),new ot(17,72,72,16,16,new Mt(36,new xt(4,92))),new ot(18,80,80,18,18,new Mt(48,new xt(4,114))),new ot(19,88,88,20,20,new Mt(56,new xt(4,144))),new ot(20,96,96,22,22,new Mt(68,new xt(4,174))),new ot(21,104,104,24,24,new Mt(56,new xt(6,136))),new ot(22,120,120,18,18,new Mt(68,new xt(6,175))),new ot(23,132,132,20,20,new Mt(62,new xt(8,163))),new ot(24,144,144,22,22,new Mt(62,new xt(8,156),new xt(2,155))),new ot(25,8,18,6,16,new Mt(7,new xt(1,5))),new ot(26,8,32,6,14,new Mt(11,new xt(1,10))),new ot(27,12,26,10,24,new Mt(14,new xt(1,16))),new ot(28,12,36,10,16,new Mt(18,new xt(1,22))),new ot(29,16,36,14,16,new Mt(24,new xt(1,32))),new ot(30,16,48,14,22,new Mt(28,new xt(1,49)))]}}ot.VERSIONS=ot.buildVersions();class q1{constructor(t){const e=t.getHeight();if(e<8||e>144||e&1)throw new k;this.version=q1.readVersion(t),this.mappingBitMatrix=this.extractDataRegion(t),this.readMappingMatrix=new Ut(this.mappingBitMatrix.getWidth(),this.mappingBitMatrix.getHeight())}getVersion(){return this.version}static readVersion(t){const e=t.getHeight(),a=t.getWidth();return ot.getVersionForDimensions(e,a)}readCodewords(){const t=new Int8Array(this.version.getTotalCodewords());let e=0,a=4,n=0;const r=this.mappingBitMatrix.getHeight(),s=this.mappingBitMatrix.getWidth();let h=!1,o=!1,c=!1,p=!1;do if(a===r&&n===0&&!h)t[e++]=this.readCorner1(r,s)&255,a-=2,n+=2,h=!0;else if(a===r-2&&n===0&&s&3&&!o)t[e++]=this.readCorner2(r,s)&255,a-=2,n+=2,o=!0;else if(a===r+4&&n===2&&!(s&7)&&!c)t[e++]=this.readCorner3(r,s)&255,a-=2,n+=2,c=!0;else if(a===r-2&&n===0&&(s&7)===4&&!p)t[e++]=this.readCorner4(r,s)&255,a-=2,n+=2,p=!0;else{do a<r&&n>=0&&!this.readMappingMatrix.get(n,a)&&(t[e++]=this.readUtah(a,n,r,s)&255),a-=2,n+=2;while(a>=0&&n<s);a+=1,n+=3;do a>=0&&n<s&&!this.readMappingMatrix.get(n,a)&&(t[e++]=this.readUtah(a,n,r,s)&255),a+=2,n-=2;while(a<r&&n>=0);a+=3,n+=1}while(a<r||n<s);if(e!==this.version.getTotalCodewords())throw new k;return t}readModule(t,e,a,n){return t<0&&(t+=a,e+=4-(a+4&7)),e<0&&(e+=n,t+=4-(n+4&7)),this.readMappingMatrix.set(e,t),this.mappingBitMatrix.get(e,t)}readUtah(t,e,a,n){let r=0;return this.readModule(t-2,e-2,a,n)&&(r|=1),r<<=1,this.readModule(t-2,e-1,a,n)&&(r|=1),r<<=1,this.readModule(t-1,e-2,a,n)&&(r|=1),r<<=1,this.readModule(t-1,e-1,a,n)&&(r|=1),r<<=1,this.readModule(t-1,e,a,n)&&(r|=1),r<<=1,this.readModule(t,e-2,a,n)&&(r|=1),r<<=1,this.readModule(t,e-1,a,n)&&(r|=1),r<<=1,this.readModule(t,e,a,n)&&(r|=1),r}readCorner1(t,e){let a=0;return this.readModule(t-1,0,t,e)&&(a|=1),a<<=1,this.readModule(t-1,1,t,e)&&(a|=1),a<<=1,this.readModule(t-1,2,t,e)&&(a|=1),a<<=1,this.readModule(0,e-2,t,e)&&(a|=1),a<<=1,this.readModule(0,e-1,t,e)&&(a|=1),a<<=1,this.readModule(1,e-1,t,e)&&(a|=1),a<<=1,this.readModule(2,e-1,t,e)&&(a|=1),a<<=1,this.readModule(3,e-1,t,e)&&(a|=1),a}readCorner2(t,e){let a=0;return this.readModule(t-3,0,t,e)&&(a|=1),a<<=1,this.readModule(t-2,0,t,e)&&(a|=1),a<<=1,this.readModule(t-1,0,t,e)&&(a|=1),a<<=1,this.readModule(0,e-4,t,e)&&(a|=1),a<<=1,this.readModule(0,e-3,t,e)&&(a|=1),a<<=1,this.readModule(0,e-2,t,e)&&(a|=1),a<<=1,this.readModule(0,e-1,t,e)&&(a|=1),a<<=1,this.readModule(1,e-1,t,e)&&(a|=1),a}readCorner3(t,e){let a=0;return this.readModule(t-1,0,t,e)&&(a|=1),a<<=1,this.readModule(t-1,e-1,t,e)&&(a|=1),a<<=1,this.readModule(0,e-3,t,e)&&(a|=1),a<<=1,this.readModule(0,e-2,t,e)&&(a|=1),a<<=1,this.readModule(0,e-1,t,e)&&(a|=1),a<<=1,this.readModule(1,e-3,t,e)&&(a|=1),a<<=1,this.readModule(1,e-2,t,e)&&(a|=1),a<<=1,this.readModule(1,e-1,t,e)&&(a|=1),a}readCorner4(t,e){let a=0;return this.readModule(t-3,0,t,e)&&(a|=1),a<<=1,this.readModule(t-2,0,t,e)&&(a|=1),a<<=1,this.readModule(t-1,0,t,e)&&(a|=1),a<<=1,this.readModule(0,e-2,t,e)&&(a|=1),a<<=1,this.readModule(0,e-1,t,e)&&(a|=1),a<<=1,this.readModule(1,e-1,t,e)&&(a|=1),a<<=1,this.readModule(2,e-1,t,e)&&(a|=1),a<<=1,this.readModule(3,e-1,t,e)&&(a|=1),a}extractDataRegion(t){const e=this.version.getSymbolSizeRows(),a=this.version.getSymbolSizeColumns();if(t.getHeight()!==e)throw new D("Dimension of bitMatrix must match the version size");const n=this.version.getDataRegionSizeRows(),r=this.version.getDataRegionSizeColumns(),s=e/n|0,h=a/r|0,o=s*n,c=h*r,p=new Ut(c,o);for(let x=0;x<s;++x){const y=x*n;for(let A=0;A<h;++A){const E=A*r;for(let I=0;I<n;++I){const S=x*(n+2)+1+I,O=y+I;for(let H=0;H<r;++H){const F=A*(r+2)+1+H;if(t.get(F,S)){const P=E+H;p.set(P,O)}}}}}return p}}class Y1{constructor(t,e){this.numDataCodewords=t,this.codewords=e}static getDataBlocks(t,e){const a=e.getECBlocks();let n=0;const r=a.getECBlocks();for(let I of r)n+=I.getCount();const s=new Array(n);let h=0;for(let I of r)for(let S=0;S<I.getCount();S++){const O=I.getDataCodewords(),H=a.getECCodewords()+O;s[h++]=new Y1(O,new Uint8Array(H))}const c=s[0].codewords.length-a.getECCodewords(),p=c-1;let x=0;for(let I=0;I<p;I++)for(let S=0;S<h;S++)s[S].codewords[I]=t[x++];const y=e.getVersionNumber()===24,A=y?8:h;for(let I=0;I<A;I++)s[I].codewords[c-1]=t[x++];const E=s[0].codewords.length;for(let I=c;I<E;I++)for(let S=0;S<h;S++){const O=y?(S+8)%h:S,H=y&&O>7?I-1:I;s[O].codewords[H]=t[x++]}if(x!==t.length)throw new D;return s}getNumDataCodewords(){return this.numDataCodewords}getCodewords(){return this.codewords}}class j1{constructor(t){this.bytes=t,this.byteOffset=0,this.bitOffset=0}getBitOffset(){return this.bitOffset}getByteOffset(){return this.byteOffset}readBits(t){if(t<1||t>32||t>this.available())throw new D(""+t);let e=0,a=this.bitOffset,n=this.byteOffset;const r=this.bytes;if(a>0){const s=8-a,h=t<s?t:s,o=s-h,c=255>>8-h<<o;e=(r[n]&c)>>o,t-=h,a+=h,a===8&&(a=0,n++)}if(t>0){for(;t>=8;)e=e<<8|r[n]&255,n++,t-=8;if(t>0){const s=8-t,h=255>>s<<s;e=e<<t|(r[n]&h)>>s,a+=t}}return this.bitOffset=a,this.byteOffset=n,e}available(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset}}var Vt;(function(f){f[f.PAD_ENCODE=0]="PAD_ENCODE",f[f.ASCII_ENCODE=1]="ASCII_ENCODE",f[f.C40_ENCODE=2]="C40_ENCODE",f[f.TEXT_ENCODE=3]="TEXT_ENCODE",f[f.ANSIX12_ENCODE=4]="ANSIX12_ENCODE",f[f.EDIFACT_ENCODE=5]="EDIFACT_ENCODE",f[f.BASE256_ENCODE=6]="BASE256_ENCODE"})(Vt||(Vt={}));class De{static decode(t){const e=new j1(t),a=new yt,n=new yt,r=new Array;let s=Vt.ASCII_ENCODE;do if(s===Vt.ASCII_ENCODE)s=this.decodeAsciiSegment(e,a,n);else{switch(s){case Vt.C40_ENCODE:this.decodeC40Segment(e,a);break;case Vt.TEXT_ENCODE:this.decodeTextSegment(e,a);break;case Vt.ANSIX12_ENCODE:this.decodeAnsiX12Segment(e,a);break;case Vt.EDIFACT_ENCODE:this.decodeEdifactSegment(e,a);break;case Vt.BASE256_ENCODE:this.decodeBase256Segment(e,a,r);break;default:throw new k}s=Vt.ASCII_ENCODE}while(s!==Vt.PAD_ENCODE&&e.available()>0);return n.length()>0&&a.append(n.toString()),new s1(t,a.toString(),r.length===0?null:r,null)}static decodeAsciiSegment(t,e,a){let n=!1;do{let r=t.readBits(8);if(r===0)throw new k;if(r<=128)return n&&(r+=128),e.append(String.fromCharCode(r-1)),Vt.ASCII_ENCODE;if(r===129)return Vt.PAD_ENCODE;if(r<=229){const s=r-130;s<10&&e.append("0"),e.append(""+s)}else switch(r){case 230:return Vt.C40_ENCODE;case 231:return Vt.BASE256_ENCODE;case 232:e.append("");break;case 233:case 234:break;case 235:n=!0;break;case 236:e.append("[)>05"),a.insert(0,"");break;case 237:e.append("[)>06"),a.insert(0,"");break;case 238:return Vt.ANSIX12_ENCODE;case 239:return Vt.TEXT_ENCODE;case 240:return Vt.EDIFACT_ENCODE;case 241:break;default:if(r!==254||t.available()!==0)throw new k;break}}while(t.available()>0);return Vt.ASCII_ENCODE}static decodeC40Segment(t,e){let a=!1;const n=[];let r=0;do{if(t.available()===8)return;const s=t.readBits(8);if(s===254)return;this.parseTwoBytes(s,t.readBits(8),n);for(let h=0;h<3;h++){const o=n[h];switch(r){case 0:if(o<3)r=o+1;else if(o<this.C40_BASIC_SET_CHARS.length){const c=this.C40_BASIC_SET_CHARS[o];a?(e.append(String.fromCharCode(c.charCodeAt(0)+128)),a=!1):e.append(c)}else throw new k;break;case 1:a?(e.append(String.fromCharCode(o+128)),a=!1):e.append(String.fromCharCode(o)),r=0;break;case 2:if(o<this.C40_SHIFT2_SET_CHARS.length){const c=this.C40_SHIFT2_SET_CHARS[o];a?(e.append(String.fromCharCode(c.charCodeAt(0)+128)),a=!1):e.append(c)}else switch(o){case 27:e.append("");break;case 30:a=!0;break;default:throw new k}r=0;break;case 3:a?(e.append(String.fromCharCode(o+224)),a=!1):e.append(String.fromCharCode(o+96)),r=0;break;default:throw new k}}}while(t.available()>0)}static decodeTextSegment(t,e){let a=!1,n=[],r=0;do{if(t.available()===8)return;const s=t.readBits(8);if(s===254)return;this.parseTwoBytes(s,t.readBits(8),n);for(let h=0;h<3;h++){const o=n[h];switch(r){case 0:if(o<3)r=o+1;else if(o<this.TEXT_BASIC_SET_CHARS.length){const c=this.TEXT_BASIC_SET_CHARS[o];a?(e.append(String.fromCharCode(c.charCodeAt(0)+128)),a=!1):e.append(c)}else throw new k;break;case 1:a?(e.append(String.fromCharCode(o+128)),a=!1):e.append(String.fromCharCode(o)),r=0;break;case 2:if(o<this.TEXT_SHIFT2_SET_CHARS.length){const c=this.TEXT_SHIFT2_SET_CHARS[o];a?(e.append(String.fromCharCode(c.charCodeAt(0)+128)),a=!1):e.append(c)}else switch(o){case 27:e.append("");break;case 30:a=!0;break;default:throw new k}r=0;break;case 3:if(o<this.TEXT_SHIFT3_SET_CHARS.length){const c=this.TEXT_SHIFT3_SET_CHARS[o];a?(e.append(String.fromCharCode(c.charCodeAt(0)+128)),a=!1):e.append(c),r=0}else throw new k;break;default:throw new k}}}while(t.available()>0)}static decodeAnsiX12Segment(t,e){const a=[];do{if(t.available()===8)return;const n=t.readBits(8);if(n===254)return;this.parseTwoBytes(n,t.readBits(8),a);for(let r=0;r<3;r++){const s=a[r];switch(s){case 0:e.append("\r");break;case 1:e.append("*");break;case 2:e.append(">");break;case 3:e.append(" ");break;default:if(s<14)e.append(String.fromCharCode(s+44));else if(s<40)e.append(String.fromCharCode(s+51));else throw new k;break}}}while(t.available()>0)}static parseTwoBytes(t,e,a){let n=(t<<8)+e-1,r=Math.floor(n/1600);a[0]=r,n-=r*1600,r=Math.floor(n/40),a[1]=r,a[2]=n-r*40}static decodeEdifactSegment(t,e){do{if(t.available()<=16)return;for(let a=0;a<4;a++){let n=t.readBits(6);if(n===31){const r=8-t.getBitOffset();r!==8&&t.readBits(r);return}n&32||(n|=64),e.append(String.fromCharCode(n))}}while(t.available()>0)}static decodeBase256Segment(t,e,a){let n=1+t.getByteOffset();const r=this.unrandomize255State(t.readBits(8),n++);let s;if(r===0?s=t.available()/8|0:r<250?s=r:s=250*(r-249)+this.unrandomize255State(t.readBits(8),n++),s<0)throw new k;const h=new Uint8Array(s);for(let o=0;o<s;o++){if(t.available()<8)throw new k;h[o]=this.unrandomize255State(t.readBits(8),n++)}a.push(h);try{e.append(ae.decode(h,tt.ISO88591))}catch(o){throw new ye("Platform does not support required encoding: "+o.message)}}static unrandomize255State(t,e){const a=149*e%255+1,n=t-a;return n>=0?n:n+256}}De.C40_BASIC_SET_CHARS=["*","*","*"," ","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],De.C40_SHIFT2_SET_CHARS=["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_"],De.TEXT_BASIC_SET_CHARS=["*","*","*"," ","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],De.TEXT_SHIFT2_SET_CHARS=De.C40_SHIFT2_SET_CHARS,De.TEXT_SHIFT3_SET_CHARS=["`","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","{","|","}","~",""];class cr{constructor(){this.rsDecoder=new o1(gt.DATA_MATRIX_FIELD_256)}decode(t){const e=new q1(t),a=e.getVersion(),n=e.readCodewords(),r=Y1.getDataBlocks(n,a);let s=0;for(let c of r)s+=c.getNumDataCodewords();const h=new Uint8Array(s),o=r.length;for(let c=0;c<o;c++){const p=r[c],x=p.getCodewords(),y=p.getNumDataCodewords();this.correctErrors(x,y);for(let A=0;A<y;A++)h[A*o+c]=x[A]}return De.decode(h)}correctErrors(t,e){const a=new Int32Array(t);try{this.rsDecoder.decode(a,t.length-e)}catch{throw new z}for(let n=0;n<e;n++)t[n]=a[n]}}class Pt{constructor(t){this.image=t,this.rectangleDetector=new be(this.image)}detect(){const t=this.rectangleDetector.detect();let e=this.detectSolid1(t);if(e=this.detectSolid2(e),e[3]=this.correctTopRight(e),!e[3])throw new L;e=this.shiftToModuleCenter(e);const a=e[0],n=e[1],r=e[2],s=e[3];let h=this.transitionsBetween(a,s)+1,o=this.transitionsBetween(r,s)+1;(h&1)===1&&(h+=1),(o&1)===1&&(o+=1),4*h<7*o&&4*o<7*h&&(h=o=Math.max(h,o));let c=Pt.sampleGrid(this.image,a,n,r,s,h,o);return new A1(c,[a,n,r,s])}static shiftPoint(t,e,a){let n=(e.getX()-t.getX())/(a+1),r=(e.getY()-t.getY())/(a+1);return new W(t.getX()+n,t.getY()+r)}static moveAway(t,e,a){let n=t.getX(),r=t.getY();return n<e?n-=1:n+=1,r<a?r-=1:r+=1,new W(n,r)}detectSolid1(t){let e=t[0],a=t[1],n=t[3],r=t[2],s=this.transitionsBetween(e,a),h=this.transitionsBetween(a,n),o=this.transitionsBetween(n,r),c=this.transitionsBetween(r,e),p=s,x=[r,e,a,n];return p>h&&(p=h,x[0]=e,x[1]=a,x[2]=n,x[3]=r),p>o&&(p=o,x[0]=a,x[1]=n,x[2]=r,x[3]=e),p>c&&(x[0]=n,x[1]=r,x[2]=e,x[3]=a),x}detectSolid2(t){let e=t[0],a=t[1],n=t[2],r=t[3],s=this.transitionsBetween(e,r),h=Pt.shiftPoint(a,n,(s+1)*4),o=Pt.shiftPoint(n,a,(s+1)*4),c=this.transitionsBetween(h,e),p=this.transitionsBetween(o,r);return c<p?(t[0]=e,t[1]=a,t[2]=n,t[3]=r):(t[0]=a,t[1]=n,t[2]=r,t[3]=e),t}correctTopRight(t){let e=t[0],a=t[1],n=t[2],r=t[3],s=this.transitionsBetween(e,r),h=this.transitionsBetween(a,r),o=Pt.shiftPoint(e,a,(h+1)*4),c=Pt.shiftPoint(n,a,(s+1)*4);s=this.transitionsBetween(o,r),h=this.transitionsBetween(c,r);let p=new W(r.getX()+(n.getX()-a.getX())/(s+1),r.getY()+(n.getY()-a.getY())/(s+1)),x=new W(r.getX()+(e.getX()-a.getX())/(h+1),r.getY()+(e.getY()-a.getY())/(h+1));if(!this.isValid(p))return this.isValid(x)?x:null;if(!this.isValid(x))return p;let y=this.transitionsBetween(o,p)+this.transitionsBetween(c,p),A=this.transitionsBetween(o,x)+this.transitionsBetween(c,x);return y>A?p:x}shiftToModuleCenter(t){let e=t[0],a=t[1],n=t[2],r=t[3],s=this.transitionsBetween(e,r)+1,h=this.transitionsBetween(n,r)+1,o=Pt.shiftPoint(e,a,h*4),c=Pt.shiftPoint(n,a,s*4);s=this.transitionsBetween(o,r)+1,h=this.transitionsBetween(c,r)+1,(s&1)===1&&(s+=1),(h&1)===1&&(h+=1);let p=(e.getX()+a.getX()+n.getX()+r.getX())/4,x=(e.getY()+a.getY()+n.getY()+r.getY())/4;e=Pt.moveAway(e,p,x),a=Pt.moveAway(a,p,x),n=Pt.moveAway(n,p,x),r=Pt.moveAway(r,p,x);let y,A;return o=Pt.shiftPoint(e,a,h*4),o=Pt.shiftPoint(o,r,s*4),y=Pt.shiftPoint(a,e,h*4),y=Pt.shiftPoint(y,n,s*4),c=Pt.shiftPoint(n,r,h*4),c=Pt.shiftPoint(c,a,s*4),A=Pt.shiftPoint(r,n,h*4),A=Pt.shiftPoint(A,e,s*4),[o,y,c,A]}isValid(t){return t.getX()>=0&&t.getX()<this.image.getWidth()&&t.getY()>0&&t.getY()<this.image.getHeight()}static sampleGrid(t,e,a,n,r,s,h){return Re.getInstance().sampleGrid(t,s,h,.5,.5,s-.5,.5,s-.5,h-.5,.5,h-.5,e.getX(),e.getY(),r.getX(),r.getY(),n.getX(),n.getY(),a.getX(),a.getY())}transitionsBetween(t,e){let a=Math.trunc(t.getX()),n=Math.trunc(t.getY()),r=Math.trunc(e.getX()),s=Math.trunc(e.getY()),h=Math.abs(s-n)>Math.abs(r-a);if(h){let I=a;a=n,n=I,I=r,r=s,s=I}let o=Math.abs(r-a),c=Math.abs(s-n),p=-o/2,x=n<s?1:-1,y=a<r?1:-1,A=0,E=this.image.get(h?n:a,h?a:n);for(let I=a,S=n;I!==r;I+=y){let O=this.image.get(h?S:I,h?I:S);if(O!==E&&(A++,E=O),p+=c,p>0){if(S===s)break;S+=x,p-=o}}return A}}class _e{constructor(){this.decoder=new cr}decode(t,e=null){let a,n;if(e!=null&&e.has(ut.PURE_BARCODE)){const c=_e.extractPureBits(t.getBlackMatrix());a=this.decoder.decode(c),n=_e.NO_POINTS}else{const c=new Pt(t.getBlackMatrix()).detect();a=this.decoder.decode(c.getBits()),n=c.getPoints()}const r=a.getRawBytes(),s=new $t(a.getText(),r,8*r.length,n,Q.DATA_MATRIX,q.currentTimeMillis()),h=a.getByteSegments();h!=null&&s.putMetadata(Gt.BYTE_SEGMENTS,h);const o=a.getECLevel();return o!=null&&s.putMetadata(Gt.ERROR_CORRECTION_LEVEL,o),s}reset(){}static extractPureBits(t){const e=t.getTopLeftOnBit(),a=t.getBottomRightOnBit();if(e==null||a==null)throw new L;const n=this.moduleSize(e,t);let r=e[1];const s=a[1];let h=e[0];const c=(a[0]-h+1)/n,p=(s-r+1)/n;if(c<=0||p<=0)throw new L;const x=n/2;r+=x,h+=x;const y=new Ut(c,p);for(let A=0;A<p;A++){const E=r+A*n;for(let I=0;I<c;I++)t.get(h+I*n,E)&&y.set(I,A)}return y}static moduleSize(t,e){const a=e.getWidth();let n=t[0];const r=t[1];for(;n<a&&e.get(n,r);)n++;if(n===a)throw new L;const s=n-t[0];if(s===0)throw new L;return s}}_e.NO_POINTS=[];class dr extends Ve{constructor(t=500){super(new _e,t)}}var Je;(function(f){f[f.L=0]="L",f[f.M=1]="M",f[f.Q=2]="Q",f[f.H=3]="H"})(Je||(Je={}));class It{constructor(t,e,a){this.value=t,this.stringValue=e,this.bits=a,It.FOR_BITS.set(a,this),It.FOR_VALUE.set(t,this)}getValue(){return this.value}getBits(){return this.bits}static fromString(t){switch(t){case"L":return It.L;case"M":return It.M;case"Q":return It.Q;case"H":return It.H;default:throw new _(t+"not available")}}toString(){return this.stringValue}equals(t){if(!(t instanceof It))return!1;const e=t;return this.value===e.value}static forBits(t){if(t<0||t>=It.FOR_BITS.size)throw new D;return It.FOR_BITS.get(t)}}It.FOR_BITS=new Map,It.FOR_VALUE=new Map,It.L=new It(Je.L,"L",1),It.M=new It(Je.M,"M",0),It.Q=new It(Je.Q,"Q",3),It.H=new It(Je.H,"H",2);class Qt{constructor(t){this.errorCorrectionLevel=It.forBits(t>>3&3),this.dataMask=t&7}static numBitsDiffering(t,e){return Y.bitCount(t^e)}static decodeFormatInformation(t,e){const a=Qt.doDecodeFormatInformation(t,e);return a!==null?a:Qt.doDecodeFormatInformation(t^Qt.FORMAT_INFO_MASK_QR,e^Qt.FORMAT_INFO_MASK_QR)}static doDecodeFormatInformation(t,e){let a=Number.MAX_SAFE_INTEGER,n=0;for(const r of Qt.FORMAT_INFO_DECODE_LOOKUP){const s=r[0];if(s===t||s===e)return new Qt(r[1]);let h=Qt.numBitsDiffering(t,s);h<a&&(n=r[1],a=h),t!==e&&(h=Qt.numBitsDiffering(e,s),h<a&&(n=r[1],a=h))}return a<=3?new Qt(n):null}getErrorCorrectionLevel(){return this.errorCorrectionLevel}getDataMask(){return this.dataMask}hashCode(){return this.errorCorrectionLevel.getBits()<<3|this.dataMask}equals(t){if(!(t instanceof Qt))return!1;const e=t;return this.errorCorrectionLevel===e.errorCorrectionLevel&&this.dataMask===e.dataMask}}Qt.FORMAT_INFO_MASK_QR=21522,Qt.FORMAT_INFO_DECODE_LOOKUP=[Int32Array.from([21522,0]),Int32Array.from([20773,1]),Int32Array.from([24188,2]),Int32Array.from([23371,3]),Int32Array.from([17913,4]),Int32Array.from([16590,5]),Int32Array.from([20375,6]),Int32Array.from([19104,7]),Int32Array.from([30660,8]),Int32Array.from([29427,9]),Int32Array.from([32170,10]),Int32Array.from([30877,11]),Int32Array.from([26159,12]),Int32Array.from([25368,13]),Int32Array.from([27713,14]),Int32Array.from([26998,15]),Int32Array.from([5769,16]),Int32Array.from([5054,17]),Int32Array.from([7399,18]),Int32Array.from([6608,19]),Int32Array.from([1890,20]),Int32Array.from([597,21]),Int32Array.from([3340,22]),Int32Array.from([2107,23]),Int32Array.from([13663,24]),Int32Array.from([12392,25]),Int32Array.from([16177,26]),Int32Array.from([14854,27]),Int32Array.from([9396,28]),Int32Array.from([8579,29]),Int32Array.from([11994,30]),Int32Array.from([11245,31])];class T{constructor(t,...e){this.ecCodewordsPerBlock=t,this.ecBlocks=e}getECCodewordsPerBlock(){return this.ecCodewordsPerBlock}getNumBlocks(){let t=0;const e=this.ecBlocks;for(const a of e)t+=a.getCount();return t}getTotalECCodewords(){return this.ecCodewordsPerBlock*this.getNumBlocks()}getECBlocks(){return this.ecBlocks}}class m{constructor(t,e){this.count=t,this.dataCodewords=e}getCount(){return this.count}getDataCodewords(){return this.dataCodewords}}class X{constructor(t,e,...a){this.versionNumber=t,this.alignmentPatternCenters=e,this.ecBlocks=a;let n=0;const r=a[0].getECCodewordsPerBlock(),s=a[0].getECBlocks();for(const h of s)n+=h.getCount()*(h.getDataCodewords()+r);this.totalCodewords=n}getVersionNumber(){return this.versionNumber}getAlignmentPatternCenters(){return this.alignmentPatternCenters}getTotalCodewords(){return this.totalCodewords}getDimensionForVersion(){return 17+4*this.versionNumber}getECBlocksForLevel(t){return this.ecBlocks[t.getValue()]}static getProvisionalVersionForDimension(t){if(t%4!==1)throw new k;try{return this.getVersionForNumber((t-17)/4)}catch{throw new k}}static getVersionForNumber(t){if(t<1||t>40)throw new D;return X.VERSIONS[t-1]}static decodeVersionInformation(t){let e=Number.MAX_SAFE_INTEGER,a=0;for(let n=0;n<X.VERSION_DECODE_INFO.length;n++){const r=X.VERSION_DECODE_INFO[n];if(r===t)return X.getVersionForNumber(n+7);const s=Qt.numBitsDiffering(t,r);s<e&&(a=n+7,e=s)}return e<=3?X.getVersionForNumber(a):null}buildFunctionPattern(){const t=this.getDimensionForVersion(),e=new Ut(t);e.setRegion(0,0,9,9),e.setRegion(t-8,0,8,9),e.setRegion(0,t-8,9,8);const a=this.alignmentPatternCenters.length;for(let n=0;n<a;n++){const r=this.alignmentPatternCenters[n]-2;for(let s=0;s<a;s++)n===0&&(s===0||s===a-1)||n===a-1&&s===0||e.setRegion(this.alignmentPatternCenters[s]-2,r,5,5)}return e.setRegion(6,9,1,t-17),e.setRegion(9,6,t-17,1),this.versionNumber>6&&(e.setRegion(t-11,0,3,6),e.setRegion(0,t-11,6,3)),e}toString(){return""+this.versionNumber}}X.VERSION_DECODE_INFO=Int32Array.from([31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017]),X.VERSIONS=[new X(1,new Int32Array(0),new T(7,new m(1,19)),new T(10,new m(1,16)),new T(13,new m(1,13)),new T(17,new m(1,9))),new X(2,Int32Array.from([6,18]),new T(10,new m(1,34)),new T(16,new m(1,28)),new T(22,new m(1,22)),new T(28,new m(1,16))),new X(3,Int32Array.from([6,22]),new T(15,new m(1,55)),new T(26,new m(1,44)),new T(18,new m(2,17)),new T(22,new m(2,13))),new X(4,Int32Array.from([6,26]),new T(20,new m(1,80)),new T(18,new m(2,32)),new T(26,new m(2,24)),new T(16,new m(4,9))),new X(5,Int32Array.from([6,30]),new T(26,new m(1,108)),new T(24,new m(2,43)),new T(18,new m(2,15),new m(2,16)),new T(22,new m(2,11),new m(2,12))),new X(6,Int32Array.from([6,34]),new T(18,new m(2,68)),new T(16,new m(4,27)),new T(24,new m(4,19)),new T(28,new m(4,15))),new X(7,Int32Array.from([6,22,38]),new T(20,new m(2,78)),new T(18,new m(4,31)),new T(18,new m(2,14),new m(4,15)),new T(26,new m(4,13),new m(1,14))),new X(8,Int32Array.from([6,24,42]),new T(24,new m(2,97)),new T(22,new m(2,38),new m(2,39)),new T(22,new m(4,18),new m(2,19)),new T(26,new m(4,14),new m(2,15))),new X(9,Int32Array.from([6,26,46]),new T(30,new m(2,116)),new T(22,new m(3,36),new m(2,37)),new T(20,new m(4,16),new m(4,17)),new T(24,new m(4,12),new m(4,13))),new X(10,Int32Array.from([6,28,50]),new T(18,new m(2,68),new m(2,69)),new T(26,new m(4,43),new m(1,44)),new T(24,new m(6,19),new m(2,20)),new T(28,new m(6,15),new m(2,16))),new X(11,Int32Array.from([6,30,54]),new T(20,new m(4,81)),new T(30,new m(1,50),new m(4,51)),new T(28,new m(4,22),new m(4,23)),new T(24,new m(3,12),new m(8,13))),new X(12,Int32Array.from([6,32,58]),new T(24,new m(2,92),new m(2,93)),new T(22,new m(6,36),new m(2,37)),new T(26,new m(4,20),new m(6,21)),new T(28,new m(7,14),new m(4,15))),new X(13,Int32Array.from([6,34,62]),new T(26,new m(4,107)),new T(22,new m(8,37),new m(1,38)),new T(24,new m(8,20),new m(4,21)),new T(22,new m(12,11),new m(4,12))),new X(14,Int32Array.from([6,26,46,66]),new T(30,new m(3,115),new m(1,116)),new T(24,new m(4,40),new m(5,41)),new T(20,new m(11,16),new m(5,17)),new T(24,new m(11,12),new m(5,13))),new X(15,Int32Array.from([6,26,48,70]),new T(22,new m(5,87),new m(1,88)),new T(24,new m(5,41),new m(5,42)),new T(30,new m(5,24),new m(7,25)),new T(24,new m(11,12),new m(7,13))),new X(16,Int32Array.from([6,26,50,74]),new T(24,new m(5,98),new m(1,99)),new T(28,new m(7,45),new m(3,46)),new T(24,new m(15,19),new m(2,20)),new T(30,new m(3,15),new m(13,16))),new X(17,Int32Array.from([6,30,54,78]),new T(28,new m(1,107),new m(5,108)),new T(28,new m(10,46),new m(1,47)),new T(28,new m(1,22),new m(15,23)),new T(28,new m(2,14),new m(17,15))),new X(18,Int32Array.from([6,30,56,82]),new T(30,new m(5,120),new m(1,121)),new T(26,new m(9,43),new m(4,44)),new T(28,new m(17,22),new m(1,23)),new T(28,new m(2,14),new m(19,15))),new X(19,Int32Array.from([6,30,58,86]),new T(28,new m(3,113),new m(4,114)),new T(26,new m(3,44),new m(11,45)),new T(26,new m(17,21),new m(4,22)),new T(26,new m(9,13),new m(16,14))),new X(20,Int32Array.from([6,34,62,90]),new T(28,new m(3,107),new m(5,108)),new T(26,new m(3,41),new m(13,42)),new T(30,new m(15,24),new m(5,25)),new T(28,new m(15,15),new m(10,16))),new X(21,Int32Array.from([6,28,50,72,94]),new T(28,new m(4,116),new m(4,117)),new T(26,new m(17,42)),new T(28,new m(17,22),new m(6,23)),new T(30,new m(19,16),new m(6,17))),new X(22,Int32Array.from([6,26,50,74,98]),new T(28,new m(2,111),new m(7,112)),new T(28,new m(17,46)),new T(30,new m(7,24),new m(16,25)),new T(24,new m(34,13))),new X(23,Int32Array.from([6,30,54,78,102]),new T(30,new m(4,121),new m(5,122)),new T(28,new m(4,47),new m(14,48)),new T(30,new m(11,24),new m(14,25)),new T(30,new m(16,15),new m(14,16))),new X(24,Int32Array.from([6,28,54,80,106]),new T(30,new m(6,117),new m(4,118)),new T(28,new m(6,45),new m(14,46)),new T(30,new m(11,24),new m(16,25)),new T(30,new m(30,16),new m(2,17))),new X(25,Int32Array.from([6,32,58,84,110]),new T(26,new m(8,106),new m(4,107)),new T(28,new m(8,47),new m(13,48)),new T(30,new m(7,24),new m(22,25)),new T(30,new m(22,15),new m(13,16))),new X(26,Int32Array.from([6,30,58,86,114]),new T(28,new m(10,114),new m(2,115)),new T(28,new m(19,46),new m(4,47)),new T(28,new m(28,22),new m(6,23)),new T(30,new m(33,16),new m(4,17))),new X(27,Int32Array.from([6,34,62,90,118]),new T(30,new m(8,122),new m(4,123)),new T(28,new m(22,45),new m(3,46)),new T(30,new m(8,23),new m(26,24)),new T(30,new m(12,15),new m(28,16))),new X(28,Int32Array.from([6,26,50,74,98,122]),new T(30,new m(3,117),new m(10,118)),new T(28,new m(3,45),new m(23,46)),new T(30,new m(4,24),new m(31,25)),new T(30,new m(11,15),new m(31,16))),new X(29,Int32Array.from([6,30,54,78,102,126]),new T(30,new m(7,116),new m(7,117)),new T(28,new m(21,45),new m(7,46)),new T(30,new m(1,23),new m(37,24)),new T(30,new m(19,15),new m(26,16))),new X(30,Int32Array.from([6,26,52,78,104,130]),new T(30,new m(5,115),new m(10,116)),new T(28,new m(19,47),new m(10,48)),new T(30,new m(15,24),new m(25,25)),new T(30,new m(23,15),new m(25,16))),new X(31,Int32Array.from([6,30,56,82,108,134]),new T(30,new m(13,115),new m(3,116)),new T(28,new m(2,46),new m(29,47)),new T(30,new m(42,24),new m(1,25)),new T(30,new m(23,15),new m(28,16))),new X(32,Int32Array.from([6,34,60,86,112,138]),new T(30,new m(17,115)),new T(28,new m(10,46),new m(23,47)),new T(30,new m(10,24),new m(35,25)),new T(30,new m(19,15),new m(35,16))),new X(33,Int32Array.from([6,30,58,86,114,142]),new T(30,new m(17,115),new m(1,116)),new T(28,new m(14,46),new m(21,47)),new T(30,new m(29,24),new m(19,25)),new T(30,new m(11,15),new m(46,16))),new X(34,Int32Array.from([6,34,62,90,118,146]),new T(30,new m(13,115),new m(6,116)),new T(28,new m(14,46),new m(23,47)),new T(30,new m(44,24),new m(7,25)),new T(30,new m(59,16),new m(1,17))),new X(35,Int32Array.from([6,30,54,78,102,126,150]),new T(30,new m(12,121),new m(7,122)),new T(28,new m(12,47),new m(26,48)),new T(30,new m(39,24),new m(14,25)),new T(30,new m(22,15),new m(41,16))),new X(36,Int32Array.from([6,24,50,76,102,128,154]),new T(30,new m(6,121),new m(14,122)),new T(28,new m(6,47),new m(34,48)),new T(30,new m(46,24),new m(10,25)),new T(30,new m(2,15),new m(64,16))),new X(37,Int32Array.from([6,28,54,80,106,132,158]),new T(30,new m(17,122),new m(4,123)),new T(28,new m(29,46),new m(14,47)),new T(30,new m(49,24),new m(10,25)),new T(30,new m(24,15),new m(46,16))),new X(38,Int32Array.from([6,32,58,84,110,136,162]),new T(30,new m(4,122),new m(18,123)),new T(28,new m(13,46),new m(32,47)),new T(30,new m(48,24),new m(14,25)),new T(30,new m(42,15),new m(32,16))),new X(39,Int32Array.from([6,26,54,82,110,138,166]),new T(30,new m(20,117),new m(4,118)),new T(28,new m(40,47),new m(7,48)),new T(30,new m(43,24),new m(22,25)),new T(30,new m(10,15),new m(67,16))),new X(40,Int32Array.from([6,30,58,86,114,142,170]),new T(30,new m(19,118),new m(6,119)),new T(28,new m(18,47),new m(31,48)),new T(30,new m(34,24),new m(34,25)),new T(30,new m(20,15),new m(61,16)))];var Wt;(function(f){f[f.DATA_MASK_000=0]="DATA_MASK_000",f[f.DATA_MASK_001=1]="DATA_MASK_001",f[f.DATA_MASK_010=2]="DATA_MASK_010",f[f.DATA_MASK_011=3]="DATA_MASK_011",f[f.DATA_MASK_100=4]="DATA_MASK_100",f[f.DATA_MASK_101=5]="DATA_MASK_101",f[f.DATA_MASK_110=6]="DATA_MASK_110",f[f.DATA_MASK_111=7]="DATA_MASK_111"})(Wt||(Wt={}));class ue{constructor(t,e){this.value=t,this.isMasked=e}unmaskBitMatrix(t,e){for(let a=0;a<e;a++)for(let n=0;n<e;n++)this.isMasked(a,n)&&t.flip(n,a)}}ue.values=new Map([[Wt.DATA_MASK_000,new ue(Wt.DATA_MASK_000,(f,t)=>(f+t&1)===0)],[Wt.DATA_MASK_001,new ue(Wt.DATA_MASK_001,(f,t)=>(f&1)===0)],[Wt.DATA_MASK_010,new ue(Wt.DATA_MASK_010,(f,t)=>t%3===0)],[Wt.DATA_MASK_011,new ue(Wt.DATA_MASK_011,(f,t)=>(f+t)%3===0)],[Wt.DATA_MASK_100,new ue(Wt.DATA_MASK_100,(f,t)=>(Math.floor(f/2)+Math.floor(t/3)&1)===0)],[Wt.DATA_MASK_101,new ue(Wt.DATA_MASK_101,(f,t)=>f*t%6===0)],[Wt.DATA_MASK_110,new ue(Wt.DATA_MASK_110,(f,t)=>f*t%6<3)],[Wt.DATA_MASK_111,new ue(Wt.DATA_MASK_111,(f,t)=>(f+t+f*t%3&1)===0)]]);class lr{constructor(t){const e=t.getHeight();if(e<21||(e&3)!==1)throw new k;this.bitMatrix=t}readFormatInformation(){if(this.parsedFormatInfo!==null&&this.parsedFormatInfo!==void 0)return this.parsedFormatInfo;let t=0;for(let r=0;r<6;r++)t=this.copyBit(r,8,t);t=this.copyBit(7,8,t),t=this.copyBit(8,8,t),t=this.copyBit(8,7,t);for(let r=5;r>=0;r--)t=this.copyBit(8,r,t);const e=this.bitMatrix.getHeight();let a=0;const n=e-7;for(let r=e-1;r>=n;r--)a=this.copyBit(8,r,a);for(let r=e-8;r<e;r++)a=this.copyBit(r,8,a);if(this.parsedFormatInfo=Qt.decodeFormatInformation(t,a),this.parsedFormatInfo!==null)return this.parsedFormatInfo;throw new k}readVersion(){if(this.parsedVersion!==null&&this.parsedVersion!==void 0)return this.parsedVersion;const t=this.bitMatrix.getHeight(),e=Math.floor((t-17)/4);if(e<=6)return X.getVersionForNumber(e);let a=0;const n=t-11;for(let s=5;s>=0;s--)for(let h=t-9;h>=n;h--)a=this.copyBit(h,s,a);let r=X.decodeVersionInformation(a);if(r!==null&&r.getDimensionForVersion()===t)return this.parsedVersion=r,r;a=0;for(let s=5;s>=0;s--)for(let h=t-9;h>=n;h--)a=this.copyBit(s,h,a);if(r=X.decodeVersionInformation(a),r!==null&&r.getDimensionForVersion()===t)return this.parsedVersion=r,r;throw new k}copyBit(t,e,a){return(this.isMirror?this.bitMatrix.get(e,t):this.bitMatrix.get(t,e))?a<<1|1:a<<1}readCodewords(){const t=this.readFormatInformation(),e=this.readVersion(),a=ue.values.get(t.getDataMask()),n=this.bitMatrix.getHeight();a.unmaskBitMatrix(this.bitMatrix,n);const r=e.buildFunctionPattern();let s=!0;const h=new Uint8Array(e.getTotalCodewords());let o=0,c=0,p=0;for(let x=n-1;x>0;x-=2){x===6&&x--;for(let y=0;y<n;y++){const A=s?n-1-y:y;for(let E=0;E<2;E++)r.get(x-E,A)||(p++,c<<=1,this.bitMatrix.get(x-E,A)&&(c|=1),p===8&&(h[o++]=c,p=0,c=0))}s=!s}if(o!==e.getTotalCodewords())throw new k;return h}remask(){if(this.parsedFormatInfo===null)return;const t=ue.values[this.parsedFormatInfo.getDataMask()],e=this.bitMatrix.getHeight();t.unmaskBitMatrix(this.bitMatrix,e)}setMirror(t){this.parsedVersion=null,this.parsedFormatInfo=null,this.isMirror=t}mirror(){const t=this.bitMatrix;for(let e=0,a=t.getWidth();e<a;e++)for(let n=e+1,r=t.getHeight();n<r;n++)t.get(e,n)!==t.get(n,e)&&(t.flip(n,e),t.flip(e,n))}}class K1{constructor(t,e){this.numDataCodewords=t,this.codewords=e}static getDataBlocks(t,e,a){if(t.length!==e.getTotalCodewords())throw new D;const n=e.getECBlocksForLevel(a);let r=0;const s=n.getECBlocks();for(const E of s)r+=E.getCount();const h=new Array(r);let o=0;for(const E of s)for(let I=0;I<E.getCount();I++){const S=E.getDataCodewords(),O=n.getECCodewordsPerBlock()+S;h[o++]=new K1(S,new Uint8Array(O))}const c=h[0].codewords.length;let p=h.length-1;for(;p>=0&&h[p].codewords.length!==c;)p--;p++;const x=c-n.getECCodewordsPerBlock();let y=0;for(let E=0;E<x;E++)for(let I=0;I<o;I++)h[I].codewords[E]=t[y++];for(let E=p;E<o;E++)h[E].codewords[x]=t[y++];const A=h[0].codewords.length;for(let E=x;E<A;E++)for(let I=0;I<o;I++){const S=I<p?E:E+1;h[I].codewords[S]=t[y++]}return h}getNumDataCodewords(){return this.numDataCodewords}getCodewords(){return this.codewords}}var ge;(function(f){f[f.TERMINATOR=0]="TERMINATOR",f[f.NUMERIC=1]="NUMERIC",f[f.ALPHANUMERIC=2]="ALPHANUMERIC",f[f.STRUCTURED_APPEND=3]="STRUCTURED_APPEND",f[f.BYTE=4]="BYTE",f[f.ECI=5]="ECI",f[f.KANJI=6]="KANJI",f[f.FNC1_FIRST_POSITION=7]="FNC1_FIRST_POSITION",f[f.FNC1_SECOND_POSITION=8]="FNC1_SECOND_POSITION",f[f.HANZI=9]="HANZI"})(ge||(ge={}));class K{constructor(t,e,a,n){this.value=t,this.stringValue=e,this.characterCountBitsForVersions=a,this.bits=n,K.FOR_BITS.set(n,this),K.FOR_VALUE.set(t,this)}static forBits(t){const e=K.FOR_BITS.get(t);if(e===void 0)throw new D;return e}getCharacterCountBits(t){const e=t.getVersionNumber();let a;return e<=9?a=0:e<=26?a=1:a=2,this.characterCountBitsForVersions[a]}getValue(){return this.value}getBits(){return this.bits}equals(t){if(!(t instanceof K))return!1;const e=t;return this.value===e.value}toString(){return this.stringValue}}K.FOR_BITS=new Map,K.FOR_VALUE=new Map,K.TERMINATOR=new K(ge.TERMINATOR,"TERMINATOR",Int32Array.from([0,0,0]),0),K.NUMERIC=new K(ge.NUMERIC,"NUMERIC",Int32Array.from([10,12,14]),1),K.ALPHANUMERIC=new K(ge.ALPHANUMERIC,"ALPHANUMERIC",Int32Array.from([9,11,13]),2),K.STRUCTURED_APPEND=new K(ge.STRUCTURED_APPEND,"STRUCTURED_APPEND",Int32Array.from([0,0,0]),3),K.BYTE=new K(ge.BYTE,"BYTE",Int32Array.from([8,16,16]),4),K.ECI=new K(ge.ECI,"ECI",Int32Array.from([0,0,0]),7),K.KANJI=new K(ge.KANJI,"KANJI",Int32Array.from([8,10,12]),8),K.FNC1_FIRST_POSITION=new K(ge.FNC1_FIRST_POSITION,"FNC1_FIRST_POSITION",Int32Array.from([0,0,0]),5),K.FNC1_SECOND_POSITION=new K(ge.FNC1_SECOND_POSITION,"FNC1_SECOND_POSITION",Int32Array.from([0,0,0]),9),K.HANZI=new K(ge.HANZI,"HANZI",Int32Array.from([8,10,12]),13);class Ot{static decode(t,e,a,n){const r=new j1(t);let s=new yt;const h=new Array;let o=-1,c=-1;try{let p=null,x=!1,y;do{if(r.available()<4)y=K.TERMINATOR;else{const A=r.readBits(4);y=K.forBits(A)}switch(y){case K.TERMINATOR:break;case K.FNC1_FIRST_POSITION:case K.FNC1_SECOND_POSITION:x=!0;break;case K.STRUCTURED_APPEND:if(r.available()<16)throw new k;o=r.readBits(8),c=r.readBits(8);break;case K.ECI:const A=Ot.parseECIValue(r);if(p=V.getCharacterSetECIByValue(A),p===null)throw new k;break;case K.HANZI:const E=r.readBits(4),I=r.readBits(y.getCharacterCountBits(e));E===Ot.GB2312_SUBSET&&Ot.decodeHanziSegment(r,s,I);break;default:const S=r.readBits(y.getCharacterCountBits(e));switch(y){case K.NUMERIC:Ot.decodeNumericSegment(r,s,S);break;case K.ALPHANUMERIC:Ot.decodeAlphanumericSegment(r,s,S,x);break;case K.BYTE:Ot.decodeByteSegment(r,s,S,p,h,n);break;case K.KANJI:Ot.decodeKanjiSegment(r,s,S);break;default:throw new k}break}}while(y!==K.TERMINATOR)}catch{throw new k}return new s1(t,s.toString(),h.length===0?null:h,a===null?null:a.toString(),o,c)}static decodeHanziSegment(t,e,a){if(a*13>t.available())throw new k;const n=new Uint8Array(2*a);let r=0;for(;a>0;){const s=t.readBits(13);let h=s/96<<8&4294967295|s%96;h<959?h+=41377:h+=42657,n[r]=h>>8&255,n[r+1]=h&255,r+=2,a--}try{e.append(ae.decode(n,tt.GB2312))}catch(s){throw new k(s)}}static decodeKanjiSegment(t,e,a){if(a*13>t.available())throw new k;const n=new Uint8Array(2*a);let r=0;for(;a>0;){const s=t.readBits(13);let h=s/192<<8&4294967295|s%192;h<7936?h+=33088:h+=49472,n[r]=h>>8,n[r+1]=h,r+=2,a--}try{e.append(ae.decode(n,tt.SHIFT_JIS))}catch(s){throw new k(s)}}static decodeByteSegment(t,e,a,n,r,s){if(8*a>t.available())throw new k;const h=new Uint8Array(a);for(let c=0;c<a;c++)h[c]=t.readBits(8);let o;n===null?o=tt.guessEncoding(h,s):o=n.getName();try{e.append(ae.decode(h,o))}catch(c){throw new k(c)}r.push(h)}static toAlphaNumericChar(t){if(t>=Ot.ALPHANUMERIC_CHARS.length)throw new k;return Ot.ALPHANUMERIC_CHARS[t]}static decodeAlphanumericSegment(t,e,a,n){const r=e.length();for(;a>1;){if(t.available()<11)throw new k;const s=t.readBits(11);e.append(Ot.toAlphaNumericChar(Math.floor(s/45))),e.append(Ot.toAlphaNumericChar(s%45)),a-=2}if(a===1){if(t.available()<6)throw new k;e.append(Ot.toAlphaNumericChar(t.readBits(6)))}if(n)for(let s=r;s<e.length();s++)e.charAt(s)==="%"&&(s<e.length()-1&&e.charAt(s+1)==="%"?e.deleteCharAt(s+1):e.setCharAt(s,""))}static decodeNumericSegment(t,e,a){for(;a>=3;){if(t.available()<10)throw new k;const n=t.readBits(10);if(n>=1e3)throw new k;e.append(Ot.toAlphaNumericChar(Math.floor(n/100))),e.append(Ot.toAlphaNumericChar(Math.floor(n/10)%10)),e.append(Ot.toAlphaNumericChar(n%10)),a-=3}if(a===2){if(t.available()<7)throw new k;const n=t.readBits(7);if(n>=100)throw new k;e.append(Ot.toAlphaNumericChar(Math.floor(n/10))),e.append(Ot.toAlphaNumericChar(n%10))}else if(a===1){if(t.available()<4)throw new k;const n=t.readBits(4);if(n>=10)throw new k;e.append(Ot.toAlphaNumericChar(n))}}static parseECIValue(t){const e=t.readBits(8);if(!(e&128))return e&127;if((e&192)===128){const a=t.readBits(8);return(e&63)<<8&4294967295|a}if((e&224)===192){const a=t.readBits(16);return(e&31)<<16&4294967295|a}throw new k}}Ot.ALPHANUMERIC_CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",Ot.GB2312_SUBSET=1;class y2{constructor(t){this.mirrored=t}isMirrored(){return this.mirrored}applyMirroredCorrection(t){if(!this.mirrored||t===null||t.length<3)return;const e=t[0];t[0]=t[2],t[2]=e}}class pr{constructor(){this.rsDecoder=new o1(gt.QR_CODE_FIELD_256)}decodeBooleanArray(t,e){return this.decodeBitMatrix(Ut.parseFromBooleanArray(t),e)}decodeBitMatrix(t,e){const a=new lr(t);let n=null;try{return this.decodeBitMatrixParser(a,e)}catch(r){n=r}try{a.remask(),a.setMirror(!0),a.readVersion(),a.readFormatInformation(),a.mirror();const r=this.decodeBitMatrixParser(a,e);return r.setOther(new y2(!0)),r}catch(r){throw n!==null?n:r}}decodeBitMatrixParser(t,e){const a=t.readVersion(),n=t.readFormatInformation().getErrorCorrectionLevel(),r=t.readCodewords(),s=K1.getDataBlocks(r,a,n);let h=0;for(const p of s)h+=p.getNumDataCodewords();const o=new Uint8Array(h);let c=0;for(const p of s){const x=p.getCodewords(),y=p.getNumDataCodewords();this.correctErrors(x,y);for(let A=0;A<y;A++)o[c++]=x[A]}return Ot.decode(o,a,n,e)}correctErrors(t,e){const a=new Int32Array(t);try{this.rsDecoder.decode(a,t.length-e)}catch{throw new z}for(let n=0;n<e;n++)t[n]=a[n]}}class Q1 extends W{constructor(t,e,a){super(t,e),this.estimatedModuleSize=a}aboutEquals(t,e,a){if(Math.abs(e-this.getY())<=t&&Math.abs(a-this.getX())<=t){const n=Math.abs(t-this.estimatedModuleSize);return n<=1||n<=this.estimatedModuleSize}return!1}combineEstimate(t,e,a){const n=(this.getX()+e)/2,r=(this.getY()+t)/2,s=(this.estimatedModuleSize+a)/2;return new Q1(n,r,s)}}class S1{constructor(t,e,a,n,r,s,h){this.image=t,this.startX=e,this.startY=a,this.width=n,this.height=r,this.moduleSize=s,this.resultPointCallback=h,this.possibleCenters=[],this.crossCheckStateCount=new Int32Array(3)}find(){const t=this.startX,e=this.height,a=this.width,n=t+a,r=this.startY+e/2,s=new Int32Array(3),h=this.image;for(let o=0;o<e;o++){const c=r+(o&1?-Math.floor((o+1)/2):Math.floor((o+1)/2));s[0]=0,s[1]=0,s[2]=0;let p=t;for(;p<n&&!h.get(p,c);)p++;let x=0;for(;p<n;){if(h.get(p,c))if(x===1)s[1]++;else if(x===2){if(this.foundPatternCross(s)){const y=this.handlePossibleCenter(s,c,p);if(y!==null)return y}s[0]=s[2],s[1]=1,s[2]=0,x=1}else s[++x]++;else x===1&&x++,s[x]++;p++}if(this.foundPatternCross(s)){const y=this.handlePossibleCenter(s,c,n);if(y!==null)return y}}if(this.possibleCenters.length!==0)return this.possibleCenters[0];throw new L}static centerFromEnd(t,e){return e-t[2]-t[1]/2}foundPatternCross(t){const e=this.moduleSize,a=e/2;for(let n=0;n<3;n++)if(Math.abs(e-t[n])>=a)return!1;return!0}crossCheckVertical(t,e,a,n){const r=this.image,s=r.getHeight(),h=this.crossCheckStateCount;h[0]=0,h[1]=0,h[2]=0;let o=t;for(;o>=0&&r.get(e,o)&&h[1]<=a;)h[1]++,o--;if(o<0||h[1]>a)return NaN;for(;o>=0&&!r.get(e,o)&&h[0]<=a;)h[0]++,o--;if(h[0]>a)return NaN;for(o=t+1;o<s&&r.get(e,o)&&h[1]<=a;)h[1]++,o++;if(o===s||h[1]>a)return NaN;for(;o<s&&!r.get(e,o)&&h[2]<=a;)h[2]++,o++;if(h[2]>a)return NaN;const c=h[0]+h[1]+h[2];return 5*Math.abs(c-n)>=2*n?NaN:this.foundPatternCross(h)?S1.centerFromEnd(h,o):NaN}handlePossibleCenter(t,e,a){const n=t[0]+t[1]+t[2],r=S1.centerFromEnd(t,a),s=this.crossCheckVertical(e,r,2*t[1],n);if(!isNaN(s)){const h=(t[0]+t[1]+t[2])/3;for(const c of this.possibleCenters)if(c.aboutEquals(h,s,r))return c.combineEstimate(s,r,h);const o=new Q1(r,s,h);this.possibleCenters.push(o),this.resultPointCallback!==null&&this.resultPointCallback!==void 0&&this.resultPointCallback.foundPossibleResultPoint(o)}return null}}class J1 extends W{constructor(t,e,a,n){super(t,e),this.estimatedModuleSize=a,this.count=n,n===void 0&&(this.count=1)}getEstimatedModuleSize(){return this.estimatedModuleSize}getCount(){return this.count}aboutEquals(t,e,a){if(Math.abs(e-this.getY())<=t&&Math.abs(a-this.getX())<=t){const n=Math.abs(t-this.estimatedModuleSize);return n<=1||n<=this.estimatedModuleSize}return!1}combineEstimate(t,e,a){const n=this.count+1,r=(this.count*this.getX()+e)/n,s=(this.count*this.getY()+t)/n,h=(this.count*this.estimatedModuleSize+a)/n;return new J1(r,s,h,n)}}class ur{constructor(t){this.bottomLeft=t[0],this.topLeft=t[1],this.topRight=t[2]}getBottomLeft(){return this.bottomLeft}getTopLeft(){return this.topLeft}getTopRight(){return this.topRight}}class zt{constructor(t,e){this.image=t,this.resultPointCallback=e,this.possibleCenters=[],this.crossCheckStateCount=new Int32Array(5),this.resultPointCallback=e}getImage(){return this.image}getPossibleCenters(){return this.possibleCenters}find(t){const e=t!=null&&t.get(ut.TRY_HARDER)!==void 0,a=t!=null&&t.get(ut.PURE_BARCODE)!==void 0,n=this.image,r=n.getHeight(),s=n.getWidth();let h=Math.floor(3*r/(4*zt.MAX_MODULES));(h<zt.MIN_SKIP||e)&&(h=zt.MIN_SKIP);let o=!1;const c=new Int32Array(5);for(let x=h-1;x<r&&!o;x+=h){c[0]=0,c[1]=0,c[2]=0,c[3]=0,c[4]=0;let y=0;for(let A=0;A<s;A++)if(n.get(A,x))(y&1)===1&&y++,c[y]++;else if(y&1)c[y]++;else if(y===4)if(zt.foundPatternCross(c)){if(this.handlePossibleCenter(c,x,A,a)===!0)if(h=2,this.hasSkipped===!0)o=this.haveMultiplyConfirmedCenters();else{const I=this.findRowSkip();I>c[2]&&(x+=I-c[2]-h,A=s-1)}else{c[0]=c[2],c[1]=c[3],c[2]=c[4],c[3]=1,c[4]=0,y=3;continue}y=0,c[0]=0,c[1]=0,c[2]=0,c[3]=0,c[4]=0}else c[0]=c[2],c[1]=c[3],c[2]=c[4],c[3]=1,c[4]=0,y=3;else c[++y]++;zt.foundPatternCross(c)&&this.handlePossibleCenter(c,x,s,a)===!0&&(h=c[0],this.hasSkipped&&(o=this.haveMultiplyConfirmedCenters()))}const p=this.selectBestPatterns();return W.orderBestPatterns(p),new ur(p)}static centerFromEnd(t,e){return e-t[4]-t[3]-t[2]/2}static foundPatternCross(t){let e=0;for(let r=0;r<5;r++){const s=t[r];if(s===0)return!1;e+=s}if(e<7)return!1;const a=e/7,n=a/2;return Math.abs(a-t[0])<n&&Math.abs(a-t[1])<n&&Math.abs(3*a-t[2])<3*n&&Math.abs(a-t[3])<n&&Math.abs(a-t[4])<n}getCrossCheckStateCount(){const t=this.crossCheckStateCount;return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t}crossCheckDiagonal(t,e,a,n){const r=this.getCrossCheckStateCount();let s=0;const h=this.image;for(;t>=s&&e>=s&&h.get(e-s,t-s);)r[2]++,s++;if(t<s||e<s)return!1;for(;t>=s&&e>=s&&!h.get(e-s,t-s)&&r[1]<=a;)r[1]++,s++;if(t<s||e<s||r[1]>a)return!1;for(;t>=s&&e>=s&&h.get(e-s,t-s)&&r[0]<=a;)r[0]++,s++;if(r[0]>a)return!1;const o=h.getHeight(),c=h.getWidth();for(s=1;t+s<o&&e+s<c&&h.get(e+s,t+s);)r[2]++,s++;if(t+s>=o||e+s>=c)return!1;for(;t+s<o&&e+s<c&&!h.get(e+s,t+s)&&r[3]<a;)r[3]++,s++;if(t+s>=o||e+s>=c||r[3]>=a)return!1;for(;t+s<o&&e+s<c&&h.get(e+s,t+s)&&r[4]<a;)r[4]++,s++;if(r[4]>=a)return!1;const p=r[0]+r[1]+r[2]+r[3]+r[4];return Math.abs(p-n)<2*n&&zt.foundPatternCross(r)}crossCheckVertical(t,e,a,n){const r=this.image,s=r.getHeight(),h=this.getCrossCheckStateCount();let o=t;for(;o>=0&&r.get(e,o);)h[2]++,o--;if(o<0)return NaN;for(;o>=0&&!r.get(e,o)&&h[1]<=a;)h[1]++,o--;if(o<0||h[1]>a)return NaN;for(;o>=0&&r.get(e,o)&&h[0]<=a;)h[0]++,o--;if(h[0]>a)return NaN;for(o=t+1;o<s&&r.get(e,o);)h[2]++,o++;if(o===s)return NaN;for(;o<s&&!r.get(e,o)&&h[3]<a;)h[3]++,o++;if(o===s||h[3]>=a)return NaN;for(;o<s&&r.get(e,o)&&h[4]<a;)h[4]++,o++;if(h[4]>=a)return NaN;const c=h[0]+h[1]+h[2]+h[3]+h[4];return 5*Math.abs(c-n)>=2*n?NaN:zt.foundPatternCross(h)?zt.centerFromEnd(h,o):NaN}crossCheckHorizontal(t,e,a,n){const r=this.image,s=r.getWidth(),h=this.getCrossCheckStateCount();let o=t;for(;o>=0&&r.get(o,e);)h[2]++,o--;if(o<0)return NaN;for(;o>=0&&!r.get(o,e)&&h[1]<=a;)h[1]++,o--;if(o<0||h[1]>a)return NaN;for(;o>=0&&r.get(o,e)&&h[0]<=a;)h[0]++,o--;if(h[0]>a)return NaN;for(o=t+1;o<s&&r.get(o,e);)h[2]++,o++;if(o===s)return NaN;for(;o<s&&!r.get(o,e)&&h[3]<a;)h[3]++,o++;if(o===s||h[3]>=a)return NaN;for(;o<s&&r.get(o,e)&&h[4]<a;)h[4]++,o++;if(h[4]>=a)return NaN;const c=h[0]+h[1]+h[2]+h[3]+h[4];return 5*Math.abs(c-n)>=n?NaN:zt.foundPatternCross(h)?zt.centerFromEnd(h,o):NaN}handlePossibleCenter(t,e,a,n){const r=t[0]+t[1]+t[2]+t[3]+t[4];let s=zt.centerFromEnd(t,a),h=this.crossCheckVertical(e,Math.floor(s),t[2],r);if(!isNaN(h)&&(s=this.crossCheckHorizontal(Math.floor(s),Math.floor(h),t[2],r),!isNaN(s)&&(!n||this.crossCheckDiagonal(Math.floor(h),Math.floor(s),t[2],r)))){const o=r/7;let c=!1;const p=this.possibleCenters;for(let x=0,y=p.length;x<y;x++){const A=p[x];if(A.aboutEquals(o,h,s)){p[x]=A.combineEstimate(h,s,o),c=!0;break}}if(!c){const x=new J1(s,h,o);p.push(x),this.resultPointCallback!==null&&this.resultPointCallback!==void 0&&this.resultPointCallback.foundPossibleResultPoint(x)}return!0}return!1}findRowSkip(){if(this.possibleCenters.length<=1)return 0;let e=null;for(const a of this.possibleCenters)if(a.getCount()>=zt.CENTER_QUORUM)if(e==null)e=a;else return this.hasSkipped=!0,Math.floor((Math.abs(e.getX()-a.getX())-Math.abs(e.getY()-a.getY()))/2);return 0}haveMultiplyConfirmedCenters(){let t=0,e=0;const a=this.possibleCenters.length;for(const s of this.possibleCenters)s.getCount()>=zt.CENTER_QUORUM&&(t++,e+=s.getEstimatedModuleSize());if(t<3)return!1;const n=e/a;let r=0;for(const s of this.possibleCenters)r+=Math.abs(s.getEstimatedModuleSize()-n);return r<=.05*e}selectBestPatterns(){const t=this.possibleCenters.length;if(t<3)throw new L;const e=this.possibleCenters;let a;if(t>3){let n=0,r=0;for(const o of this.possibleCenters){const c=o.getEstimatedModuleSize();n+=c,r+=c*c}a=n/t;let s=Math.sqrt(r/t-a*a);e.sort((o,c)=>{const p=Math.abs(c.getEstimatedModuleSize()-a),x=Math.abs(o.getEstimatedModuleSize()-a);return p<x?-1:p>x?1:0});const h=Math.max(.2*a,s);for(let o=0;o<e.length&&e.length>3;o++){const c=e[o];Math.abs(c.getEstimatedModuleSize()-a)>h&&(e.splice(o,1),o--)}}if(e.length>3){let n=0;for(const r of e)n+=r.getEstimatedModuleSize();a=n/e.length,e.sort((r,s)=>{if(s.getCount()===r.getCount()){const h=Math.abs(s.getEstimatedModuleSize()-a),o=Math.abs(r.getEstimatedModuleSize()-a);return h<o?1:h>o?-1:0}else return s.getCount()-r.getCount()}),e.splice(3)}return[e[0],e[1],e[2]]}}zt.CENTER_QUORUM=2,zt.MIN_SKIP=3,zt.MAX_MODULES=57;class d1{constructor(t){this.image=t}getImage(){return this.image}getResultPointCallback(){return this.resultPointCallback}detect(t){this.resultPointCallback=t==null?null:t.get(ut.NEED_RESULT_POINT_CALLBACK);const a=new zt(this.image,this.resultPointCallback).find(t);return this.processFinderPatternInfo(a)}processFinderPatternInfo(t){const e=t.getTopLeft(),a=t.getTopRight(),n=t.getBottomLeft(),r=this.calculateModuleSize(e,a,n);if(r<1)throw new L("No pattern found in proccess finder.");const s=d1.computeDimension(e,a,n,r),h=X.getProvisionalVersionForDimension(s),o=h.getDimensionForVersion()-7;let c=null;if(h.getAlignmentPatternCenters().length>0){const A=a.getX()-e.getX()+n.getX(),E=a.getY()-e.getY()+n.getY(),I=1-3/o,S=Math.floor(e.getX()+I*(A-e.getX())),O=Math.floor(e.getY()+I*(E-e.getY()));for(let H=4;H<=16;H<<=1)try{c=this.findAlignmentInRegion(r,S,O,H);break}catch(F){if(!(F instanceof L))throw F}}const p=d1.createTransform(e,a,n,c,s),x=d1.sampleGrid(this.image,p,s);let y;return c===null?y=[n,e,a]:y=[n,e,a,c],new A1(x,y)}static createTransform(t,e,a,n,r){const s=r-3.5;let h,o,c,p;return n!==null?(h=n.getX(),o=n.getY(),c=s-3,p=c):(h=e.getX()-t.getX()+a.getX(),o=e.getY()-t.getY()+a.getY(),c=s,p=s),xe.quadrilateralToQuadrilateral(3.5,3.5,s,3.5,c,p,3.5,s,t.getX(),t.getY(),e.getX(),e.getY(),h,o,a.getX(),a.getY())}static sampleGrid(t,e,a){return Re.getInstance().sampleGridWithTransform(t,a,a,e)}static computeDimension(t,e,a,n){const r=dt.round(W.distance(t,e)/n),s=dt.round(W.distance(t,a)/n);let h=Math.floor((r+s)/2)+7;switch(h&3){case 0:h++;break;case 2:h--;break;case 3:throw new L("Dimensions could be not found.")}return h}calculateModuleSize(t,e,a){return(this.calculateModuleSizeOneWay(t,e)+this.calculateModuleSizeOneWay(t,a))/2}calculateModuleSizeOneWay(t,e){const a=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(t.getX()),Math.floor(t.getY()),Math.floor(e.getX()),Math.floor(e.getY())),n=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(e.getX()),Math.floor(e.getY()),Math.floor(t.getX()),Math.floor(t.getY()));return isNaN(a)?n/7:isNaN(n)?a/7:(a+n)/14}sizeOfBlackWhiteBlackRunBothWays(t,e,a,n){let r=this.sizeOfBlackWhiteBlackRun(t,e,a,n),s=1,h=t-(a-t);h<0?(s=t/(t-h),h=0):h>=this.image.getWidth()&&(s=(this.image.getWidth()-1-t)/(h-t),h=this.image.getWidth()-1);let o=Math.floor(e-(n-e)*s);return s=1,o<0?(s=e/(e-o),o=0):o>=this.image.getHeight()&&(s=(this.image.getHeight()-1-e)/(o-e),o=this.image.getHeight()-1),h=Math.floor(t+(h-t)*s),r+=this.sizeOfBlackWhiteBlackRun(t,e,h,o),r-1}sizeOfBlackWhiteBlackRun(t,e,a,n){const r=Math.abs(n-e)>Math.abs(a-t);if(r){let A=t;t=e,e=A,A=a,a=n,n=A}const s=Math.abs(a-t),h=Math.abs(n-e);let o=-s/2;const c=t<a?1:-1,p=e<n?1:-1;let x=0;const y=a+c;for(let A=t,E=e;A!==y;A+=c){const I=r?E:A,S=r?A:E;if(x===1===this.image.get(I,S)){if(x===2)return dt.distance(A,E,t,e);x++}if(o+=h,o>0){if(E===n)break;E+=p,o-=s}}return x===2?dt.distance(a+c,n,t,e):NaN}findAlignmentInRegion(t,e,a,n){const r=Math.floor(n*t),s=Math.max(0,e-r),h=Math.min(this.image.getWidth()-1,e+r);if(h-s<t*3)throw new L("Alignment top exceeds estimated module size.");const o=Math.max(0,a-r),c=Math.min(this.image.getHeight()-1,a+r);if(c-o<t*3)throw new L("Alignment bottom exceeds estimated module size.");return new S1(this.image,s,o,h-s,c-o,t,this.resultPointCallback).find()}}class Le{constructor(){this.decoder=new pr}getDecoder(){return this.decoder}decode(t,e){let a,n;if(e!=null&&e.get(ut.PURE_BARCODE)!==void 0){const o=Le.extractPureBits(t.getBlackMatrix());a=this.decoder.decodeBitMatrix(o,e),n=Le.NO_POINTS}else{const o=new d1(t.getBlackMatrix()).detect(e);a=this.decoder.decodeBitMatrix(o.getBits(),e),n=o.getPoints()}a.getOther()instanceof y2&&a.getOther().applyMirroredCorrection(n);const r=new $t(a.getText(),a.getRawBytes(),void 0,n,Q.QR_CODE,void 0),s=a.getByteSegments();s!==null&&r.putMetadata(Gt.BYTE_SEGMENTS,s);const h=a.getECLevel();return h!==null&&r.putMetadata(Gt.ERROR_CORRECTION_LEVEL,h),a.hasStructuredAppend()&&(r.putMetadata(Gt.STRUCTURED_APPEND_SEQUENCE,a.getStructuredAppendSequenceNumber()),r.putMetadata(Gt.STRUCTURED_APPEND_PARITY,a.getStructuredAppendParity())),r}reset(){}static extractPureBits(t){const e=t.getTopLeftOnBit(),a=t.getBottomRightOnBit();if(e===null||a===null)throw new L;const n=this.moduleSize(e,t);let r=e[1],s=a[1],h=e[0],o=a[0];if(h>=o||r>=s)throw new L;if(s-r!==o-h&&(o=h+(s-r),o>=t.getWidth()))throw new L;const c=Math.round((o-h+1)/n),p=Math.round((s-r+1)/n);if(c<=0||p<=0)throw new L;if(p!==c)throw new L;const x=Math.floor(n/2);r+=x,h+=x;const y=h+Math.floor((c-1)*n)-o;if(y>0){if(y>x)throw new L;h-=y}const A=r+Math.floor((p-1)*n)-s;if(A>0){if(A>x)throw new L;r-=A}const E=new Ut(c,p);for(let I=0;I<p;I++){const S=r+Math.floor(I*n);for(let O=0;O<c;O++)t.get(h+Math.floor(O*n),S)&&E.set(O,I)}return E}static moduleSize(t,e){const a=e.getHeight(),n=e.getWidth();let r=t[0],s=t[1],h=!0,o=0;for(;r<n&&s<a;){if(h!==e.get(r,s)){if(++o===5)break;h=!h}r++,s++}if(r===n||s===a)throw new L;return(r-t[0])/7}}Le.NO_POINTS=new Array;class ${PDF417Common(){}static getBitCountSum(t){return dt.sum(t)}static toIntArray(t){if(t==null||!t.length)return $.EMPTY_INT_ARRAY;const e=new Int32Array(t.length);let a=0;for(const n of t)e[a++]=n;return e}static getCodeword(t){const e=st.binarySearch($.SYMBOL_TABLE,t&262143);return e<0?-1:($.CODEWORD_TABLE[e]-1)%$.NUMBER_OF_CODEWORDS}}$.NUMBER_OF_CODEWORDS=929,$.MAX_CODEWORDS_IN_BARCODE=$.NUMBER_OF_CODEWORDS-1,$.MIN_ROWS_IN_BARCODE=3,$.MAX_ROWS_IN_BARCODE=90,$.MODULES_IN_CODEWORD=17,$.MODULES_IN_STOP_PATTERN=18,$.BARS_IN_MODULE=8,$.EMPTY_INT_ARRAY=new Int32Array([]),$.SYMBOL_TABLE=Int32Array.from([66142,66170,66206,66236,66290,66292,66350,66382,66396,66454,66470,66476,66594,66600,66614,66626,66628,66632,66640,66654,66662,66668,66682,66690,66718,66720,66748,66758,66776,66798,66802,66804,66820,66824,66832,66846,66848,66876,66880,66936,66950,66956,66968,66992,67006,67022,67036,67042,67044,67048,67062,67118,67150,67164,67214,67228,67256,67294,67322,67350,67366,67372,67398,67404,67416,67438,67474,67476,67490,67492,67496,67510,67618,67624,67650,67656,67664,67678,67686,67692,67706,67714,67716,67728,67742,67744,67772,67782,67788,67800,67822,67826,67828,67842,67848,67870,67872,67900,67904,67960,67974,67992,68016,68030,68046,68060,68066,68068,68072,68086,68104,68112,68126,68128,68156,68160,68216,68336,68358,68364,68376,68400,68414,68448,68476,68494,68508,68536,68546,68548,68552,68560,68574,68582,68588,68654,68686,68700,68706,68708,68712,68726,68750,68764,68792,68802,68804,68808,68816,68830,68838,68844,68858,68878,68892,68920,68976,68990,68994,68996,69e3,69008,69022,69024,69052,69062,69068,69080,69102,69106,69108,69142,69158,69164,69190,69208,69230,69254,69260,69272,69296,69310,69326,69340,69386,69394,69396,69410,69416,69430,69442,69444,69448,69456,69470,69478,69484,69554,69556,69666,69672,69698,69704,69712,69726,69754,69762,69764,69776,69790,69792,69820,69830,69836,69848,69870,69874,69876,69890,69918,69920,69948,69952,70008,70022,70040,70064,70078,70094,70108,70114,70116,70120,70134,70152,70174,70176,70264,70384,70412,70448,70462,70496,70524,70542,70556,70584,70594,70600,70608,70622,70630,70636,70664,70672,70686,70688,70716,70720,70776,70896,71136,71180,71192,71216,71230,71264,71292,71360,71416,71452,71480,71536,71550,71554,71556,71560,71568,71582,71584,71612,71622,71628,71640,71662,71726,71732,71758,71772,71778,71780,71784,71798,71822,71836,71864,71874,71880,71888,71902,71910,71916,71930,71950,71964,71992,72048,72062,72066,72068,72080,72094,72096,72124,72134,72140,72152,72174,72178,72180,72206,72220,72248,72304,72318,72416,72444,72456,72464,72478,72480,72508,72512,72568,72588,72600,72624,72638,72654,72668,72674,72676,72680,72694,72726,72742,72748,72774,72780,72792,72814,72838,72856,72880,72894,72910,72924,72930,72932,72936,72950,72966,72972,72984,73008,73022,73056,73084,73102,73116,73144,73156,73160,73168,73182,73190,73196,73210,73226,73234,73236,73250,73252,73256,73270,73282,73284,73296,73310,73318,73324,73346,73348,73352,73360,73374,73376,73404,73414,73420,73432,73454,73498,73518,73522,73524,73550,73564,73570,73572,73576,73590,73800,73822,73858,73860,73872,73886,73888,73916,73944,73970,73972,73992,74014,74016,74044,74048,74104,74118,74136,74160,74174,74210,74212,74216,74230,74244,74256,74270,74272,74360,74480,74502,74508,74544,74558,74592,74620,74638,74652,74680,74690,74696,74704,74726,74732,74782,74784,74812,74992,75232,75288,75326,75360,75388,75456,75512,75576,75632,75646,75650,75652,75664,75678,75680,75708,75718,75724,75736,75758,75808,75836,75840,75896,76016,76256,76736,76824,76848,76862,76896,76924,76992,77048,77296,77340,77368,77424,77438,77536,77564,77572,77576,77584,77600,77628,77632,77688,77702,77708,77720,77744,77758,77774,77788,77870,77902,77916,77922,77928,77966,77980,78008,78018,78024,78032,78046,78060,78074,78094,78136,78192,78206,78210,78212,78224,78238,78240,78268,78278,78284,78296,78322,78324,78350,78364,78448,78462,78560,78588,78600,78622,78624,78652,78656,78712,78726,78744,78768,78782,78798,78812,78818,78820,78824,78838,78862,78876,78904,78960,78974,79072,79100,79296,79352,79368,79376,79390,79392,79420,79424,79480,79600,79628,79640,79664,79678,79712,79740,79772,79800,79810,79812,79816,79824,79838,79846,79852,79894,79910,79916,79942,79948,79960,79982,79988,80006,80024,80048,80062,80078,80092,80098,80100,80104,80134,80140,80176,80190,80224,80252,80270,80284,80312,80328,80336,80350,80358,80364,80378,80390,80396,80408,80432,80446,80480,80508,80576,80632,80654,80668,80696,80752,80766,80776,80784,80798,80800,80828,80844,80856,80878,80882,80884,80914,80916,80930,80932,80936,80950,80962,80968,80976,80990,80998,81004,81026,81028,81040,81054,81056,81084,81094,81100,81112,81134,81154,81156,81160,81168,81182,81184,81212,81216,81272,81286,81292,81304,81328,81342,81358,81372,81380,81384,81398,81434,81454,81458,81460,81486,81500,81506,81508,81512,81526,81550,81564,81592,81602,81604,81608,81616,81630,81638,81644,81702,81708,81722,81734,81740,81752,81774,81778,81780,82050,82078,82080,82108,82180,82184,82192,82206,82208,82236,82240,82296,82316,82328,82352,82366,82402,82404,82408,82440,82448,82462,82464,82492,82496,82552,82672,82694,82700,82712,82736,82750,82784,82812,82830,82882,82884,82888,82896,82918,82924,82952,82960,82974,82976,83004,83008,83064,83184,83424,83468,83480,83504,83518,83552,83580,83648,83704,83740,83768,83824,83838,83842,83844,83848,83856,83872,83900,83910,83916,83928,83950,83984,84e3,84028,84032,84088,84208,84448,84928,85040,85054,85088,85116,85184,85240,85488,85560,85616,85630,85728,85756,85764,85768,85776,85790,85792,85820,85824,85880,85894,85900,85912,85936,85966,85980,86048,86080,86136,86256,86496,86976,88160,88188,88256,88312,88560,89056,89200,89214,89312,89340,89536,89592,89608,89616,89632,89664,89720,89840,89868,89880,89904,89952,89980,89998,90012,90040,90190,90204,90254,90268,90296,90306,90308,90312,90334,90382,90396,90424,90480,90494,90500,90504,90512,90526,90528,90556,90566,90572,90584,90610,90612,90638,90652,90680,90736,90750,90848,90876,90884,90888,90896,90910,90912,90940,90944,91e3,91014,91020,91032,91056,91070,91086,91100,91106,91108,91112,91126,91150,91164,91192,91248,91262,91360,91388,91584,91640,91664,91678,91680,91708,91712,91768,91888,91928,91952,91966,92e3,92028,92046,92060,92088,92098,92100,92104,92112,92126,92134,92140,92188,92216,92272,92384,92412,92608,92664,93168,93200,93214,93216,93244,93248,93304,93424,93664,93720,93744,93758,93792,93820,93888,93944,93980,94008,94064,94078,94084,94088,94096,94110,94112,94140,94150,94156,94168,94246,94252,94278,94284,94296,94318,94342,94348,94360,94384,94398,94414,94428,94440,94470,94476,94488,94512,94526,94560,94588,94606,94620,94648,94658,94660,94664,94672,94686,94694,94700,94714,94726,94732,94744,94768,94782,94816,94844,94912,94968,94990,95004,95032,95088,95102,95112,95120,95134,95136,95164,95180,95192,95214,95218,95220,95244,95256,95280,95294,95328,95356,95424,95480,95728,95758,95772,95800,95856,95870,95968,95996,96008,96016,96030,96032,96060,96064,96120,96152,96176,96190,96220,96226,96228,96232,96290,96292,96296,96310,96322,96324,96328,96336,96350,96358,96364,96386,96388,96392,96400,96414,96416,96444,96454,96460,96472,96494,96498,96500,96514,96516,96520,96528,96542,96544,96572,96576,96632,96646,96652,96664,96688,96702,96718,96732,96738,96740,96744,96758,96772,96776,96784,96798,96800,96828,96832,96888,97008,97030,97036,97048,97072,97086,97120,97148,97166,97180,97208,97220,97224,97232,97246,97254,97260,97326,97330,97332,97358,97372,97378,97380,97384,97398,97422,97436,97464,97474,97476,97480,97488,97502,97510,97516,97550,97564,97592,97648,97666,97668,97672,97680,97694,97696,97724,97734,97740,97752,97774,97830,97836,97850,97862,97868,97880,97902,97906,97908,97926,97932,97944,97968,97998,98012,98018,98020,98024,98038,98618,98674,98676,98838,98854,98874,98892,98904,98926,98930,98932,98968,99006,99042,99044,99048,99062,99166,99194,99246,99286,99350,99366,99372,99386,99398,99416,99438,99442,99444,99462,99504,99518,99534,99548,99554,99556,99560,99574,99590,99596,99608,99632,99646,99680,99708,99726,99740,99768,99778,99780,99784,99792,99806,99814,99820,99834,99858,99860,99874,99880,99894,99906,99920,99934,99962,99970,99972,99976,99984,99998,1e5,100028,100038,100044,100056,100078,100082,100084,100142,100174,100188,100246,100262,100268,100306,100308,100390,100396,100410,100422,100428,100440,100462,100466,100468,100486,100504,100528,100542,100558,100572,100578,100580,100584,100598,100620,100656,100670,100704,100732,100750,100792,100802,100808,100816,100830,100838,100844,100858,100888,100912,100926,100960,100988,101056,101112,101148,101176,101232,101246,101250,101252,101256,101264,101278,101280,101308,101318,101324,101336,101358,101362,101364,101410,101412,101416,101430,101442,101448,101456,101470,101478,101498,101506,101508,101520,101534,101536,101564,101580,101618,101620,101636,101640,101648,101662,101664,101692,101696,101752,101766,101784,101838,101858,101860,101864,101934,101938,101940,101966,101980,101986,101988,101992,102030,102044,102072,102082,102084,102088,102096,102138,102166,102182,102188,102214,102220,102232,102254,102282,102290,102292,102306,102308,102312,102326,102444,102458,102470,102476,102488,102514,102516,102534,102552,102576,102590,102606,102620,102626,102632,102646,102662,102668,102704,102718,102752,102780,102798,102812,102840,102850,102856,102864,102878,102886,102892,102906,102936,102974,103008,103036,103104,103160,103224,103280,103294,103298,103300,103312,103326,103328,103356,103366,103372,103384,103406,103410,103412,103472,103486,103520,103548,103616,103672,103920,103992,104048,104062,104160,104188,104194,104196,104200,104208,104224,104252,104256,104312,104326,104332,104344,104368,104382,104398,104412,104418,104420,104424,104482,104484,104514,104520,104528,104542,104550,104570,104578,104580,104592,104606,104608,104636,104652,104690,104692,104706,104712,104734,104736,104764,104768,104824,104838,104856,104910,104930,104932,104936,104968,104976,104990,104992,105020,105024,105080,105200,105240,105278,105312,105372,105410,105412,105416,105424,105446,105518,105524,105550,105564,105570,105572,105576,105614,105628,105656,105666,105672,105680,105702,105722,105742,105756,105784,105840,105854,105858,105860,105864,105872,105888,105932,105970,105972,106006,106022,106028,106054,106060,106072,106100,106118,106124,106136,106160,106174,106190,106210,106212,106216,106250,106258,106260,106274,106276,106280,106306,106308,106312,106320,106334,106348,106394,106414,106418,106420,106566,106572,106610,106612,106630,106636,106648,106672,106686,106722,106724,106728,106742,106758,106764,106776,106800,106814,106848,106876,106894,106908,106936,106946,106948,106952,106960,106974,106982,106988,107032,107056,107070,107104,107132,107200,107256,107292,107320,107376,107390,107394,107396,107400,107408,107422,107424,107452,107462,107468,107480,107502,107506,107508,107544,107568,107582,107616,107644,107712,107768,108016,108060,108088,108144,108158,108256,108284,108290,108292,108296,108304,108318,108320,108348,108352,108408,108422,108428,108440,108464,108478,108494,108508,108514,108516,108520,108592,108640,108668,108736,108792,109040,109536,109680,109694,109792,109820,110016,110072,110084,110088,110096,110112,110140,110144,110200,110320,110342,110348,110360,110384,110398,110432,110460,110478,110492,110520,110532,110536,110544,110558,110658,110686,110714,110722,110724,110728,110736,110750,110752,110780,110796,110834,110836,110850,110852,110856,110864,110878,110880,110908,110912,110968,110982,111e3,111054,111074,111076,111080,111108,111112,111120,111134,111136,111164,111168,111224,111344,111372,111422,111456,111516,111554,111556,111560,111568,111590,111632,111646,111648,111676,111680,111736,111856,112096,112152,112224,112252,112320,112440,112514,112516,112520,112528,112542,112544,112588,112686,112718,112732,112782,112796,112824,112834,112836,112840,112848,112870,112890,112910,112924,112952,113008,113022,113026,113028,113032,113040,113054,113056,113100,113138,113140,113166,113180,113208,113264,113278,113376,113404,113416,113424,113440,113468,113472,113560,113614,113634,113636,113640,113686,113702,113708,113734,113740,113752,113778,113780,113798,113804,113816,113840,113854,113870,113890,113892,113896,113926,113932,113944,113968,113982,114016,114044,114076,114114,114116,114120,114128,114150,114170,114194,114196,114210,114212,114216,114242,114244,114248,114256,114270,114278,114306,114308,114312,114320,114334,114336,114364,114380,114420,114458,114478,114482,114484,114510,114524,114530,114532,114536,114842,114866,114868,114970,114994,114996,115042,115044,115048,115062,115130,115226,115250,115252,115278,115292,115298,115300,115304,115318,115342,115394,115396,115400,115408,115422,115430,115436,115450,115478,115494,115514,115526,115532,115570,115572,115738,115758,115762,115764,115790,115804,115810,115812,115816,115830,115854,115868,115896,115906,115912,115920,115934,115942,115948,115962,115996,116024,116080,116094,116098,116100,116104,116112,116126,116128,116156,116166,116172,116184,116206,116210,116212,116246,116262,116268,116282,116294,116300,116312,116334,116338,116340,116358,116364,116376,116400,116414,116430,116444,116450,116452,116456,116498,116500,116514,116520,116534,116546,116548,116552,116560,116574,116582,116588,116602,116654,116694,116714,116762,116782,116786,116788,116814,116828,116834,116836,116840,116854,116878,116892,116920,116930,116936,116944,116958,116966,116972,116986,117006,117048,117104,117118,117122,117124,117136,117150,117152,117180,117190,117196,117208,117230,117234,117236,117304,117360,117374,117472,117500,117506,117508,117512,117520,117536,117564,117568,117624,117638,117644,117656,117680,117694,117710,117724,117730,117732,117736,117750,117782,117798,117804,117818,117830,117848,117874,117876,117894,117936,117950,117966,117986,117988,117992,118022,118028,118040,118064,118078,118112,118140,118172,118210,118212,118216,118224,118238,118246,118266,118306,118312,118338,118352,118366,118374,118394,118402,118404,118408,118416,118430,118432,118460,118476,118514,118516,118574,118578,118580,118606,118620,118626,118628,118632,118678,118694,118700,118730,118738,118740,118830,118834,118836,118862,118876,118882,118884,118888,118902,118926,118940,118968,118978,118980,118984,118992,119006,119014,119020,119034,119068,119096,119152,119166,119170,119172,119176,119184,119198,119200,119228,119238,119244,119256,119278,119282,119284,119324,119352,119408,119422,119520,119548,119554,119556,119560,119568,119582,119584,119612,119616,119672,119686,119692,119704,119728,119742,119758,119772,119778,119780,119784,119798,119920,119934,120032,120060,120256,120312,120324,120328,120336,120352,120384,120440,120560,120582,120588,120600,120624,120638,120672,120700,120718,120732,120760,120770,120772,120776,120784,120798,120806,120812,120870,120876,120890,120902,120908,120920,120946,120948,120966,120972,120984,121008,121022,121038,121058,121060,121064,121078,121100,121112,121136,121150,121184,121212,121244,121282,121284,121288,121296,121318,121338,121356,121368,121392,121406,121440,121468,121536,121592,121656,121730,121732,121736,121744,121758,121760,121804,121842,121844,121890,121922,121924,121928,121936,121950,121958,121978,121986,121988,121992,122e3,122014,122016,122044,122060,122098,122100,122116,122120,122128,122142,122144,122172,122176,122232,122246,122264,122318,122338,122340,122344,122414,122418,122420,122446,122460,122466,122468,122472,122510,122524,122552,122562,122564,122568,122576,122598,122618,122646,122662,122668,122694,122700,122712,122738,122740,122762,122770,122772,122786,122788,122792,123018,123026,123028,123042,123044,123048,123062,123098,123146,123154,123156,123170,123172,123176,123190,123202,123204,123208,123216,123238,123244,123258,123290,123314,123316,123402,123410,123412,123426,123428,123432,123446,123458,123464,123472,123486,123494,123500,123514,123522,123524,123528,123536,123552,123580,123590,123596,123608,123630,123634,123636,123674,123698,123700,123740,123746,123748,123752,123834,123914,123922,123924,123938,123944,123958,123970,123976,123984,123998,124006,124012,124026,124034,124036,124048,124062,124064,124092,124102,124108,124120,124142,124146,124148,124162,124164,124168,124176,124190,124192,124220,124224,124280,124294,124300,124312,124336,124350,124366,124380,124386,124388,124392,124406,124442,124462,124466,124468,124494,124508,124514,124520,124558,124572,124600,124610,124612,124616,124624,124646,124666,124694,124710,124716,124730,124742,124748,124760,124786,124788,124818,124820,124834,124836,124840,124854,124946,124948,124962,124964,124968,124982,124994,124996,125e3,125008,125022,125030,125036,125050,125058,125060,125064,125072,125086,125088,125116,125126,125132,125144,125166,125170,125172,125186,125188,125192,125200,125216,125244,125248,125304,125318,125324,125336,125360,125374,125390,125404,125410,125412,125416,125430,125444,125448,125456,125472,125504,125560,125680,125702,125708,125720,125744,125758,125792,125820,125838,125852,125880,125890,125892,125896,125904,125918,125926,125932,125978,125998,126002,126004,126030,126044,126050,126052,126056,126094,126108,126136,126146,126148,126152,126160,126182,126202,126222,126236,126264,126320,126334,126338,126340,126344,126352,126366,126368,126412,126450,126452,126486,126502,126508,126522,126534,126540,126552,126574,126578,126580,126598,126604,126616,126640,126654,126670,126684,126690,126692,126696,126738,126754,126756,126760,126774,126786,126788,126792,126800,126814,126822,126828,126842,126894,126898,126900,126934,127126,127142,127148,127162,127178,127186,127188,127254,127270,127276,127290,127302,127308,127320,127342,127346,127348,127370,127378,127380,127394,127396,127400,127450,127510,127526,127532,127546,127558,127576,127598,127602,127604,127622,127628,127640,127664,127678,127694,127708,127714,127716,127720,127734,127754,127762,127764,127778,127784,127810,127812,127816,127824,127838,127846,127866,127898,127918,127922,127924,128022,128038,128044,128058,128070,128076,128088,128110,128114,128116,128134,128140,128152,128176,128190,128206,128220,128226,128228,128232,128246,128262,128268,128280,128304,128318,128352,128380,128398,128412,128440,128450,128452,128456,128464,128478,128486,128492,128506,128522,128530,128532,128546,128548,128552,128566,128578,128580,128584,128592,128606,128614,128634,128642,128644,128648,128656,128670,128672,128700,128716,128754,128756,128794,128814,128818,128820,128846,128860,128866,128868,128872,128886,128918,128934,128940,128954,128978,128980,129178,129198,129202,129204,129238,129258,129306,129326,129330,129332,129358,129372,129378,129380,129384,129398,129430,129446,129452,129466,129482,129490,129492,129562,129582,129586,129588,129614,129628,129634,129636,129640,129654,129678,129692,129720,129730,129732,129736,129744,129758,129766,129772,129814,129830,129836,129850,129862,129868,129880,129902,129906,129908,129930,129938,129940,129954,129956,129960,129974,130010]),$.CODEWORD_TABLE=Int32Array.from([2627,1819,2622,2621,1813,1812,2729,2724,2723,2779,2774,2773,902,896,908,868,865,861,859,2511,873,871,1780,835,2493,825,2491,842,837,844,1764,1762,811,810,809,2483,807,2482,806,2480,815,814,813,812,2484,817,816,1745,1744,1742,1746,2655,2637,2635,2626,2625,2623,2628,1820,2752,2739,2737,2728,2727,2725,2730,2785,2783,2778,2777,2775,2780,787,781,747,739,736,2413,754,752,1719,692,689,681,2371,678,2369,700,697,694,703,1688,1686,642,638,2343,631,2341,627,2338,651,646,643,2345,654,652,1652,1650,1647,1654,601,599,2322,596,2321,594,2319,2317,611,610,608,606,2324,603,2323,615,614,612,1617,1616,1614,1612,616,1619,1618,2575,2538,2536,905,901,898,909,2509,2507,2504,870,867,864,860,2512,875,872,1781,2490,2489,2487,2485,1748,836,834,832,830,2494,827,2492,843,841,839,845,1765,1763,2701,2676,2674,2653,2648,2656,2634,2633,2631,2629,1821,2638,2636,2770,2763,2761,2750,2745,2753,2736,2735,2733,2731,1848,2740,2738,2786,2784,591,588,576,569,566,2296,1590,537,534,526,2276,522,2274,545,542,539,548,1572,1570,481,2245,466,2242,462,2239,492,485,482,2249,496,494,1534,1531,1528,1538,413,2196,406,2191,2188,425,419,2202,415,2199,432,430,427,1472,1467,1464,433,1476,1474,368,367,2160,365,2159,362,2157,2155,2152,378,377,375,2166,372,2165,369,2162,383,381,379,2168,1419,1418,1416,1414,385,1411,384,1423,1422,1420,1424,2461,802,2441,2439,790,786,783,794,2409,2406,2403,750,742,738,2414,756,753,1720,2367,2365,2362,2359,1663,693,691,684,2373,680,2370,702,699,696,704,1690,1687,2337,2336,2334,2332,1624,2329,1622,640,637,2344,634,2342,630,2340,650,648,645,2346,655,653,1653,1651,1649,1655,2612,2597,2595,2571,2568,2565,2576,2534,2529,2526,1787,2540,2537,907,904,900,910,2503,2502,2500,2498,1768,2495,1767,2510,2508,2506,869,866,863,2513,876,874,1782,2720,2713,2711,2697,2694,2691,2702,2672,2670,2664,1828,2678,2675,2647,2646,2644,2642,1823,2639,1822,2654,2652,2650,2657,2771,1855,2765,2762,1850,1849,2751,2749,2747,2754,353,2148,344,342,336,2142,332,2140,345,1375,1373,306,2130,299,2128,295,2125,319,314,311,2132,1354,1352,1349,1356,262,257,2101,253,2096,2093,274,273,267,2107,263,2104,280,278,275,1316,1311,1308,1320,1318,2052,202,2050,2044,2040,219,2063,212,2060,208,2055,224,221,2066,1260,1258,1252,231,1248,229,1266,1264,1261,1268,155,1998,153,1996,1994,1991,1988,165,164,2007,162,2006,159,2003,2e3,172,171,169,2012,166,2010,1186,1184,1182,1179,175,1176,173,1192,1191,1189,1187,176,1194,1193,2313,2307,2305,592,589,2294,2292,2289,578,572,568,2297,580,1591,2272,2267,2264,1547,538,536,529,2278,525,2275,547,544,541,1574,1571,2237,2235,2229,1493,2225,1489,478,2247,470,2244,465,2241,493,488,484,2250,498,495,1536,1533,1530,1539,2187,2186,2184,2182,1432,2179,1430,2176,1427,414,412,2197,409,2195,405,2193,2190,426,424,421,2203,418,2201,431,429,1473,1471,1469,1466,434,1477,1475,2478,2472,2470,2459,2457,2454,2462,803,2437,2432,2429,1726,2443,2440,792,789,785,2401,2399,2393,1702,2389,1699,2411,2408,2405,745,741,2415,758,755,1721,2358,2357,2355,2353,1661,2350,1660,2347,1657,2368,2366,2364,2361,1666,690,687,2374,683,2372,701,698,705,1691,1689,2619,2617,2610,2608,2605,2613,2593,2588,2585,1803,2599,2596,2563,2561,2555,1797,2551,1795,2573,2570,2567,2577,2525,2524,2522,2520,1786,2517,1785,2514,1783,2535,2533,2531,2528,1788,2541,2539,906,903,911,2721,1844,2715,2712,1838,1836,2699,2696,2693,2703,1827,1826,1824,2673,2671,2669,2666,1829,2679,2677,1858,1857,2772,1854,1853,1851,1856,2766,2764,143,1987,139,1986,135,133,131,1984,128,1983,125,1981,138,137,136,1985,1133,1132,1130,112,110,1974,107,1973,104,1971,1969,122,121,119,117,1977,114,1976,124,1115,1114,1112,1110,1117,1116,84,83,1953,81,1952,78,1950,1948,1945,94,93,91,1959,88,1958,85,1955,99,97,95,1961,1086,1085,1083,1081,1078,100,1090,1089,1087,1091,49,47,1917,44,1915,1913,1910,1907,59,1926,56,1925,53,1922,1919,66,64,1931,61,1929,1042,1040,1038,71,1035,70,1032,68,1048,1047,1045,1043,1050,1049,12,10,1869,1867,1864,1861,21,1880,19,1877,1874,1871,28,1888,25,1886,22,1883,982,980,977,974,32,30,991,989,987,984,34,995,994,992,2151,2150,2147,2146,2144,356,355,354,2149,2139,2138,2136,2134,1359,343,341,338,2143,335,2141,348,347,346,1376,1374,2124,2123,2121,2119,1326,2116,1324,310,308,305,2131,302,2129,298,2127,320,318,316,313,2133,322,321,1355,1353,1351,1357,2092,2091,2089,2087,1276,2084,1274,2081,1271,259,2102,256,2100,252,2098,2095,272,269,2108,266,2106,281,279,277,1317,1315,1313,1310,282,1321,1319,2039,2037,2035,2032,1203,2029,1200,1197,207,2053,205,2051,201,2049,2046,2043,220,218,2064,215,2062,211,2059,228,226,223,2069,1259,1257,1254,232,1251,230,1267,1265,1263,2316,2315,2312,2311,2309,2314,2304,2303,2301,2299,1593,2308,2306,590,2288,2287,2285,2283,1578,2280,1577,2295,2293,2291,579,577,574,571,2298,582,581,1592,2263,2262,2260,2258,1545,2255,1544,2252,1541,2273,2271,2269,2266,1550,535,532,2279,528,2277,546,543,549,1575,1573,2224,2222,2220,1486,2217,1485,2214,1482,1479,2238,2236,2234,2231,1496,2228,1492,480,477,2248,473,2246,469,2243,490,487,2251,497,1537,1535,1532,2477,2476,2474,2479,2469,2468,2466,2464,1730,2473,2471,2453,2452,2450,2448,1729,2445,1728,2460,2458,2456,2463,805,804,2428,2427,2425,2423,1725,2420,1724,2417,1722,2438,2436,2434,2431,1727,2444,2442,793,791,788,795,2388,2386,2384,1697,2381,1696,2378,1694,1692,2402,2400,2398,2395,1703,2392,1701,2412,2410,2407,751,748,744,2416,759,757,1807,2620,2618,1806,1805,2611,2609,2607,2614,1802,1801,1799,2594,2592,2590,2587,1804,2600,2598,1794,1793,1791,1789,2564,2562,2560,2557,1798,2554,1796,2574,2572,2569,2578,1847,1846,2722,1843,1842,1840,1845,2716,2714,1835,1834,1832,1830,1839,1837,2700,2698,2695,2704,1817,1811,1810,897,862,1777,829,826,838,1760,1758,808,2481,1741,1740,1738,1743,2624,1818,2726,2776,782,740,737,1715,686,679,695,1682,1680,639,628,2339,647,644,1645,1643,1640,1648,602,600,597,595,2320,593,2318,609,607,604,1611,1610,1608,1606,613,1615,1613,2328,926,924,892,886,899,857,850,2505,1778,824,823,821,819,2488,818,2486,833,831,828,840,1761,1759,2649,2632,2630,2746,2734,2732,2782,2781,570,567,1587,531,527,523,540,1566,1564,476,467,463,2240,486,483,1524,1521,1518,1529,411,403,2192,399,2189,423,416,1462,1457,1454,428,1468,1465,2210,366,363,2158,360,2156,357,2153,376,373,370,2163,1410,1409,1407,1405,382,1402,380,1417,1415,1412,1421,2175,2174,777,774,771,784,732,725,722,2404,743,1716,676,674,668,2363,665,2360,685,1684,1681,626,624,622,2335,620,2333,617,2330,641,635,649,1646,1644,1642,2566,928,925,2530,2527,894,891,888,2501,2499,2496,858,856,854,851,1779,2692,2668,2665,2645,2643,2640,2651,2768,2759,2757,2744,2743,2741,2748,352,1382,340,337,333,1371,1369,307,300,296,2126,315,312,1347,1342,1350,261,258,250,2097,246,2094,271,268,264,1306,1301,1298,276,1312,1309,2115,203,2048,195,2045,191,2041,213,209,2056,1246,1244,1238,225,1234,222,1256,1253,1249,1262,2080,2079,154,1997,150,1995,147,1992,1989,163,160,2004,156,2001,1175,1174,1172,1170,1167,170,1164,167,1185,1183,1180,1177,174,1190,1188,2025,2024,2022,587,586,564,559,556,2290,573,1588,520,518,512,2268,508,2265,530,1568,1565,461,457,2233,450,2230,446,2226,479,471,489,1526,1523,1520,397,395,2185,392,2183,389,2180,2177,410,2194,402,422,1463,1461,1459,1456,1470,2455,799,2433,2430,779,776,773,2397,2394,2390,734,728,724,746,1717,2356,2354,2351,2348,1658,677,675,673,670,667,688,1685,1683,2606,2589,2586,2559,2556,2552,927,2523,2521,2518,2515,1784,2532,895,893,890,2718,2709,2707,2689,2687,2684,2663,2662,2660,2658,1825,2667,2769,1852,2760,2758,142,141,1139,1138,134,132,129,126,1982,1129,1128,1126,1131,113,111,108,105,1972,101,1970,120,118,115,1109,1108,1106,1104,123,1113,1111,82,79,1951,75,1949,72,1946,92,89,86,1956,1077,1076,1074,1072,98,1069,96,1084,1082,1079,1088,1968,1967,48,45,1916,42,1914,39,1911,1908,60,57,54,1923,50,1920,1031,1030,1028,1026,67,1023,65,1020,62,1041,1039,1036,1033,69,1046,1044,1944,1943,1941,11,9,1868,7,1865,1862,1859,20,1878,16,1875,13,1872,970,968,966,963,29,960,26,23,983,981,978,975,33,971,31,990,988,985,1906,1904,1902,993,351,2145,1383,331,330,328,326,2137,323,2135,339,1372,1370,294,293,291,289,2122,286,2120,283,2117,309,303,317,1348,1346,1344,245,244,242,2090,239,2088,236,2085,2082,260,2099,249,270,1307,1305,1303,1300,1314,189,2038,186,2036,183,2033,2030,2026,206,198,2047,194,216,1247,1245,1243,1240,227,1237,1255,2310,2302,2300,2286,2284,2281,565,563,561,558,575,1589,2261,2259,2256,2253,1542,521,519,517,514,2270,511,533,1569,1567,2223,2221,2218,2215,1483,2211,1480,459,456,453,2232,449,474,491,1527,1525,1522,2475,2467,2465,2451,2449,2446,801,800,2426,2424,2421,2418,1723,2435,780,778,775,2387,2385,2382,2379,1695,2375,1693,2396,735,733,730,727,749,1718,2616,2615,2604,2603,2601,2584,2583,2581,2579,1800,2591,2550,2549,2547,2545,1792,2542,1790,2558,929,2719,1841,2710,2708,1833,1831,2690,2688,2686,1815,1809,1808,1774,1756,1754,1737,1736,1734,1739,1816,1711,1676,1674,633,629,1638,1636,1633,1641,598,1605,1604,1602,1600,605,1609,1607,2327,887,853,1775,822,820,1757,1755,1584,524,1560,1558,468,464,1514,1511,1508,1519,408,404,400,1452,1447,1444,417,1458,1455,2208,364,361,358,2154,1401,1400,1398,1396,374,1393,371,1408,1406,1403,1413,2173,2172,772,726,723,1712,672,669,666,682,1678,1675,625,623,621,618,2331,636,632,1639,1637,1635,920,918,884,880,889,849,848,847,846,2497,855,852,1776,2641,2742,2787,1380,334,1367,1365,301,297,1340,1338,1335,1343,255,251,247,1296,1291,1288,265,1302,1299,2113,204,196,192,2042,1232,1230,1224,214,1220,210,1242,1239,1235,1250,2077,2075,151,148,1993,144,1990,1163,1162,1160,1158,1155,161,1152,157,1173,1171,1168,1165,168,1181,1178,2021,2020,2018,2023,585,560,557,1585,516,509,1562,1559,458,447,2227,472,1516,1513,1510,398,396,393,390,2181,386,2178,407,1453,1451,1449,1446,420,1460,2209,769,764,720,712,2391,729,1713,664,663,661,659,2352,656,2349,671,1679,1677,2553,922,919,2519,2516,885,883,881,2685,2661,2659,2767,2756,2755,140,1137,1136,130,127,1125,1124,1122,1127,109,106,102,1103,1102,1100,1098,116,1107,1105,1980,80,76,73,1947,1068,1067,1065,1063,90,1060,87,1075,1073,1070,1080,1966,1965,46,43,40,1912,36,1909,1019,1018,1016,1014,58,1011,55,1008,51,1029,1027,1024,1021,63,1037,1034,1940,1939,1937,1942,8,1866,4,1863,1,1860,956,954,952,949,946,17,14,969,967,964,961,27,957,24,979,976,972,1901,1900,1898,1896,986,1905,1903,350,349,1381,329,327,324,1368,1366,292,290,287,284,2118,304,1341,1339,1337,1345,243,240,237,2086,233,2083,254,1297,1295,1293,1290,1304,2114,190,187,184,2034,180,2031,177,2027,199,1233,1231,1229,1226,217,1223,1241,2078,2076,584,555,554,552,550,2282,562,1586,507,506,504,502,2257,499,2254,515,1563,1561,445,443,441,2219,438,2216,435,2212,460,454,475,1517,1515,1512,2447,798,797,2422,2419,770,768,766,2383,2380,2376,721,719,717,714,731,1714,2602,2582,2580,2548,2546,2543,923,921,2717,2706,2705,2683,2682,2680,1771,1752,1750,1733,1732,1731,1735,1814,1707,1670,1668,1631,1629,1626,1634,1599,1598,1596,1594,1603,1601,2326,1772,1753,1751,1581,1554,1552,1504,1501,1498,1509,1442,1437,1434,401,1448,1445,2206,1392,1391,1389,1387,1384,359,1399,1397,1394,1404,2171,2170,1708,1672,1669,619,1632,1630,1628,1773,1378,1363,1361,1333,1328,1336,1286,1281,1278,248,1292,1289,2111,1218,1216,1210,197,1206,193,1228,1225,1221,1236,2073,2071,1151,1150,1148,1146,152,1143,149,1140,145,1161,1159,1156,1153,158,1169,1166,2017,2016,2014,2019,1582,510,1556,1553,452,448,1506,1500,394,391,387,1443,1441,1439,1436,1450,2207,765,716,713,1709,662,660,657,1673,1671,916,914,879,878,877,882,1135,1134,1121,1120,1118,1123,1097,1096,1094,1092,103,1101,1099,1979,1059,1058,1056,1054,77,1051,74,1066,1064,1061,1071,1964,1963,1007,1006,1004,1002,999,41,996,37,1017,1015,1012,1009,52,1025,1022,1936,1935,1933,1938,942,940,938,935,932,5,2,955,953,950,947,18,943,15,965,962,958,1895,1894,1892,1890,973,1899,1897,1379,325,1364,1362,288,285,1334,1332,1330,241,238,234,1287,1285,1283,1280,1294,2112,188,185,181,178,2028,1219,1217,1215,1212,200,1209,1227,2074,2072,583,553,551,1583,505,503,500,513,1557,1555,444,442,439,436,2213,455,451,1507,1505,1502,796,763,762,760,767,711,710,708,706,2377,718,715,1710,2544,917,915,2681,1627,1597,1595,2325,1769,1749,1747,1499,1438,1435,2204,1390,1388,1385,1395,2169,2167,1704,1665,1662,1625,1623,1620,1770,1329,1282,1279,2109,1214,1207,1222,2068,2065,1149,1147,1144,1141,146,1157,1154,2013,2011,2008,2015,1579,1549,1546,1495,1487,1433,1431,1428,1425,388,1440,2205,1705,658,1667,1664,1119,1095,1093,1978,1057,1055,1052,1062,1962,1960,1005,1003,1e3,997,38,1013,1010,1932,1930,1927,1934,941,939,936,933,6,930,3,951,948,944,1889,1887,1884,1881,959,1893,1891,35,1377,1360,1358,1327,1325,1322,1331,1277,1275,1272,1269,235,1284,2110,1205,1204,1201,1198,182,1195,179,1213,2070,2067,1580,501,1551,1548,440,437,1497,1494,1490,1503,761,709,707,1706,913,912,2198,1386,2164,2161,1621,1766,2103,1208,2058,2054,1145,1142,2005,2002,1999,2009,1488,1429,1426,2200,1698,1659,1656,1975,1053,1957,1954,1001,998,1924,1921,1918,1928,937,934,931,1879,1876,1873,1870,945,1885,1882,1323,1273,1270,2105,1202,1199,1196,1211,2061,2057,1576,1543,1540,1484,1481,1478,1491,1700]);class gr{constructor(t,e){this.bits=t,this.points=e}getBits(){return this.bits}getPoints(){return this.points}}class rt{static detectMultiple(t,e,a){let n=t.getBlackMatrix(),r=rt.detect(a,n);return r.length||(n=n.clone(),n.rotate180(),r=rt.detect(a,n)),new gr(n,r)}static detect(t,e){const a=new Array;let n=0,r=0,s=!1;for(;n<e.getHeight();){const h=rt.findVertices(e,n,r);if(h[0]==null&&h[3]==null){if(!s)break;s=!1,r=0;for(const o of a)o[1]!=null&&(n=Math.trunc(Math.max(n,o[1].getY()))),o[3]!=null&&(n=Math.max(n,Math.trunc(o[3].getY())));n+=rt.ROW_STEP;continue}if(s=!0,a.push(h),!t)break;h[2]!=null?(r=Math.trunc(h[2].getX()),n=Math.trunc(h[2].getY())):(r=Math.trunc(h[4].getX()),n=Math.trunc(h[4].getY()))}return a}static findVertices(t,e,a){const n=t.getHeight(),r=t.getWidth(),s=new Array(8);return rt.copyToResult(s,rt.findRowsWithPattern(t,n,r,e,a,rt.START_PATTERN),rt.INDEXES_START_PATTERN),s[4]!=null&&(a=Math.trunc(s[4].getX()),e=Math.trunc(s[4].getY())),rt.copyToResult(s,rt.findRowsWithPattern(t,n,r,e,a,rt.STOP_PATTERN),rt.INDEXES_STOP_PATTERN),s}static copyToResult(t,e,a){for(let n=0;n<a.length;n++)t[a[n]]=e[n]}static findRowsWithPattern(t,e,a,n,r,s){const h=new Array(4);let o=!1;const c=new Int32Array(s.length);for(;n<e;n+=rt.ROW_STEP){let x=rt.findGuardPattern(t,r,n,a,!1,s,c);if(x!=null){for(;n>0;){const y=rt.findGuardPattern(t,r,--n,a,!1,s,c);if(y!=null)x=y;else{n++;break}}h[0]=new W(x[0],n),h[1]=new W(x[1],n),o=!0;break}}let p=n+1;if(o){let x=0,y=Int32Array.from([Math.trunc(h[0].getX()),Math.trunc(h[1].getX())]);for(;p<e;p++){const A=rt.findGuardPattern(t,y[0],p,a,!1,s,c);if(A!=null&&Math.abs(y[0]-A[0])<rt.MAX_PATTERN_DRIFT&&Math.abs(y[1]-A[1])<rt.MAX_PATTERN_DRIFT)y=A,x=0;else{if(x>rt.SKIPPED_ROW_COUNT_MAX)break;x++}}p-=x+1,h[2]=new W(y[0],p),h[3]=new W(y[1],p)}return p-n<rt.BARCODE_MIN_HEIGHT&&st.fill(h,null),h}static findGuardPattern(t,e,a,n,r,s,h){st.fillWithin(h,0,h.length,0);let o=e,c=0;for(;t.get(o,a)&&o>0&&c++<rt.MAX_PIXEL_DRIFT;)o--;let p=o,x=0,y=s.length;for(let A=r;p<n;p++)if(t.get(p,a)!==A)h[x]++;else{if(x===y-1){if(rt.patternMatchVariance(h,s,rt.MAX_INDIVIDUAL_VARIANCE)<rt.MAX_AVG_VARIANCE)return new Int32Array([o,p]);o+=h[0]+h[1],q.arraycopy(h,2,h,0,x-1),h[x-1]=0,h[x]=0,x--}else x++;h[x]=1,A=!A}return x===y-1&&rt.patternMatchVariance(h,s,rt.MAX_INDIVIDUAL_VARIANCE)<rt.MAX_AVG_VARIANCE?new Int32Array([o,p-1]):null}static patternMatchVariance(t,e,a){let n=t.length,r=0,s=0;for(let c=0;c<n;c++)r+=t[c],s+=e[c];if(r<s)return 1/0;let h=r/s;a*=h;let o=0;for(let c=0;c<n;c++){let p=t[c],x=e[c]*h,y=p>x?p-x:x-p;if(y>a)return 1/0;o+=y}return o/r}}rt.INDEXES_START_PATTERN=Int32Array.from([0,4,1,5]),rt.INDEXES_STOP_PATTERN=Int32Array.from([6,2,7,3]),rt.MAX_AVG_VARIANCE=.42,rt.MAX_INDIVIDUAL_VARIANCE=.8,rt.START_PATTERN=Int32Array.from([8,1,1,1,1,1,1,3]),rt.STOP_PATTERN=Int32Array.from([7,1,1,3,1,1,1,2,1]),rt.MAX_PIXEL_DRIFT=3,rt.MAX_PATTERN_DRIFT=5,rt.SKIPPED_ROW_COUNT_MAX=25,rt.ROW_STEP=5,rt.BARCODE_MIN_HEIGHT=10;class qt{constructor(t,e){if(e.length===0)throw new D;this.field=t;let a=e.length;if(a>1&&e[0]===0){let n=1;for(;n<a&&e[n]===0;)n++;n===a?this.coefficients=new Int32Array([0]):(this.coefficients=new Int32Array(a-n),q.arraycopy(e,n,this.coefficients,0,this.coefficients.length))}else this.coefficients=e}getCoefficients(){return this.coefficients}getDegree(){return this.coefficients.length-1}isZero(){return this.coefficients[0]===0}getCoefficient(t){return this.coefficients[this.coefficients.length-1-t]}evaluateAt(t){if(t===0)return this.getCoefficient(0);if(t===1){let n=0;for(let r of this.coefficients)n=this.field.add(n,r);return n}let e=this.coefficients[0],a=this.coefficients.length;for(let n=1;n<a;n++)e=this.field.add(this.field.multiply(t,e),this.coefficients[n]);return e}add(t){if(!this.field.equals(t.field))throw new D("ModulusPolys do not have same ModulusGF field");if(this.isZero())return t;if(t.isZero())return this;let e=this.coefficients,a=t.coefficients;if(e.length>a.length){let s=e;e=a,a=s}let n=new Int32Array(a.length),r=a.length-e.length;q.arraycopy(a,0,n,0,r);for(let s=r;s<a.length;s++)n[s]=this.field.add(e[s-r],a[s]);return new qt(this.field,n)}subtract(t){if(!this.field.equals(t.field))throw new D("ModulusPolys do not have same ModulusGF field");return t.isZero()?this:this.add(t.negative())}multiply(t){return t instanceof qt?this.multiplyOther(t):this.multiplyScalar(t)}multiplyOther(t){if(!this.field.equals(t.field))throw new D("ModulusPolys do not have same ModulusGF field");if(this.isZero()||t.isZero())return new qt(this.field,new Int32Array([0]));let e=this.coefficients,a=e.length,n=t.coefficients,r=n.length,s=new Int32Array(a+r-1);for(let h=0;h<a;h++){let o=e[h];for(let c=0;c<r;c++)s[h+c]=this.field.add(s[h+c],this.field.multiply(o,n[c]))}return new qt(this.field,s)}negative(){let t=this.coefficients.length,e=new Int32Array(t);for(let a=0;a<t;a++)e[a]=this.field.subtract(0,this.coefficients[a]);return new qt(this.field,e)}multiplyScalar(t){if(t===0)return new qt(this.field,new Int32Array([0]));if(t===1)return this;let e=this.coefficients.length,a=new Int32Array(e);for(let n=0;n<e;n++)a[n]=this.field.multiply(this.coefficients[n],t);return new qt(this.field,a)}multiplyByMonomial(t,e){if(t<0)throw new D;if(e===0)return new qt(this.field,new Int32Array([0]));let a=this.coefficients.length,n=new Int32Array(a+t);for(let r=0;r<a;r++)n[r]=this.field.multiply(this.coefficients[r],e);return new qt(this.field,n)}toString(){let t=new yt;for(let e=this.getDegree();e>=0;e--){let a=this.getCoefficient(e);a!==0&&(a<0?(t.append(" - "),a=-a):t.length()>0&&t.append(" + "),(e===0||a!==1)&&t.append(a),e!==0&&(e===1?t.append("x"):(t.append("x^"),t.append(e))))}return t.toString()}}class fr{add(t,e){return(t+e)%this.modulus}subtract(t,e){return(this.modulus+t-e)%this.modulus}exp(t){return this.expTable[t]}log(t){if(t===0)throw new D;return this.logTable[t]}inverse(t){if(t===0)throw new m1;return this.expTable[this.modulus-this.logTable[t]-1]}multiply(t,e){return t===0||e===0?0:this.expTable[(this.logTable[t]+this.logTable[e])%(this.modulus-1)]}getSize(){return this.modulus}equals(t){return t===this}}class $1 extends fr{constructor(t,e){super(),this.modulus=t,this.expTable=new Int32Array(t),this.logTable=new Int32Array(t);let a=1;for(let n=0;n<t;n++)this.expTable[n]=a,a=a*e%t;for(let n=0;n<t-1;n++)this.logTable[this.expTable[n]]=n;this.zero=new qt(this,new Int32Array([0])),this.one=new qt(this,new Int32Array([1]))}getZero(){return this.zero}getOne(){return this.one}buildMonomial(t,e){if(t<0)throw new D;if(e===0)return this.zero;let a=new Int32Array(t+1);return a[0]=e,new qt(this,a)}}$1.PDF417_GF=new $1($.NUMBER_OF_CODEWORDS,3);class m2{constructor(){this.field=$1.PDF417_GF}decode(t,e,a){let n=new qt(this.field,t),r=new Int32Array(e),s=!1;for(let E=e;E>0;E--){let I=n.evaluateAt(this.field.exp(E));r[e-E]=I,I!==0&&(s=!0)}if(!s)return 0;let h=this.field.getOne();if(a!=null)for(const E of a){let I=this.field.exp(t.length-1-E),S=new qt(this.field,new Int32Array([this.field.subtract(0,I),1]));h=h.multiply(S)}let o=new qt(this.field,r),c=this.runEuclideanAlgorithm(this.field.buildMonomial(e,1),o,e),p=c[0],x=c[1],y=this.findErrorLocations(p),A=this.findErrorMagnitudes(x,p,y);for(let E=0;E<y.length;E++){let I=t.length-1-this.field.log(y[E]);if(I<0)throw z.getChecksumInstance();t[I]=this.field.subtract(t[I],A[E])}return y.length}runEuclideanAlgorithm(t,e,a){if(t.getDegree()<e.getDegree()){let y=t;t=e,e=y}let n=t,r=e,s=this.field.getZero(),h=this.field.getOne();for(;r.getDegree()>=Math.round(a/2);){let y=n,A=s;if(n=r,s=h,n.isZero())throw z.getChecksumInstance();r=y;let E=this.field.getZero(),I=n.getCoefficient(n.getDegree()),S=this.field.inverse(I);for(;r.getDegree()>=n.getDegree()&&!r.isZero();){let O=r.getDegree()-n.getDegree(),H=this.field.multiply(r.getCoefficient(r.getDegree()),S);E=E.add(this.field.buildMonomial(O,H)),r=r.subtract(n.multiplyByMonomial(O,H))}h=E.multiply(s).subtract(A).negative()}let o=h.getCoefficient(0);if(o===0)throw z.getChecksumInstance();let c=this.field.inverse(o),p=h.multiply(c),x=r.multiply(c);return[p,x]}findErrorLocations(t){let e=t.getDegree(),a=new Int32Array(e),n=0;for(let r=1;r<this.field.getSize()&&n<e;r++)t.evaluateAt(r)===0&&(a[n]=this.field.inverse(r),n++);if(n!==e)throw z.getChecksumInstance();return a}findErrorMagnitudes(t,e,a){let n=e.getDegree(),r=new Int32Array(n);for(let c=1;c<=n;c++)r[n-c]=this.field.multiply(c,e.getCoefficient(c));let s=new qt(this.field,r),h=a.length,o=new Int32Array(h);for(let c=0;c<h;c++){let p=this.field.inverse(a[c]),x=this.field.subtract(0,t.evaluateAt(p)),y=this.field.inverse(s.evaluateAt(p));o[c]=this.field.multiply(x,y)}return o}}class Ge{constructor(t,e,a,n,r){t instanceof Ge?this.constructor_2(t):this.constructor_1(t,e,a,n,r)}constructor_1(t,e,a,n,r){const s=e==null||a==null,h=n==null||r==null;if(s&&h)throw new L;s?(e=new W(0,n.getY()),a=new W(0,r.getY())):h&&(n=new W(t.getWidth()-1,e.getY()),r=new W(t.getWidth()-1,a.getY())),this.image=t,this.topLeft=e,this.bottomLeft=a,this.topRight=n,this.bottomRight=r,this.minX=Math.trunc(Math.min(e.getX(),a.getX())),this.maxX=Math.trunc(Math.max(n.getX(),r.getX())),this.minY=Math.trunc(Math.min(e.getY(),n.getY())),this.maxY=Math.trunc(Math.max(a.getY(),r.getY()))}constructor_2(t){this.image=t.image,this.topLeft=t.getTopLeft(),this.bottomLeft=t.getBottomLeft(),this.topRight=t.getTopRight(),this.bottomRight=t.getBottomRight(),this.minX=t.getMinX(),this.maxX=t.getMaxX(),this.minY=t.getMinY(),this.maxY=t.getMaxY()}static merge(t,e){return t==null?e:e==null?t:new Ge(t.image,t.topLeft,t.bottomLeft,e.topRight,e.bottomRight)}addMissingRows(t,e,a){let n=this.topLeft,r=this.bottomLeft,s=this.topRight,h=this.bottomRight;if(t>0){let o=a?this.topLeft:this.topRight,c=Math.trunc(o.getY()-t);c<0&&(c=0);let p=new W(o.getX(),c);a?n=p:s=p}if(e>0){let o=a?this.bottomLeft:this.bottomRight,c=Math.trunc(o.getY()+e);c>=this.image.getHeight()&&(c=this.image.getHeight()-1);let p=new W(o.getX(),c);a?r=p:h=p}return new Ge(this.image,n,r,s,h)}getMinX(){return this.minX}getMaxX(){return this.maxX}getMinY(){return this.minY}getMaxY(){return this.maxY}getTopLeft(){return this.topLeft}getTopRight(){return this.topRight}getBottomLeft(){return this.bottomLeft}getBottomRight(){return this.bottomRight}}class xr{constructor(t,e,a,n){this.columnCount=t,this.errorCorrectionLevel=n,this.rowCountUpperPart=e,this.rowCountLowerPart=a,this.rowCount=e+a}getColumnCount(){return this.columnCount}getErrorCorrectionLevel(){return this.errorCorrectionLevel}getRowCount(){return this.rowCount}getRowCountUpperPart(){return this.rowCountUpperPart}getRowCountLowerPart(){return this.rowCountLowerPart}}class l1{constructor(){this.buffer=""}static form(t,e){let a=-1;function n(s,h,o,c,p,x){if(s==="%%")return"%";if(e[++a]===void 0)return;s=c?parseInt(c.substr(1)):void 0;let y=p?parseInt(p.substr(1)):void 0,A;switch(x){case"s":A=e[a];break;case"c":A=e[a][0];break;case"f":A=parseFloat(e[a]).toFixed(s);break;case"p":A=parseFloat(e[a]).toPrecision(s);break;case"e":A=parseFloat(e[a]).toExponential(s);break;case"x":A=parseInt(e[a]).toString(y||16);break;case"d":A=parseFloat(parseInt(e[a],y||10).toPrecision(s)).toFixed(0);break}A=typeof A=="object"?JSON.stringify(A):(+A).toString(y);let E=parseInt(o),I=o&&o[0]+""=="0"?"0":" ";for(;A.length<E;)A=h!==void 0?A+I:I+A;return A}let r=/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;return t.replace(r,n)}format(t,...e){this.buffer+=l1.form(t,e)}toString(){return this.buffer}}class p1{constructor(t){this.boundingBox=new Ge(t),this.codewords=new Array(t.getMaxY()-t.getMinY()+1)}getCodewordNearby(t){let e=this.getCodeword(t);if(e!=null)return e;for(let a=1;a<p1.MAX_NEARBY_DISTANCE;a++){let n=this.imageRowToCodewordIndex(t)-a;if(n>=0&&(e=this.codewords[n],e!=null)||(n=this.imageRowToCodewordIndex(t)+a,n<this.codewords.length&&(e=this.codewords[n],e!=null)))return e}return null}imageRowToCodewordIndex(t){return t-this.boundingBox.getMinY()}setCodeword(t,e){this.codewords[this.imageRowToCodewordIndex(t)]=e}getCodeword(t){return this.codewords[this.imageRowToCodewordIndex(t)]}getBoundingBox(){return this.boundingBox}getCodewords(){return this.codewords}toString(){const t=new l1;let e=0;for(const a of this.codewords){if(a==null){t.format("%3d:    |   %n",e++);continue}t.format("%3d: %3d|%3d%n",e++,a.getRowNumber(),a.getValue())}return t.toString()}}p1.MAX_NEARBY_DISTANCE=5;class u1{constructor(){this.values=new Map}setValue(t){t=Math.trunc(t);let e=this.values.get(t);e==null&&(e=0),e++,this.values.set(t,e)}getValue(){let t=-1,e=new Array;for(const[a,n]of this.values.entries()){const r={getKey:()=>a,getValue:()=>n};r.getValue()>t?(t=r.getValue(),e=[],e.push(r.getKey())):r.getValue()===t&&e.push(r.getKey())}return $.toIntArray(e)}getConfidence(t){return this.values.get(t)}}class w2 extends p1{constructor(t,e){super(t),this._isLeft=e}setRowNumbers(){for(let t of this.getCodewords())t!=null&&t.setRowNumberAsRowIndicatorColumn()}adjustCompleteIndicatorColumnRowNumbers(t){let e=this.getCodewords();this.setRowNumbers(),this.removeIncorrectCodewords(e,t);let a=this.getBoundingBox(),n=this._isLeft?a.getTopLeft():a.getTopRight(),r=this._isLeft?a.getBottomLeft():a.getBottomRight(),s=this.imageRowToCodewordIndex(Math.trunc(n.getY())),h=this.imageRowToCodewordIndex(Math.trunc(r.getY())),o=-1,c=1,p=0;for(let x=s;x<h;x++){if(e[x]==null)continue;let y=e[x],A=y.getRowNumber()-o;if(A===0)p++;else if(A===1)c=Math.max(c,p),p=1,o=y.getRowNumber();else if(A<0||y.getRowNumber()>=t.getRowCount()||A>x)e[x]=null;else{let E;c>2?E=(c-2)*A:E=A;let I=E>=x;for(let S=1;S<=E&&!I;S++)I=e[x-S]!=null;I?e[x]=null:(o=y.getRowNumber(),p=1)}}}getRowHeights(){let t=this.getBarcodeMetadata();if(t==null)return null;this.adjustIncompleteIndicatorColumnRowNumbers(t);let e=new Int32Array(t.getRowCount());for(let a of this.getCodewords())if(a!=null){let n=a.getRowNumber();if(n>=e.length)continue;e[n]++}return e}adjustIncompleteIndicatorColumnRowNumbers(t){let e=this.getBoundingBox(),a=this._isLeft?e.getTopLeft():e.getTopRight(),n=this._isLeft?e.getBottomLeft():e.getBottomRight(),r=this.imageRowToCodewordIndex(Math.trunc(a.getY())),s=this.imageRowToCodewordIndex(Math.trunc(n.getY())),h=this.getCodewords(),o=-1;for(let c=r;c<s;c++){if(h[c]==null)continue;let p=h[c];p.setRowNumberAsRowIndicatorColumn();let x=p.getRowNumber()-o;x===0||(x===1?o=p.getRowNumber():p.getRowNumber()>=t.getRowCount()?h[c]=null:o=p.getRowNumber())}}getBarcodeMetadata(){let t=this.getCodewords(),e=new u1,a=new u1,n=new u1,r=new u1;for(let h of t){if(h==null)continue;h.setRowNumberAsRowIndicatorColumn();let o=h.getValue()%30,c=h.getRowNumber();switch(this._isLeft||(c+=2),c%3){case 0:a.setValue(o*3+1);break;case 1:r.setValue(o/3),n.setValue(o%3);break;case 2:e.setValue(o+1);break}}if(e.getValue().length===0||a.getValue().length===0||n.getValue().length===0||r.getValue().length===0||e.getValue()[0]<1||a.getValue()[0]+n.getValue()[0]<$.MIN_ROWS_IN_BARCODE||a.getValue()[0]+n.getValue()[0]>$.MAX_ROWS_IN_BARCODE)return null;let s=new xr(e.getValue()[0],a.getValue()[0],n.getValue()[0],r.getValue()[0]);return this.removeIncorrectCodewords(t,s),s}removeIncorrectCodewords(t,e){for(let a=0;a<t.length;a++){let n=t[a];if(t[a]==null)continue;let r=n.getValue()%30,s=n.getRowNumber();if(s>e.getRowCount()){t[a]=null;continue}switch(this._isLeft||(s+=2),s%3){case 0:r*3+1!==e.getRowCountUpperPart()&&(t[a]=null);break;case 1:(Math.trunc(r/3)!==e.getErrorCorrectionLevel()||r%3!==e.getRowCountLowerPart())&&(t[a]=null);break;case 2:r+1!==e.getColumnCount()&&(t[a]=null);break}}}isLeft(){return this._isLeft}toString(){return"IsLeft: "+this._isLeft+`
`+super.toString()}}class g1{constructor(t,e){this.ADJUST_ROW_NUMBER_SKIP=2,this.barcodeMetadata=t,this.barcodeColumnCount=t.getColumnCount(),this.boundingBox=e,this.detectionResultColumns=new Array(this.barcodeColumnCount+2)}getDetectionResultColumns(){this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[0]),this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[this.barcodeColumnCount+1]);let t=$.MAX_CODEWORDS_IN_BARCODE,e;do e=t,t=this.adjustRowNumbersAndGetCount();while(t>0&&t<e);return this.detectionResultColumns}adjustIndicatorColumnRowNumbers(t){t!=null&&t.adjustCompleteIndicatorColumnRowNumbers(this.barcodeMetadata)}adjustRowNumbersAndGetCount(){let t=this.adjustRowNumbersByRow();if(t===0)return 0;for(let e=1;e<this.barcodeColumnCount+1;e++){let a=this.detectionResultColumns[e].getCodewords();for(let n=0;n<a.length;n++)a[n]!=null&&(a[n].hasValidRowNumber()||this.adjustRowNumbers(e,n,a))}return t}adjustRowNumbersByRow(){return this.adjustRowNumbersFromBothRI(),this.adjustRowNumbersFromLRI()+this.adjustRowNumbersFromRRI()}adjustRowNumbersFromBothRI(){if(this.detectionResultColumns[0]==null||this.detectionResultColumns[this.barcodeColumnCount+1]==null)return;let t=this.detectionResultColumns[0].getCodewords(),e=this.detectionResultColumns[this.barcodeColumnCount+1].getCodewords();for(let a=0;a<t.length;a++)if(t[a]!=null&&e[a]!=null&&t[a].getRowNumber()===e[a].getRowNumber())for(let n=1;n<=this.barcodeColumnCount;n++){let r=this.detectionResultColumns[n].getCodewords()[a];r!=null&&(r.setRowNumber(t[a].getRowNumber()),r.hasValidRowNumber()||(this.detectionResultColumns[n].getCodewords()[a]=null))}}adjustRowNumbersFromRRI(){if(this.detectionResultColumns[this.barcodeColumnCount+1]==null)return 0;let t=0,e=this.detectionResultColumns[this.barcodeColumnCount+1].getCodewords();for(let a=0;a<e.length;a++){if(e[a]==null)continue;let n=e[a].getRowNumber(),r=0;for(let s=this.barcodeColumnCount+1;s>0&&r<this.ADJUST_ROW_NUMBER_SKIP;s--){let h=this.detectionResultColumns[s].getCodewords()[a];h!=null&&(r=g1.adjustRowNumberIfValid(n,r,h),h.hasValidRowNumber()||t++)}}return t}adjustRowNumbersFromLRI(){if(this.detectionResultColumns[0]==null)return 0;let t=0,e=this.detectionResultColumns[0].getCodewords();for(let a=0;a<e.length;a++){if(e[a]==null)continue;let n=e[a].getRowNumber(),r=0;for(let s=1;s<this.barcodeColumnCount+1&&r<this.ADJUST_ROW_NUMBER_SKIP;s++){let h=this.detectionResultColumns[s].getCodewords()[a];h!=null&&(r=g1.adjustRowNumberIfValid(n,r,h),h.hasValidRowNumber()||t++)}}return t}static adjustRowNumberIfValid(t,e,a){return a==null||a.hasValidRowNumber()||(a.isValidRowNumber(t)?(a.setRowNumber(t),e=0):++e),e}adjustRowNumbers(t,e,a){if(!this.detectionResultColumns[t-1])return;let n=a[e],r=this.detectionResultColumns[t-1].getCodewords(),s=r;this.detectionResultColumns[t+1]!=null&&(s=this.detectionResultColumns[t+1].getCodewords());let h=new Array(14);h[2]=r[e],h[3]=s[e],e>0&&(h[0]=a[e-1],h[4]=r[e-1],h[5]=s[e-1]),e>1&&(h[8]=a[e-2],h[10]=r[e-2],h[11]=s[e-2]),e<a.length-1&&(h[1]=a[e+1],h[6]=r[e+1],h[7]=s[e+1]),e<a.length-2&&(h[9]=a[e+2],h[12]=r[e+2],h[13]=s[e+2]);for(let o of h)if(g1.adjustRowNumber(n,o))return}static adjustRowNumber(t,e){return e==null?!1:e.hasValidRowNumber()&&e.getBucket()===t.getBucket()?(t.setRowNumber(e.getRowNumber()),!0):!1}getBarcodeColumnCount(){return this.barcodeColumnCount}getBarcodeRowCount(){return this.barcodeMetadata.getRowCount()}getBarcodeECLevel(){return this.barcodeMetadata.getErrorCorrectionLevel()}setBoundingBox(t){this.boundingBox=t}getBoundingBox(){return this.boundingBox}setDetectionResultColumn(t,e){this.detectionResultColumns[t]=e}getDetectionResultColumn(t){return this.detectionResultColumns[t]}toString(){let t=this.detectionResultColumns[0];t==null&&(t=this.detectionResultColumns[this.barcodeColumnCount+1]);let e=new l1;for(let a=0;a<t.getCodewords().length;a++){e.format("CW %3d:",a);for(let n=0;n<this.barcodeColumnCount+2;n++){if(this.detectionResultColumns[n]==null){e.format("    |   ");continue}let r=this.detectionResultColumns[n].getCodewords()[a];if(r==null){e.format("    |   ");continue}e.format(" %3d|%3d",r.getRowNumber(),r.getValue())}e.format("%n")}return e.toString()}}class f1{constructor(t,e,a,n){this.rowNumber=f1.BARCODE_ROW_UNKNOWN,this.startX=Math.trunc(t),this.endX=Math.trunc(e),this.bucket=Math.trunc(a),this.value=Math.trunc(n)}hasValidRowNumber(){return this.isValidRowNumber(this.rowNumber)}isValidRowNumber(t){return t!==f1.BARCODE_ROW_UNKNOWN&&this.bucket===t%3*3}setRowNumberAsRowIndicatorColumn(){this.rowNumber=Math.trunc(Math.trunc(this.value/30)*3+Math.trunc(this.bucket/3))}getWidth(){return this.endX-this.startX}getStartX(){return this.startX}getEndX(){return this.endX}getBucket(){return this.bucket}getValue(){return this.value}getRowNumber(){return this.rowNumber}setRowNumber(t){this.rowNumber=t}toString(){return this.rowNumber+"|"+this.value}}f1.BARCODE_ROW_UNKNOWN=-1;class se{static initialize(){for(let t=0;t<$.SYMBOL_TABLE.length;t++){let e=$.SYMBOL_TABLE[t],a=e&1;for(let n=0;n<$.BARS_IN_MODULE;n++){let r=0;for(;(e&1)===a;)r+=1,e>>=1;a=e&1,se.RATIOS_TABLE[t]||(se.RATIOS_TABLE[t]=new Array($.BARS_IN_MODULE)),se.RATIOS_TABLE[t][$.BARS_IN_MODULE-n-1]=Math.fround(r/$.MODULES_IN_CODEWORD)}}this.bSymbolTableReady=!0}static getDecodedValue(t){let e=se.getDecodedCodewordValue(se.sampleBitCounts(t));return e!==-1?e:se.getClosestDecodedValue(t)}static sampleBitCounts(t){let e=dt.sum(t),a=new Int32Array($.BARS_IN_MODULE),n=0,r=0;for(let s=0;s<$.MODULES_IN_CODEWORD;s++){let h=e/(2*$.MODULES_IN_CODEWORD)+s*e/$.MODULES_IN_CODEWORD;r+t[n]<=h&&(r+=t[n],n++),a[n]++}return a}static getDecodedCodewordValue(t){let e=se.getBitValue(t);return $.getCodeword(e)===-1?-1:e}static getBitValue(t){let e=0;for(let a=0;a<t.length;a++)for(let n=0;n<t[a];n++)e=e<<1|(a%2===0?1:0);return Math.trunc(e)}static getClosestDecodedValue(t){let e=dt.sum(t),a=new Array($.BARS_IN_MODULE);if(e>1)for(let s=0;s<a.length;s++)a[s]=Math.fround(t[s]/e);let n=w1.MAX_VALUE,r=-1;this.bSymbolTableReady||se.initialize();for(let s=0;s<se.RATIOS_TABLE.length;s++){let h=0,o=se.RATIOS_TABLE[s];for(let c=0;c<$.BARS_IN_MODULE;c++){let p=Math.fround(o[c]-a[c]);if(h+=Math.fround(p*p),h>=n)break}h<n&&(n=h,r=$.SYMBOL_TABLE[s])}return r}}se.bSymbolTableReady=!1,se.RATIOS_TABLE=new Array($.SYMBOL_TABLE.length).map(f=>new Array($.BARS_IN_MODULE));class A2{constructor(){this.segmentCount=-1,this.fileSize=-1,this.timestamp=-1,this.checksum=-1}getSegmentIndex(){return this.segmentIndex}setSegmentIndex(t){this.segmentIndex=t}getFileId(){return this.fileId}setFileId(t){this.fileId=t}getOptionalData(){return this.optionalData}setOptionalData(t){this.optionalData=t}isLastSegment(){return this.lastSegment}setLastSegment(t){this.lastSegment=t}getSegmentCount(){return this.segmentCount}setSegmentCount(t){this.segmentCount=t}getSender(){return this.sender||null}setSender(t){this.sender=t}getAddressee(){return this.addressee||null}setAddressee(t){this.addressee=t}getFileName(){return this.fileName}setFileName(t){this.fileName=t}getFileSize(){return this.fileSize}setFileSize(t){this.fileSize=t}getChecksum(){return this.checksum}setChecksum(t){this.checksum=t}getTimestamp(){return this.timestamp}setTimestamp(t){this.timestamp=t}}class C2{static parseLong(t,e=void 0){return parseInt(t,e)}}class E2 extends w{}E2.kind="NullPointerException";class Mr{writeBytes(t){this.writeBytesOffset(t,0,t.length)}writeBytesOffset(t,e,a){if(t==null)throw new E2;if(e<0||e>t.length||a<0||e+a>t.length||e+a<0)throw new ct;if(a===0)return;for(let n=0;n<a;n++)this.write(t[e+n])}flush(){}close(){}}class vr extends w{}class yr extends Mr{constructor(t=32){if(super(),this.count=0,t<0)throw new D("Negative initial size: "+t);this.buf=new Uint8Array(t)}ensureCapacity(t){t-this.buf.length>0&&this.grow(t)}grow(t){let a=this.buf.length<<1;if(a-t<0&&(a=t),a<0){if(t<0)throw new vr;a=Y.MAX_VALUE}this.buf=st.copyOfUint8Array(this.buf,a)}write(t){this.ensureCapacity(this.count+1),this.buf[this.count]=t,this.count+=1}writeBytesOffset(t,e,a){if(e<0||e>t.length||a<0||e+a-t.length>0)throw new ct;this.ensureCapacity(this.count+a),q.arraycopy(t,e,this.buf,this.count,a),this.count+=a}writeTo(t){t.writeBytesOffset(this.buf,0,this.count)}reset(){this.count=0}toByteArray(){return st.copyOfUint8Array(this.buf,this.count)}size(){return this.count}toString(t){return t?typeof t=="string"?this.toString_string(t):this.toString_number(t):this.toString_void()}toString_void(){return new String(this.buf).toString()}toString_string(t){return new String(this.buf).toString()}toString_number(t){return new String(this.buf).toString()}close(){}}var mt;(function(f){f[f.ALPHA=0]="ALPHA",f[f.LOWER=1]="LOWER",f[f.MIXED=2]="MIXED",f[f.PUNCT=3]="PUNCT",f[f.ALPHA_SHIFT=4]="ALPHA_SHIFT",f[f.PUNCT_SHIFT=5]="PUNCT_SHIFT"})(mt||(mt={}));function I2(){if(typeof window<"u")return window.BigInt||null;if(typeof v1<"u")return v1.BigInt||null;if(typeof self<"u")return self.BigInt||null;throw new Error("Can't search globals for BigInt!")}let T1;function Be(f){if(typeof T1>"u"&&(T1=I2()),T1===null)throw new Error("BigInt is not supported!");return T1(f)}function mr(){let f=[];f[0]=Be(1);let t=Be(900);f[1]=t;for(let e=2;e<16;e++)f[e]=f[e-1]*t;return f}class R{static decode(t,e){let a=new yt(""),n=V.ISO8859_1;a.enableDecoding(n);let r=1,s=t[r++],h=new A2;for(;r<t[0];){switch(s){case R.TEXT_COMPACTION_MODE_LATCH:r=R.textCompaction(t,r,a);break;case R.BYTE_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH_6:r=R.byteCompaction(s,t,n,r,a);break;case R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:a.append(t[r++]);break;case R.NUMERIC_COMPACTION_MODE_LATCH:r=R.numericCompaction(t,r,a);break;case R.ECI_CHARSET:V.getCharacterSetECIByValue(t[r++]);break;case R.ECI_GENERAL_PURPOSE:r+=2;break;case R.ECI_USER_DEFINED:r++;break;case R.BEGIN_MACRO_PDF417_CONTROL_BLOCK:r=R.decodeMacroBlock(t,r,h);break;case R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case R.MACRO_PDF417_TERMINATOR:throw new k;default:r--,r=R.textCompaction(t,r,a);break}if(r<t.length)s=t[r++];else throw k.getFormatInstance()}if(a.length()===0)throw k.getFormatInstance();let o=new s1(null,a.toString(),null,e);return o.setOther(h),o}static decodeMacroBlock(t,e,a){if(e+R.NUMBER_OF_SEQUENCE_CODEWORDS>t[0])throw k.getFormatInstance();let n=new Int32Array(R.NUMBER_OF_SEQUENCE_CODEWORDS);for(let h=0;h<R.NUMBER_OF_SEQUENCE_CODEWORDS;h++,e++)n[h]=t[e];a.setSegmentIndex(Y.parseInt(R.decodeBase900toBase10(n,R.NUMBER_OF_SEQUENCE_CODEWORDS)));let r=new yt;e=R.textCompaction(t,e,r),a.setFileId(r.toString());let s=-1;for(t[e]===R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD&&(s=e+1);e<t[0];)switch(t[e]){case R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:switch(e++,t[e]){case R.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME:let h=new yt;e=R.textCompaction(t,e+1,h),a.setFileName(h.toString());break;case R.MACRO_PDF417_OPTIONAL_FIELD_SENDER:let o=new yt;e=R.textCompaction(t,e+1,o),a.setSender(o.toString());break;case R.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE:let c=new yt;e=R.textCompaction(t,e+1,c),a.setAddressee(c.toString());break;case R.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT:let p=new yt;e=R.numericCompaction(t,e+1,p),a.setSegmentCount(Y.parseInt(p.toString()));break;case R.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP:let x=new yt;e=R.numericCompaction(t,e+1,x),a.setTimestamp(C2.parseLong(x.toString()));break;case R.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM:let y=new yt;e=R.numericCompaction(t,e+1,y),a.setChecksum(Y.parseInt(y.toString()));break;case R.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE:let A=new yt;e=R.numericCompaction(t,e+1,A),a.setFileSize(C2.parseLong(A.toString()));break;default:throw k.getFormatInstance()}break;case R.MACRO_PDF417_TERMINATOR:e++,a.setLastSegment(!0);break;default:throw k.getFormatInstance()}if(s!==-1){let h=e-s;a.isLastSegment()&&h--,a.setOptionalData(st.copyOfRange(t,s,s+h))}return e}static textCompaction(t,e,a){let n=new Int32Array((t[0]-e)*2),r=new Int32Array((t[0]-e)*2),s=0,h=!1;for(;e<t[0]&&!h;){let o=t[e++];if(o<R.TEXT_COMPACTION_MODE_LATCH)n[s]=o/30,n[s+1]=o%30,s+=2;else switch(o){case R.TEXT_COMPACTION_MODE_LATCH:n[s++]=R.TEXT_COMPACTION_MODE_LATCH;break;case R.BYTE_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH_6:case R.NUMERIC_COMPACTION_MODE_LATCH:case R.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case R.MACRO_PDF417_TERMINATOR:e--,h=!0;break;case R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:n[s]=R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE,o=t[e++],r[s]=o,s++;break}}return R.decodeTextCompaction(n,r,s,a),e}static decodeTextCompaction(t,e,a,n){let r=mt.ALPHA,s=mt.ALPHA,h=0;for(;h<a;){let o=t[h],c="";switch(r){case mt.ALPHA:if(o<26)c=String.fromCharCode(65+o);else switch(o){case 26:c=" ";break;case R.LL:r=mt.LOWER;break;case R.ML:r=mt.MIXED;break;case R.PS:s=r,r=mt.PUNCT_SHIFT;break;case R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:n.append(e[h]);break;case R.TEXT_COMPACTION_MODE_LATCH:r=mt.ALPHA;break}break;case mt.LOWER:if(o<26)c=String.fromCharCode(97+o);else switch(o){case 26:c=" ";break;case R.AS:s=r,r=mt.ALPHA_SHIFT;break;case R.ML:r=mt.MIXED;break;case R.PS:s=r,r=mt.PUNCT_SHIFT;break;case R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:n.append(e[h]);break;case R.TEXT_COMPACTION_MODE_LATCH:r=mt.ALPHA;break}break;case mt.MIXED:if(o<R.PL)c=R.MIXED_CHARS[o];else switch(o){case R.PL:r=mt.PUNCT;break;case 26:c=" ";break;case R.LL:r=mt.LOWER;break;case R.AL:r=mt.ALPHA;break;case R.PS:s=r,r=mt.PUNCT_SHIFT;break;case R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:n.append(e[h]);break;case R.TEXT_COMPACTION_MODE_LATCH:r=mt.ALPHA;break}break;case mt.PUNCT:if(o<R.PAL)c=R.PUNCT_CHARS[o];else switch(o){case R.PAL:r=mt.ALPHA;break;case R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:n.append(e[h]);break;case R.TEXT_COMPACTION_MODE_LATCH:r=mt.ALPHA;break}break;case mt.ALPHA_SHIFT:if(r=s,o<26)c=String.fromCharCode(65+o);else switch(o){case 26:c=" ";break;case R.TEXT_COMPACTION_MODE_LATCH:r=mt.ALPHA;break}break;case mt.PUNCT_SHIFT:if(r=s,o<R.PAL)c=R.PUNCT_CHARS[o];else switch(o){case R.PAL:r=mt.ALPHA;break;case R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:n.append(e[h]);break;case R.TEXT_COMPACTION_MODE_LATCH:r=mt.ALPHA;break}break}c!==""&&n.append(c),h++}}static byteCompaction(t,e,a,n,r){let s=new yr,h=0,o=0,c=!1;switch(t){case R.BYTE_COMPACTION_MODE_LATCH:let p=new Int32Array(6),x=e[n++];for(;n<e[0]&&!c;)switch(p[h++]=x,o=900*o+x,x=e[n++],x){case R.TEXT_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH:case R.NUMERIC_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH_6:case R.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case R.MACRO_PDF417_TERMINATOR:n--,c=!0;break;default:if(h%5===0&&h>0){for(let y=0;y<6;++y)s.write(Number(Be(o)>>Be(8*(5-y))));o=0,h=0}break}n===e[0]&&x<R.TEXT_COMPACTION_MODE_LATCH&&(p[h++]=x);for(let y=0;y<h;y++)s.write(p[y]);break;case R.BYTE_COMPACTION_MODE_LATCH_6:for(;n<e[0]&&!c;){let y=e[n++];if(y<R.TEXT_COMPACTION_MODE_LATCH)h++,o=900*o+y;else switch(y){case R.TEXT_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH:case R.NUMERIC_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH_6:case R.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case R.MACRO_PDF417_TERMINATOR:n--,c=!0;break}if(h%5===0&&h>0){for(let A=0;A<6;++A)s.write(Number(Be(o)>>Be(8*(5-A))));o=0,h=0}}break}return r.append(ae.decode(s.toByteArray(),a)),n}static numericCompaction(t,e,a){let n=0,r=!1,s=new Int32Array(R.MAX_NUMERIC_CODEWORDS);for(;e<t[0]&&!r;){let h=t[e++];if(e===t[0]&&(r=!0),h<R.TEXT_COMPACTION_MODE_LATCH)s[n]=h,n++;else switch(h){case R.TEXT_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH:case R.BYTE_COMPACTION_MODE_LATCH_6:case R.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case R.MACRO_PDF417_TERMINATOR:e--,r=!0;break}(n%R.MAX_NUMERIC_CODEWORDS===0||h===R.NUMERIC_COMPACTION_MODE_LATCH||r)&&n>0&&(a.append(R.decodeBase900toBase10(s,n)),n=0)}return e}static decodeBase900toBase10(t,e){let a=Be(0);for(let r=0;r<e;r++)a+=R.EXP900[e-r-1]*Be(t[r]);let n=a.toString();if(n.charAt(0)!=="1")throw new k;return n.substring(1)}}R.TEXT_COMPACTION_MODE_LATCH=900,R.BYTE_COMPACTION_MODE_LATCH=901,R.NUMERIC_COMPACTION_MODE_LATCH=902,R.BYTE_COMPACTION_MODE_LATCH_6=924,R.ECI_USER_DEFINED=925,R.ECI_GENERAL_PURPOSE=926,R.ECI_CHARSET=927,R.BEGIN_MACRO_PDF417_CONTROL_BLOCK=928,R.BEGIN_MACRO_PDF417_OPTIONAL_FIELD=923,R.MACRO_PDF417_TERMINATOR=922,R.MODE_SHIFT_TO_BYTE_COMPACTION_MODE=913,R.MAX_NUMERIC_CODEWORDS=15,R.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME=0,R.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT=1,R.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP=2,R.MACRO_PDF417_OPTIONAL_FIELD_SENDER=3,R.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE=4,R.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE=5,R.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM=6,R.PL=25,R.LL=27,R.AS=27,R.ML=28,R.AL=28,R.PS=29,R.PAL=29,R.PUNCT_CHARS=`;<>@[\\]_\`~!\r	,:
-.$/"|*()?{}'`,R.MIXED_CHARS="0123456789&\r	,:#-.$/+%*=^",R.EXP900=I2()?mr():[],R.NUMBER_OF_SEQUENCE_CODEWORDS=2;class it{constructor(){}static decode(t,e,a,n,r,s,h){let o=new Ge(t,e,a,n,r),c=null,p=null,x;for(let E=!0;;E=!1){if(e!=null&&(c=it.getRowIndicatorColumn(t,o,e,!0,s,h)),n!=null&&(p=it.getRowIndicatorColumn(t,o,n,!1,s,h)),x=it.merge(c,p),x==null)throw L.getNotFoundInstance();let I=x.getBoundingBox();if(E&&I!=null&&(I.getMinY()<o.getMinY()||I.getMaxY()>o.getMaxY()))o=I;else break}x.setBoundingBox(o);let y=x.getBarcodeColumnCount()+1;x.setDetectionResultColumn(0,c),x.setDetectionResultColumn(y,p);let A=c!=null;for(let E=1;E<=y;E++){let I=A?E:y-E;if(x.getDetectionResultColumn(I)!==void 0)continue;let S;I===0||I===y?S=new w2(o,I===0):S=new p1(o),x.setDetectionResultColumn(I,S);let O=-1,H=O;for(let F=o.getMinY();F<=o.getMaxY();F++){if(O=it.getStartColumn(x,I,F,A),O<0||O>o.getMaxX()){if(H===-1)continue;O=H}let P=it.detectCodeword(t,o.getMinX(),o.getMaxX(),A,O,F,s,h);P!=null&&(S.setCodeword(F,P),H=O,s=Math.min(s,P.getWidth()),h=Math.max(h,P.getWidth()))}}return it.createDecoderResult(x)}static merge(t,e){if(t==null&&e==null)return null;let a=it.getBarcodeMetadata(t,e);if(a==null)return null;let n=Ge.merge(it.adjustBoundingBox(t),it.adjustBoundingBox(e));return new g1(a,n)}static adjustBoundingBox(t){if(t==null)return null;let e=t.getRowHeights();if(e==null)return null;let a=it.getMax(e),n=0;for(let h of e)if(n+=a-h,h>0)break;let r=t.getCodewords();for(let h=0;n>0&&r[h]==null;h++)n--;let s=0;for(let h=e.length-1;h>=0&&(s+=a-e[h],!(e[h]>0));h--);for(let h=r.length-1;s>0&&r[h]==null;h--)s--;return t.getBoundingBox().addMissingRows(n,s,t.isLeft())}static getMax(t){let e=-1;for(let a of t)e=Math.max(e,a);return e}static getBarcodeMetadata(t,e){let a;if(t==null||(a=t.getBarcodeMetadata())==null)return e==null?null:e.getBarcodeMetadata();let n;return e==null||(n=e.getBarcodeMetadata())==null?a:a.getColumnCount()!==n.getColumnCount()&&a.getErrorCorrectionLevel()!==n.getErrorCorrectionLevel()&&a.getRowCount()!==n.getRowCount()?null:a}static getRowIndicatorColumn(t,e,a,n,r,s){let h=new w2(e,n);for(let o=0;o<2;o++){let c=o===0?1:-1,p=Math.trunc(Math.trunc(a.getX()));for(let x=Math.trunc(Math.trunc(a.getY()));x<=e.getMaxY()&&x>=e.getMinY();x+=c){let y=it.detectCodeword(t,0,t.getWidth(),n,p,x,r,s);y!=null&&(h.setCodeword(x,y),n?p=y.getStartX():p=y.getEndX())}}return h}static adjustCodewordCount(t,e){let a=e[0][1],n=a.getValue(),r=t.getBarcodeColumnCount()*t.getBarcodeRowCount()-it.getNumberOfECCodeWords(t.getBarcodeECLevel());if(n.length===0){if(r<1||r>$.MAX_CODEWORDS_IN_BARCODE)throw L.getNotFoundInstance();a.setValue(r)}else n[0]!==r&&a.setValue(r)}static createDecoderResult(t){let e=it.createBarcodeMatrix(t);it.adjustCodewordCount(t,e);let a=new Array,n=new Int32Array(t.getBarcodeRowCount()*t.getBarcodeColumnCount()),r=[],s=new Array;for(let o=0;o<t.getBarcodeRowCount();o++)for(let c=0;c<t.getBarcodeColumnCount();c++){let p=e[o][c+1].getValue(),x=o*t.getBarcodeColumnCount()+c;p.length===0?a.push(x):p.length===1?n[x]=p[0]:(s.push(x),r.push(p))}let h=new Array(r.length);for(let o=0;o<h.length;o++)h[o]=r[o];return it.createDecoderResultFromAmbiguousValues(t.getBarcodeECLevel(),n,$.toIntArray(a),$.toIntArray(s),h)}static createDecoderResultFromAmbiguousValues(t,e,a,n,r){let s=new Int32Array(n.length),h=100;for(;h-- >0;){for(let o=0;o<s.length;o++)e[n[o]]=r[o][s[o]];try{return it.decodeCodewords(e,t,a)}catch(o){if(!(o instanceof z))throw o}if(s.length===0)throw z.getChecksumInstance();for(let o=0;o<s.length;o++)if(s[o]<r[o].length-1){s[o]++;break}else if(s[o]=0,o===s.length-1)throw z.getChecksumInstance()}throw z.getChecksumInstance()}static createBarcodeMatrix(t){let e=Array.from({length:t.getBarcodeRowCount()},()=>new Array(t.getBarcodeColumnCount()+2));for(let n=0;n<e.length;n++)for(let r=0;r<e[n].length;r++)e[n][r]=new u1;let a=0;for(let n of t.getDetectionResultColumns()){if(n!=null){for(let r of n.getCodewords())if(r!=null){let s=r.getRowNumber();if(s>=0){if(s>=e.length)continue;e[s][a].setValue(r.getValue())}}}a++}return e}static isValidBarcodeColumn(t,e){return e>=0&&e<=t.getBarcodeColumnCount()+1}static getStartColumn(t,e,a,n){let r=n?1:-1,s=null;if(it.isValidBarcodeColumn(t,e-r)&&(s=t.getDetectionResultColumn(e-r).getCodeword(a)),s!=null)return n?s.getEndX():s.getStartX();if(s=t.getDetectionResultColumn(e).getCodewordNearby(a),s!=null)return n?s.getStartX():s.getEndX();if(it.isValidBarcodeColumn(t,e-r)&&(s=t.getDetectionResultColumn(e-r).getCodewordNearby(a)),s!=null)return n?s.getEndX():s.getStartX();let h=0;for(;it.isValidBarcodeColumn(t,e-r);){e-=r;for(let o of t.getDetectionResultColumn(e).getCodewords())if(o!=null)return(n?o.getEndX():o.getStartX())+r*h*(o.getEndX()-o.getStartX());h++}return n?t.getBoundingBox().getMinX():t.getBoundingBox().getMaxX()}static detectCodeword(t,e,a,n,r,s,h,o){r=it.adjustCodewordStartColumn(t,e,a,n,r,s);let c=it.getModuleBitCount(t,e,a,n,r,s);if(c==null)return null;let p,x=dt.sum(c);if(n)p=r+x;else{for(let E=0;E<c.length/2;E++){let I=c[E];c[E]=c[c.length-1-E],c[c.length-1-E]=I}p=r,r=p-x}if(!it.checkCodewordSkew(x,h,o))return null;let y=se.getDecodedValue(c),A=$.getCodeword(y);return A===-1?null:new f1(r,p,it.getCodewordBucketNumber(y),A)}static getModuleBitCount(t,e,a,n,r,s){let h=r,o=new Int32Array(8),c=0,p=n?1:-1,x=n;for(;(n?h<a:h>=e)&&c<o.length;)t.get(h,s)===x?(o[c]++,h+=p):(c++,x=!x);return c===o.length||h===(n?a:e)&&c===o.length-1?o:null}static getNumberOfECCodeWords(t){return 2<<t}static adjustCodewordStartColumn(t,e,a,n,r,s){let h=r,o=n?-1:1;for(let c=0;c<2;c++){for(;(n?h>=e:h<a)&&n===t.get(h,s);){if(Math.abs(r-h)>it.CODEWORD_SKEW_SIZE)return r;h+=o}o=-o,n=!n}return h}static checkCodewordSkew(t,e,a){return e-it.CODEWORD_SKEW_SIZE<=t&&t<=a+it.CODEWORD_SKEW_SIZE}static decodeCodewords(t,e,a){if(t.length===0)throw k.getFormatInstance();let n=1<<e+1,r=it.correctErrors(t,a,n);it.verifyCodewordCount(t,n);let s=R.decode(t,""+e);return s.setErrorsCorrected(r),s.setErasures(a.length),s}static correctErrors(t,e,a){if(e!=null&&e.length>a/2+it.MAX_ERRORS||a<0||a>it.MAX_EC_CODEWORDS)throw z.getChecksumInstance();return it.errorCorrection.decode(t,a,e)}static verifyCodewordCount(t,e){if(t.length<4)throw k.getFormatInstance();let a=t[0];if(a>t.length)throw k.getFormatInstance();if(a===0)if(e<t.length)t[0]=t.length-e;else throw k.getFormatInstance()}static getBitCountForCodeword(t){let e=new Int32Array(8),a=0,n=e.length-1;for(;!((t&1)!==a&&(a=t&1,n--,n<0));)e[n]++,t>>=1;return e}static getCodewordBucketNumber(t){return t instanceof Int32Array?this.getCodewordBucketNumber_Int32Array(t):this.getCodewordBucketNumber_number(t)}static getCodewordBucketNumber_number(t){return it.getCodewordBucketNumber(it.getBitCountForCodeword(t))}static getCodewordBucketNumber_Int32Array(t){return(t[0]-t[2]+t[4]-t[6]+9)%9}static toString(t){let e=new l1;for(let a=0;a<t.length;a++){e.format("Row %2d: ",a);for(let n=0;n<t[a].length;n++){let r=t[a][n];r.getValue().length===0?e.format("        ",null):e.format("%4d(%2d)",r.getValue()[0],r.getConfidence(r.getValue()[0]))}e.format("%n")}return e.toString()}}it.CODEWORD_SKEW_SIZE=2,it.MAX_ERRORS=3,it.MAX_EC_CODEWORDS=512,it.errorCorrection=new m2;class Yt{decode(t,e=null){let a=Yt.decode(t,e,!1);if(a==null||a.length===0||a[0]==null)throw L.getNotFoundInstance();return a[0]}decodeMultiple(t,e=null){try{return Yt.decode(t,e,!0)}catch(a){throw a instanceof k||a instanceof z?L.getNotFoundInstance():a}}static decode(t,e,a){const n=new Array,r=rt.detectMultiple(t,e,a);for(const s of r.getPoints()){const h=it.decode(r.getBits(),s[4],s[5],s[6],s[7],Yt.getMinCodewordWidth(s),Yt.getMaxCodewordWidth(s)),o=new $t(h.getText(),h.getRawBytes(),void 0,s,Q.PDF_417);o.putMetadata(Gt.ERROR_CORRECTION_LEVEL,h.getECLevel());const c=h.getOther();c!=null&&o.putMetadata(Gt.PDF417_EXTRA_METADATA,c),n.push(o)}return n.map(s=>s)}static getMaxWidth(t,e){return t==null||e==null?0:Math.trunc(Math.abs(t.getX()-e.getX()))}static getMinWidth(t,e){return t==null||e==null?Y.MAX_VALUE:Math.trunc(Math.abs(t.getX()-e.getX()))}static getMaxCodewordWidth(t){return Math.floor(Math.max(Math.max(Yt.getMaxWidth(t[0],t[4]),Yt.getMaxWidth(t[6],t[2])*$.MODULES_IN_CODEWORD/$.MODULES_IN_STOP_PATTERN),Math.max(Yt.getMaxWidth(t[1],t[5]),Yt.getMaxWidth(t[7],t[3])*$.MODULES_IN_CODEWORD/$.MODULES_IN_STOP_PATTERN)))}static getMinCodewordWidth(t){return Math.floor(Math.min(Math.min(Yt.getMinWidth(t[0],t[4]),Yt.getMinWidth(t[6],t[2])*$.MODULES_IN_CODEWORD/$.MODULES_IN_STOP_PATTERN),Math.min(Yt.getMinWidth(t[1],t[5]),Yt.getMinWidth(t[7],t[3])*$.MODULES_IN_CODEWORD/$.MODULES_IN_STOP_PATTERN)))}reset(){}}class N1 extends w{}N1.kind="ReaderException";class b2{constructor(t,e){this.verbose=t===!0,e&&this.setHints(e)}decode(t,e){return e&&this.setHints(e),this.decodeInternal(t)}decodeWithState(t){return(this.readers===null||this.readers===void 0)&&this.setHints(null),this.decodeInternal(t)}setHints(t){this.hints=t;const e=!u(t)&&t.get(ut.TRY_HARDER)===!0,a=u(t)?null:t.get(ut.POSSIBLE_FORMATS),n=new Array;if(!u(a)){const r=a.some(s=>s===Q.UPC_A||s===Q.UPC_E||s===Q.EAN_13||s===Q.EAN_8||s===Q.CODABAR||s===Q.CODE_39||s===Q.CODE_93||s===Q.CODE_128||s===Q.ITF||s===Q.RSS_14||s===Q.RSS_EXPANDED);r&&!e&&n.push(new Qe(t,this.verbose)),a.includes(Q.QR_CODE)&&n.push(new Le),a.includes(Q.DATA_MATRIX)&&n.push(new _e),a.includes(Q.AZTEC)&&n.push(new C1),a.includes(Q.PDF_417)&&n.push(new Yt),r&&e&&n.push(new Qe(t,this.verbose))}n.length===0&&(e||n.push(new Qe(t,this.verbose)),n.push(new Le),n.push(new _e),n.push(new C1),n.push(new Yt),e&&n.push(new Qe(t,this.verbose))),this.readers=n}reset(){if(this.readers!==null)for(const t of this.readers)t.reset()}decodeInternal(t){if(this.readers===null)throw new N1("No readers where selected, nothing can be read.");for(const e of this.readers)try{return e.decode(t,this.hints)}catch(a){if(a instanceof N1)continue}throw new L("No MultiFormat Readers were able to detect the code.")}}class wr extends Ve{constructor(t=null,e=500){const a=new b2;a.setHints(t),super(a,e)}decodeBitmap(t){return this.reader.decodeWithState(t)}}class Ar extends Ve{constructor(t=500){super(new Yt,t)}}class Cr extends Ve{constructor(t=500){super(new Le,t)}}var t2;(function(f){f[f.ERROR_CORRECTION=0]="ERROR_CORRECTION",f[f.CHARACTER_SET=1]="CHARACTER_SET",f[f.DATA_MATRIX_SHAPE=2]="DATA_MATRIX_SHAPE",f[f.MIN_SIZE=3]="MIN_SIZE",f[f.MAX_SIZE=4]="MAX_SIZE",f[f.MARGIN=5]="MARGIN",f[f.PDF417_COMPACT=6]="PDF417_COMPACT",f[f.PDF417_COMPACTION=7]="PDF417_COMPACTION",f[f.PDF417_DIMENSIONS=8]="PDF417_DIMENSIONS",f[f.AZTEC_LAYERS=9]="AZTEC_LAYERS",f[f.QR_VERSION=10]="QR_VERSION"})(t2||(t2={}));var kt=t2;class e2{constructor(t){this.field=t,this.cachedGenerators=[],this.cachedGenerators.push(new ne(t,Int32Array.from([1])))}buildGenerator(t){const e=this.cachedGenerators;if(t>=e.length){let a=e[e.length-1];const n=this.field;for(let r=e.length;r<=t;r++){const s=a.multiply(new ne(n,Int32Array.from([1,n.exp(r-1+n.getGeneratorBase())])));e.push(s),a=s}}return e[t]}encode(t,e){if(e===0)throw new D("No error correction bytes");const a=t.length-e;if(a<=0)throw new D("No data bytes provided");const n=this.buildGenerator(e),r=new Int32Array(a);q.arraycopy(t,0,r,0,a);let s=new ne(this.field,r);s=s.multiplyByMonomial(e,1);const o=s.divide(n)[1].getCoefficients(),c=e-o.length;for(let p=0;p<c;p++)t[a+p]=0;q.arraycopy(o,0,t,a+c,o.length)}}class Lt{constructor(){}static applyMaskPenaltyRule1(t){return Lt.applyMaskPenaltyRule1Internal(t,!0)+Lt.applyMaskPenaltyRule1Internal(t,!1)}static applyMaskPenaltyRule2(t){let e=0;const a=t.getArray(),n=t.getWidth(),r=t.getHeight();for(let s=0;s<r-1;s++){const h=a[s];for(let o=0;o<n-1;o++){const c=h[o];c===h[o+1]&&c===a[s+1][o]&&c===a[s+1][o+1]&&e++}}return Lt.N2*e}static applyMaskPenaltyRule3(t){let e=0;const a=t.getArray(),n=t.getWidth(),r=t.getHeight();for(let s=0;s<r;s++)for(let h=0;h<n;h++){const o=a[s];h+6<n&&o[h]===1&&o[h+1]===0&&o[h+2]===1&&o[h+3]===1&&o[h+4]===1&&o[h+5]===0&&o[h+6]===1&&(Lt.isWhiteHorizontal(o,h-4,h)||Lt.isWhiteHorizontal(o,h+7,h+11))&&e++,s+6<r&&a[s][h]===1&&a[s+1][h]===0&&a[s+2][h]===1&&a[s+3][h]===1&&a[s+4][h]===1&&a[s+5][h]===0&&a[s+6][h]===1&&(Lt.isWhiteVertical(a,h,s-4,s)||Lt.isWhiteVertical(a,h,s+7,s+11))&&e++}return e*Lt.N3}static isWhiteHorizontal(t,e,a){e=Math.max(e,0),a=Math.min(a,t.length);for(let n=e;n<a;n++)if(t[n]===1)return!1;return!0}static isWhiteVertical(t,e,a,n){a=Math.max(a,0),n=Math.min(n,t.length);for(let r=a;r<n;r++)if(t[r][e]===1)return!1;return!0}static applyMaskPenaltyRule4(t){let e=0;const a=t.getArray(),n=t.getWidth(),r=t.getHeight();for(let o=0;o<r;o++){const c=a[o];for(let p=0;p<n;p++)c[p]===1&&e++}const s=t.getHeight()*t.getWidth();return Math.floor(Math.abs(e*2-s)*10/s)*Lt.N4}static getDataMaskBit(t,e,a){let n,r;switch(t){case 0:n=a+e&1;break;case 1:n=a&1;break;case 2:n=e%3;break;case 3:n=(a+e)%3;break;case 4:n=Math.floor(a/2)+Math.floor(e/3)&1;break;case 5:r=a*e,n=(r&1)+r%3;break;case 6:r=a*e,n=(r&1)+r%3&1;break;case 7:r=a*e,n=r%3+(a+e&1)&1;break;default:throw new D("Invalid mask pattern: "+t)}return n===0}static applyMaskPenaltyRule1Internal(t,e){let a=0;const n=e?t.getHeight():t.getWidth(),r=e?t.getWidth():t.getHeight(),s=t.getArray();for(let h=0;h<n;h++){let o=0,c=-1;for(let p=0;p<r;p++){const x=e?s[h][p]:s[p][h];x===c?o++:(o>=5&&(a+=Lt.N1+(o-5)),o=1,c=x)}o>=5&&(a+=Lt.N1+(o-5))}return a}}Lt.N1=3,Lt.N2=3,Lt.N3=40,Lt.N4=10;class R1{constructor(t,e){this.width=t,this.height=e;const a=new Array(e);for(let n=0;n!==e;n++)a[n]=new Uint8Array(t);this.bytes=a}getHeight(){return this.height}getWidth(){return this.width}get(t,e){return this.bytes[e][t]}getArray(){return this.bytes}setNumber(t,e,a){this.bytes[e][t]=a}setBoolean(t,e,a){this.bytes[e][t]=a?1:0}clear(t){for(const e of this.bytes)st.fill(e,t)}equals(t){if(!(t instanceof R1))return!1;const e=t;if(this.width!==e.width||this.height!==e.height)return!1;for(let a=0,n=this.height;a<n;++a){const r=this.bytes[a],s=e.bytes[a];for(let h=0,o=this.width;h<o;++h)if(r[h]!==s[h])return!1}return!0}toString(){const t=new yt;for(let e=0,a=this.height;e<a;++e){const n=this.bytes[e];for(let r=0,s=this.width;r<s;++r)switch(n[r]){case 0:t.append(" 0");break;case 1:t.append(" 1");break;default:t.append("  ");break}t.append(`
`)}return t.toString()}}class We{constructor(){this.maskPattern=-1}getMode(){return this.mode}getECLevel(){return this.ecLevel}getVersion(){return this.version}getMaskPattern(){return this.maskPattern}getMatrix(){return this.matrix}toString(){const t=new yt;return t.append(`<<
`),t.append(" mode: "),t.append(this.mode?this.mode.toString():"null"),t.append(`
 ecLevel: `),t.append(this.ecLevel?this.ecLevel.toString():"null"),t.append(`
 version: `),t.append(this.version?this.version.toString():"null"),t.append(`
 maskPattern: `),t.append(this.maskPattern.toString()),this.matrix?(t.append(`
 matrix:
`),t.append(this.matrix.toString())):t.append(`
 matrix: null
`),t.append(`>>
`),t.toString()}setMode(t){this.mode=t}setECLevel(t){this.ecLevel=t}setVersion(t){this.version=t}setMaskPattern(t){this.maskPattern=t}setMatrix(t){this.matrix=t}static isValidMaskPattern(t){return t>=0&&t<We.NUM_MASK_PATTERNS}}We.NUM_MASK_PATTERNS=8;class At extends w{}At.kind="WriterException";class J{constructor(){}static clearMatrix(t){t.clear(255)}static buildMatrix(t,e,a,n,r){J.clearMatrix(r),J.embedBasicPatterns(a,r),J.embedTypeInfo(e,n,r),J.maybeEmbedVersionInfo(a,r),J.embedDataBits(t,n,r)}static embedBasicPatterns(t,e){J.embedPositionDetectionPatternsAndSeparators(e),J.embedDarkDotAtLeftBottomCorner(e),J.maybeEmbedPositionAdjustmentPatterns(t,e),J.embedTimingPatterns(e)}static embedTypeInfo(t,e,a){const n=new et;J.makeTypeInfoBits(t,e,n);for(let r=0,s=n.getSize();r<s;++r){const h=n.get(n.getSize()-1-r),o=J.TYPE_INFO_COORDINATES[r],c=o[0],p=o[1];if(a.setBoolean(c,p,h),r<8){const x=a.getWidth()-r-1;a.setBoolean(x,8,h)}else{const y=a.getHeight()-7+(r-8);a.setBoolean(8,y,h)}}}static maybeEmbedVersionInfo(t,e){if(t.getVersionNumber()<7)return;const a=new et;J.makeVersionInfoBits(t,a);let n=6*3-1;for(let r=0;r<6;++r)for(let s=0;s<3;++s){const h=a.get(n);n--,e.setBoolean(r,e.getHeight()-11+s,h),e.setBoolean(e.getHeight()-11+s,r,h)}}static embedDataBits(t,e,a){let n=0,r=-1,s=a.getWidth()-1,h=a.getHeight()-1;for(;s>0;){for(s===6&&(s-=1);h>=0&&h<a.getHeight();){for(let o=0;o<2;++o){const c=s-o;if(!J.isEmpty(a.get(c,h)))continue;let p;n<t.getSize()?(p=t.get(n),++n):p=!1,e!==255&&Lt.getDataMaskBit(e,c,h)&&(p=!p),a.setBoolean(c,h,p)}h+=r}r=-r,h+=r,s-=2}if(n!==t.getSize())throw new At("Not all bits consumed: "+n+"/"+t.getSize())}static findMSBSet(t){return 32-Y.numberOfLeadingZeros(t)}static calculateBCHCode(t,e){if(e===0)throw new D("0 polynomial");const a=J.findMSBSet(e);for(t<<=a-1;J.findMSBSet(t)>=a;)t^=e<<J.findMSBSet(t)-a;return t}static makeTypeInfoBits(t,e,a){if(!We.isValidMaskPattern(e))throw new At("Invalid mask pattern");const n=t.getBits()<<3|e;a.appendBits(n,5);const r=J.calculateBCHCode(n,J.TYPE_INFO_POLY);a.appendBits(r,10);const s=new et;if(s.appendBits(J.TYPE_INFO_MASK_PATTERN,15),a.xor(s),a.getSize()!==15)throw new At("should not happen but we got: "+a.getSize())}static makeVersionInfoBits(t,e){e.appendBits(t.getVersionNumber(),6);const a=J.calculateBCHCode(t.getVersionNumber(),J.VERSION_INFO_POLY);if(e.appendBits(a,12),e.getSize()!==18)throw new At("should not happen but we got: "+e.getSize())}static isEmpty(t){return t===255}static embedTimingPatterns(t){for(let e=8;e<t.getWidth()-8;++e){const a=(e+1)%2;J.isEmpty(t.get(e,6))&&t.setNumber(e,6,a),J.isEmpty(t.get(6,e))&&t.setNumber(6,e,a)}}static embedDarkDotAtLeftBottomCorner(t){if(t.get(8,t.getHeight()-8)===0)throw new At;t.setNumber(8,t.getHeight()-8,1)}static embedHorizontalSeparationPattern(t,e,a){for(let n=0;n<8;++n){if(!J.isEmpty(a.get(t+n,e)))throw new At;a.setNumber(t+n,e,0)}}static embedVerticalSeparationPattern(t,e,a){for(let n=0;n<7;++n){if(!J.isEmpty(a.get(t,e+n)))throw new At;a.setNumber(t,e+n,0)}}static embedPositionAdjustmentPattern(t,e,a){for(let n=0;n<5;++n){const r=J.POSITION_ADJUSTMENT_PATTERN[n];for(let s=0;s<5;++s)a.setNumber(t+s,e+n,r[s])}}static embedPositionDetectionPattern(t,e,a){for(let n=0;n<7;++n){const r=J.POSITION_DETECTION_PATTERN[n];for(let s=0;s<7;++s)a.setNumber(t+s,e+n,r[s])}}static embedPositionDetectionPatternsAndSeparators(t){const e=J.POSITION_DETECTION_PATTERN[0].length;J.embedPositionDetectionPattern(0,0,t),J.embedPositionDetectionPattern(t.getWidth()-e,0,t),J.embedPositionDetectionPattern(0,t.getWidth()-e,t);const a=8;J.embedHorizontalSeparationPattern(0,a-1,t),J.embedHorizontalSeparationPattern(t.getWidth()-a,a-1,t),J.embedHorizontalSeparationPattern(0,t.getWidth()-a,t);const n=7;J.embedVerticalSeparationPattern(n,0,t),J.embedVerticalSeparationPattern(t.getHeight()-n-1,0,t),J.embedVerticalSeparationPattern(n,t.getHeight()-n,t)}static maybeEmbedPositionAdjustmentPatterns(t,e){if(t.getVersionNumber()<2)return;const a=t.getVersionNumber()-1,n=J.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[a];for(let r=0,s=n.length;r!==s;r++){const h=n[r];if(h>=0)for(let o=0;o!==s;o++){const c=n[o];c>=0&&J.isEmpty(e.get(c,h))&&J.embedPositionAdjustmentPattern(c-2,h-2,e)}}}}J.POSITION_DETECTION_PATTERN=Array.from([Int32Array.from([1,1,1,1,1,1,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,1,1,1,1,1,1])]),J.POSITION_ADJUSTMENT_PATTERN=Array.from([Int32Array.from([1,1,1,1,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,0,1,0,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,1,1,1,1])]),J.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE=Array.from([Int32Array.from([-1,-1,-1,-1,-1,-1,-1]),Int32Array.from([6,18,-1,-1,-1,-1,-1]),Int32Array.from([6,22,-1,-1,-1,-1,-1]),Int32Array.from([6,26,-1,-1,-1,-1,-1]),Int32Array.from([6,30,-1,-1,-1,-1,-1]),Int32Array.from([6,34,-1,-1,-1,-1,-1]),Int32Array.from([6,22,38,-1,-1,-1,-1]),Int32Array.from([6,24,42,-1,-1,-1,-1]),Int32Array.from([6,26,46,-1,-1,-1,-1]),Int32Array.from([6,28,50,-1,-1,-1,-1]),Int32Array.from([6,30,54,-1,-1,-1,-1]),Int32Array.from([6,32,58,-1,-1,-1,-1]),Int32Array.from([6,34,62,-1,-1,-1,-1]),Int32Array.from([6,26,46,66,-1,-1,-1]),Int32Array.from([6,26,48,70,-1,-1,-1]),Int32Array.from([6,26,50,74,-1,-1,-1]),Int32Array.from([6,30,54,78,-1,-1,-1]),Int32Array.from([6,30,56,82,-1,-1,-1]),Int32Array.from([6,30,58,86,-1,-1,-1]),Int32Array.from([6,34,62,90,-1,-1,-1]),Int32Array.from([6,28,50,72,94,-1,-1]),Int32Array.from([6,26,50,74,98,-1,-1]),Int32Array.from([6,30,54,78,102,-1,-1]),Int32Array.from([6,28,54,80,106,-1,-1]),Int32Array.from([6,32,58,84,110,-1,-1]),Int32Array.from([6,30,58,86,114,-1,-1]),Int32Array.from([6,34,62,90,118,-1,-1]),Int32Array.from([6,26,50,74,98,122,-1]),Int32Array.from([6,30,54,78,102,126,-1]),Int32Array.from([6,26,52,78,104,130,-1]),Int32Array.from([6,30,56,82,108,134,-1]),Int32Array.from([6,34,60,86,112,138,-1]),Int32Array.from([6,30,58,86,114,142,-1]),Int32Array.from([6,34,62,90,118,146,-1]),Int32Array.from([6,30,54,78,102,126,150]),Int32Array.from([6,24,50,76,102,128,154]),Int32Array.from([6,28,54,80,106,132,158]),Int32Array.from([6,32,58,84,110,136,162]),Int32Array.from([6,26,54,82,110,138,166]),Int32Array.from([6,30,58,86,114,142,170])]),J.TYPE_INFO_COORDINATES=Array.from([Int32Array.from([8,0]),Int32Array.from([8,1]),Int32Array.from([8,2]),Int32Array.from([8,3]),Int32Array.from([8,4]),Int32Array.from([8,5]),Int32Array.from([8,7]),Int32Array.from([8,8]),Int32Array.from([7,8]),Int32Array.from([5,8]),Int32Array.from([4,8]),Int32Array.from([3,8]),Int32Array.from([2,8]),Int32Array.from([1,8]),Int32Array.from([0,8])]),J.VERSION_INFO_POLY=7973,J.TYPE_INFO_POLY=1335,J.TYPE_INFO_MASK_PATTERN=21522;class Er{constructor(t,e){this.dataBytes=t,this.errorCorrectionBytes=e}getDataBytes(){return this.dataBytes}getErrorCorrectionBytes(){return this.errorCorrectionBytes}}class bt{constructor(){}static calculateMaskPenalty(t){return Lt.applyMaskPenaltyRule1(t)+Lt.applyMaskPenaltyRule2(t)+Lt.applyMaskPenaltyRule3(t)+Lt.applyMaskPenaltyRule4(t)}static encode(t,e,a=null){let n=bt.DEFAULT_BYTE_MODE_ENCODING;const r=a!==null&&a.get(kt.CHARACTER_SET)!==void 0;r&&(n=a.get(kt.CHARACTER_SET).toString());const s=this.chooseMode(t,n),h=new et;if(s===K.BYTE&&(r||bt.DEFAULT_BYTE_MODE_ENCODING!==n)){const F=V.getCharacterSetECIByName(n);F!==void 0&&this.appendECI(F,h)}this.appendModeInfo(s,h);const o=new et;this.appendBytes(t,s,o,n);let c;if(a!==null&&a.get(kt.QR_VERSION)!==void 0){const F=Number.parseInt(a.get(kt.QR_VERSION).toString(),10);c=X.getVersionForNumber(F);const P=this.calculateBitsNeeded(s,h,o,c);if(!this.willFit(P,c,e))throw new At("Data too big for requested version")}else c=this.recommendVersion(e,s,h,o);const p=new et;p.appendBitArray(h);const x=s===K.BYTE?o.getSizeInBytes():t.length;this.appendLengthInfo(x,c,s,p),p.appendBitArray(o);const y=c.getECBlocksForLevel(e),A=c.getTotalCodewords()-y.getTotalECCodewords();this.terminateBits(A,p);const E=this.interleaveWithECBytes(p,c.getTotalCodewords(),A,y.getNumBlocks()),I=new We;I.setECLevel(e),I.setMode(s),I.setVersion(c);const S=c.getDimensionForVersion(),O=new R1(S,S),H=this.chooseMaskPattern(E,e,c,O);return I.setMaskPattern(H),J.buildMatrix(E,e,c,H,O),I.setMatrix(O),I}static recommendVersion(t,e,a,n){const r=this.calculateBitsNeeded(e,a,n,X.getVersionForNumber(1)),s=this.chooseVersion(r,t),h=this.calculateBitsNeeded(e,a,n,s);return this.chooseVersion(h,t)}static calculateBitsNeeded(t,e,a,n){return e.getSize()+t.getCharacterCountBits(n)+a.getSize()}static getAlphanumericCode(t){return t<bt.ALPHANUMERIC_TABLE.length?bt.ALPHANUMERIC_TABLE[t]:-1}static chooseMode(t,e=null){if(V.SJIS.getName()===e&&this.isOnlyDoubleByteKanji(t))return K.KANJI;let a=!1,n=!1;for(let r=0,s=t.length;r<s;++r){const h=t.charAt(r);if(bt.isDigit(h))a=!0;else if(this.getAlphanumericCode(h.charCodeAt(0))!==-1)n=!0;else return K.BYTE}return n?K.ALPHANUMERIC:a?K.NUMERIC:K.BYTE}static isOnlyDoubleByteKanji(t){let e;try{e=ae.encode(t,V.SJIS)}catch{return!1}const a=e.length;if(a%2!==0)return!1;for(let n=0;n<a;n+=2){const r=e[n]&255;if((r<129||r>159)&&(r<224||r>235))return!1}return!0}static chooseMaskPattern(t,e,a,n){let r=Number.MAX_SAFE_INTEGER,s=-1;for(let h=0;h<We.NUM_MASK_PATTERNS;h++){J.buildMatrix(t,e,a,h,n);let o=this.calculateMaskPenalty(n);o<r&&(r=o,s=h)}return s}static chooseVersion(t,e){for(let a=1;a<=40;a++){const n=X.getVersionForNumber(a);if(bt.willFit(t,n,e))return n}throw new At("Data too big")}static willFit(t,e,a){const n=e.getTotalCodewords(),s=e.getECBlocksForLevel(a).getTotalECCodewords(),h=n-s,o=(t+7)/8;return h>=o}static terminateBits(t,e){const a=t*8;if(e.getSize()>a)throw new At("data bits cannot fit in the QR Code"+e.getSize()+" > "+a);for(let s=0;s<4&&e.getSize()<a;++s)e.appendBit(!1);const n=e.getSize()&7;if(n>0)for(let s=n;s<8;s++)e.appendBit(!1);const r=t-e.getSizeInBytes();for(let s=0;s<r;++s)e.appendBits(s&1?17:236,8);if(e.getSize()!==a)throw new At("Bits size does not equal capacity")}static getNumDataBytesAndNumECBytesForBlockID(t,e,a,n,r,s){if(n>=a)throw new At("Block ID too large");const h=t%a,o=a-h,c=Math.floor(t/a),p=c+1,x=Math.floor(e/a),y=x+1,A=c-x,E=p-y;if(A!==E)throw new At("EC bytes mismatch");if(a!==o+h)throw new At("RS blocks mismatch");if(t!==(x+A)*o+(y+E)*h)throw new At("Total bytes mismatch");n<o?(r[0]=x,s[0]=A):(r[0]=y,s[0]=E)}static interleaveWithECBytes(t,e,a,n){if(t.getSizeInBytes()!==a)throw new At("Number of bits and data bytes does not match");let r=0,s=0,h=0;const o=new Array;for(let p=0;p<n;++p){const x=new Int32Array(1),y=new Int32Array(1);bt.getNumDataBytesAndNumECBytesForBlockID(e,a,n,p,x,y);const A=x[0],E=new Uint8Array(A);t.toBytes(8*r,E,0,A);const I=bt.generateECBytes(E,y[0]);o.push(new Er(E,I)),s=Math.max(s,A),h=Math.max(h,I.length),r+=x[0]}if(a!==r)throw new At("Data bytes does not match offset");const c=new et;for(let p=0;p<s;++p)for(const x of o){const y=x.getDataBytes();p<y.length&&c.appendBits(y[p],8)}for(let p=0;p<h;++p)for(const x of o){const y=x.getErrorCorrectionBytes();p<y.length&&c.appendBits(y[p],8)}if(e!==c.getSizeInBytes())throw new At("Interleaving error: "+e+" and "+c.getSizeInBytes()+" differ.");return c}static generateECBytes(t,e){const a=t.length,n=new Int32Array(a+e);for(let s=0;s<a;s++)n[s]=t[s]&255;new e2(gt.QR_CODE_FIELD_256).encode(n,e);const r=new Uint8Array(e);for(let s=0;s<e;s++)r[s]=n[a+s];return r}static appendModeInfo(t,e){e.appendBits(t.getBits(),4)}static appendLengthInfo(t,e,a,n){const r=a.getCharacterCountBits(e);if(t>=1<<r)throw new At(t+" is bigger than "+((1<<r)-1));n.appendBits(t,r)}static appendBytes(t,e,a,n){switch(e){case K.NUMERIC:bt.appendNumericBytes(t,a);break;case K.ALPHANUMERIC:bt.appendAlphanumericBytes(t,a);break;case K.BYTE:bt.append8BitBytes(t,a,n);break;case K.KANJI:bt.appendKanjiBytes(t,a);break;default:throw new At("Invalid mode: "+e)}}static getDigit(t){return t.charCodeAt(0)-48}static isDigit(t){const e=bt.getDigit(t);return e>=0&&e<=9}static appendNumericBytes(t,e){const a=t.length;let n=0;for(;n<a;){const r=bt.getDigit(t.charAt(n));if(n+2<a){const s=bt.getDigit(t.charAt(n+1)),h=bt.getDigit(t.charAt(n+2));e.appendBits(r*100+s*10+h,10),n+=3}else if(n+1<a){const s=bt.getDigit(t.charAt(n+1));e.appendBits(r*10+s,7),n+=2}else e.appendBits(r,4),n++}}static appendAlphanumericBytes(t,e){const a=t.length;let n=0;for(;n<a;){const r=bt.getAlphanumericCode(t.charCodeAt(n));if(r===-1)throw new At;if(n+1<a){const s=bt.getAlphanumericCode(t.charCodeAt(n+1));if(s===-1)throw new At;e.appendBits(r*45+s,11),n+=2}else e.appendBits(r,6),n++}}static append8BitBytes(t,e,a){let n;try{n=ae.encode(t,a)}catch(r){throw new At(r)}for(let r=0,s=n.length;r!==s;r++){const h=n[r];e.appendBits(h,8)}}static appendKanjiBytes(t,e){let a;try{a=ae.encode(t,V.SJIS)}catch(r){throw new At(r)}const n=a.length;for(let r=0;r<n;r+=2){const s=a[r]&255,h=a[r+1]&255,o=s<<8&4294967295|h;let c=-1;if(o>=33088&&o<=40956?c=o-33088:o>=57408&&o<=60351&&(c=o-49472),c===-1)throw new At("Invalid byte sequence");const p=(c>>8)*192+(c&255);e.appendBits(p,13)}}static appendECI(t,e){e.appendBits(K.ECI.getBits(),4),e.appendBits(t.getValue(),8)}}bt.ALPHANUMERIC_TABLE=Int32Array.from([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,37,38,-1,-1,-1,-1,39,40,-1,41,42,43,0,1,2,3,4,5,6,7,8,9,44,-1,-1,-1,-1,-1,-1,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,-1,-1,-1,-1,-1]),bt.DEFAULT_BYTE_MODE_ENCODING=V.UTF8.getName();class ze{write(t,e,a,n=null){if(t.length===0)throw new D("Found empty contents");if(e<0||a<0)throw new D("Requested dimensions are too small: "+e+"x"+a);let r=It.L,s=ze.QUIET_ZONE_SIZE;n!==null&&(n.get(kt.ERROR_CORRECTION)!==void 0&&(r=It.fromString(n.get(kt.ERROR_CORRECTION).toString())),n.get(kt.MARGIN)!==void 0&&(s=Number.parseInt(n.get(kt.MARGIN).toString(),10)));const h=bt.encode(t,r,n);return this.renderResult(h,e,a,s)}writeToDom(t,e,a,n,r=null){typeof t=="string"&&(t=document.querySelector(t));const s=this.write(e,a,n,r);t&&t.appendChild(s)}renderResult(t,e,a,n){const r=t.getMatrix();if(r===null)throw new ye;const s=r.getWidth(),h=r.getHeight(),o=s+n*2,c=h+n*2,p=Math.max(e,o),x=Math.max(a,c),y=Math.min(Math.floor(p/o),Math.floor(x/c)),A=Math.floor((p-s*y)/2),E=Math.floor((x-h*y)/2),I=this.createSVGElement(p,x);for(let S=0,O=E;S<h;S++,O+=y)for(let H=0,F=A;H<s;H++,F+=y)if(r.get(H,S)===1){const P=this.createSvgRectElement(F,O,y,y);I.appendChild(P)}return I}createSVGElement(t,e){const a=document.createElementNS(ze.SVG_NS,"svg");return a.setAttributeNS(null,"height",t.toString()),a.setAttributeNS(null,"width",e.toString()),a}createSvgRectElement(t,e,a,n){const r=document.createElementNS(ze.SVG_NS,"rect");return r.setAttributeNS(null,"x",t.toString()),r.setAttributeNS(null,"y",e.toString()),r.setAttributeNS(null,"height",a.toString()),r.setAttributeNS(null,"width",n.toString()),r.setAttributeNS(null,"fill","#000000"),r}}ze.QUIET_ZONE_SIZE=4,ze.SVG_NS="http://www.w3.org/2000/svg";class $e{encode(t,e,a,n,r){if(t.length===0)throw new D("Found empty contents");if(e!==Q.QR_CODE)throw new D("Can only encode QR_CODE, but got "+e);if(a<0||n<0)throw new D(`Requested dimensions are too small: ${a}x${n}`);let s=It.L,h=$e.QUIET_ZONE_SIZE;r!==null&&(r.get(kt.ERROR_CORRECTION)!==void 0&&(s=It.fromString(r.get(kt.ERROR_CORRECTION).toString())),r.get(kt.MARGIN)!==void 0&&(h=Number.parseInt(r.get(kt.MARGIN).toString(),10)));const o=bt.encode(t,s,r);return $e.renderResult(o,a,n,h)}static renderResult(t,e,a,n){const r=t.getMatrix();if(r===null)throw new ye;const s=r.getWidth(),h=r.getHeight(),o=s+n*2,c=h+n*2,p=Math.max(e,o),x=Math.max(a,c),y=Math.min(Math.floor(p/o),Math.floor(x/c)),A=Math.floor((p-s*y)/2),E=Math.floor((x-h*y)/2),I=new Ut(p,x);for(let S=0,O=E;S<h;S++,O+=y)for(let H=0,F=A;H<s;H++,F+=y)r.get(H,S)===1&&I.setRegion(F,O,y,y);return I}}$e.QUIET_ZONE_SIZE=4;class Ir{encode(t,e,a,n,r){let s;switch(e){case Q.QR_CODE:s=new $e;break;default:throw new D("No encoder available for format "+e)}return s.encode(t,e,a,n,r)}}class Ce extends i1{constructor(t,e,a,n,r,s,h,o){if(super(s,h),this.yuvData=t,this.dataWidth=e,this.dataHeight=a,this.left=n,this.top=r,n+s>e||r+h>a)throw new D("Crop rectangle does not fit within image data.");o&&this.reverseHorizontal(s,h)}getRow(t,e){if(t<0||t>=this.getHeight())throw new D("Requested row is outside the image: "+t);const a=this.getWidth();(e==null||e.length<a)&&(e=new Uint8ClampedArray(a));const n=(t+this.top)*this.dataWidth+this.left;return q.arraycopy(this.yuvData,n,e,0,a),e}getMatrix(){const t=this.getWidth(),e=this.getHeight();if(t===this.dataWidth&&e===this.dataHeight)return this.yuvData;const a=t*e,n=new Uint8ClampedArray(a);let r=this.top*this.dataWidth+this.left;if(t===this.dataWidth)return q.arraycopy(this.yuvData,r,n,0,a),n;for(let s=0;s<e;s++){const h=s*t;q.arraycopy(this.yuvData,r,n,h,t),r+=this.dataWidth}return n}isCropSupported(){return!0}crop(t,e,a,n){return new Ce(this.yuvData,this.dataWidth,this.dataHeight,this.left+t,this.top+e,a,n,!1)}renderThumbnail(){const t=this.getWidth()/Ce.THUMBNAIL_SCALE_FACTOR,e=this.getHeight()/Ce.THUMBNAIL_SCALE_FACTOR,a=new Int32Array(t*e),n=this.yuvData;let r=this.top*this.dataWidth+this.left;for(let s=0;s<e;s++){const h=s*t;for(let o=0;o<t;o++){const c=n[r+o*Ce.THUMBNAIL_SCALE_FACTOR]&255;a[h+o]=4278190080|c*65793}r+=this.dataWidth*Ce.THUMBNAIL_SCALE_FACTOR}return a}getThumbnailWidth(){return this.getWidth()/Ce.THUMBNAIL_SCALE_FACTOR}getThumbnailHeight(){return this.getHeight()/Ce.THUMBNAIL_SCALE_FACTOR}reverseHorizontal(t,e){const a=this.yuvData;for(let n=0,r=this.top*this.dataWidth+this.left;n<e;n++,r+=this.dataWidth){const s=r+t/2;for(let h=r,o=r+t-1;h<s;h++,o--){const c=a[h];a[h]=a[o],a[o]=c}}}invert(){return new Te(this)}}Ce.THUMBNAIL_SCALE_FACTOR=2;class a2 extends i1{constructor(t,e,a,n,r,s,h){if(super(e,a),this.dataWidth=n,this.dataHeight=r,this.left=s,this.top=h,t.BYTES_PER_ELEMENT===4){const o=e*a,c=new Uint8ClampedArray(o);for(let p=0;p<o;p++){const x=t[p],y=x>>16&255,A=x>>7&510,E=x&255;c[p]=(y+A+E)/4&255}this.luminances=c}else this.luminances=t;if(n===void 0&&(this.dataWidth=e),r===void 0&&(this.dataHeight=a),s===void 0&&(this.left=0),h===void 0&&(this.top=0),this.left+e>this.dataWidth||this.top+a>this.dataHeight)throw new D("Crop rectangle does not fit within image data.")}getRow(t,e){if(t<0||t>=this.getHeight())throw new D("Requested row is outside the image: "+t);const a=this.getWidth();(e==null||e.length<a)&&(e=new Uint8ClampedArray(a));const n=(t+this.top)*this.dataWidth+this.left;return q.arraycopy(this.luminances,n,e,0,a),e}getMatrix(){const t=this.getWidth(),e=this.getHeight();if(t===this.dataWidth&&e===this.dataHeight)return this.luminances;const a=t*e,n=new Uint8ClampedArray(a);let r=this.top*this.dataWidth+this.left;if(t===this.dataWidth)return q.arraycopy(this.luminances,r,n,0,a),n;for(let s=0;s<e;s++){const h=s*t;q.arraycopy(this.luminances,r,n,h,t),r+=this.dataWidth}return n}isCropSupported(){return!0}crop(t,e,a,n){return new a2(this.luminances,a,n,this.dataWidth,this.dataHeight,this.left+t,this.top+e)}invert(){return new Te(this)}}class S2 extends V{static forName(t){return this.getCharacterSetECIByName(t)}}class n2{}n2.ISO_8859_1=V.ISO8859_1;class T2{isCompact(){return this.compact}setCompact(t){this.compact=t}getSize(){return this.size}setSize(t){this.size=t}getLayers(){return this.layers}setLayers(t){this.layers=t}getCodeWords(){return this.codeWords}setCodeWords(t){this.codeWords=t}getMatrix(){return this.matrix}setMatrix(t){this.matrix=t}}class N2{static singletonList(t){return[t]}static min(t,e){return t.sort(e)[0]}}class br{constructor(t){this.previous=t}getPrevious(){return this.previous}}class t1 extends br{constructor(t,e,a){super(t),this.value=e,this.bitCount=a}appendTo(t,e){t.appendBits(this.value,this.bitCount)}add(t,e){return new t1(this,t,e)}addBinaryShift(t,e){return console.warn("addBinaryShift on SimpleToken, this simply returns a copy of this token"),new t1(this,t,e)}toString(){let t=this.value&(1<<this.bitCount)-1;return t|=1<<this.bitCount,"<"+Y.toBinaryString(t|1<<this.bitCount).substring(1)+">"}}class r2 extends t1{constructor(t,e,a){super(t,0,0),this.binaryShiftStart=e,this.binaryShiftByteCount=a}appendTo(t,e){for(let a=0;a<this.binaryShiftByteCount;a++)(a===0||a===31&&this.binaryShiftByteCount<=62)&&(t.appendBits(31,5),this.binaryShiftByteCount>62?t.appendBits(this.binaryShiftByteCount-31,16):a===0?t.appendBits(Math.min(this.binaryShiftByteCount,31),5):t.appendBits(this.binaryShiftByteCount-31,5)),t.appendBits(e[this.binaryShiftStart+a],8)}addBinaryShift(t,e){return new r2(this,t,e)}toString(){return"<"+this.binaryShiftStart+"::"+(this.binaryShiftStart+this.binaryShiftByteCount-1)+">"}}function Sr(f,t,e){return new r2(f,t,e)}function x1(f,t,e){return new t1(f,t,e)}const Tr=["UPPER","LOWER","DIGIT","MIXED","PUNCT"],Pe=0,O1=1,fe=2,R2=3,Ee=4,Nr=new t1(null,0,0),i2=[Int32Array.from([0,(5<<16)+28,(5<<16)+30,(5<<16)+29,656318]),Int32Array.from([(9<<16)+480+14,0,(5<<16)+30,(5<<16)+29,656318]),Int32Array.from([(4<<16)+14,(9<<16)+448+28,0,(9<<16)+448+29,932798]),Int32Array.from([(5<<16)+29,(5<<16)+28,656318,0,(5<<16)+30]),Int32Array.from([(5<<16)+31,656380,656382,656381,0])];function Rr(f){for(let t of f)st.fill(t,-1);return f[Pe][Ee]=0,f[O1][Ee]=0,f[O1][Pe]=28,f[R2][Ee]=0,f[fe][Ee]=0,f[fe][Pe]=15,f}const O2=Rr(st.createInt32Array(6,6));class Ie{constructor(t,e,a,n){this.token=t,this.mode=e,this.binaryShiftByteCount=a,this.bitCount=n}getMode(){return this.mode}getToken(){return this.token}getBinaryShiftByteCount(){return this.binaryShiftByteCount}getBitCount(){return this.bitCount}latchAndAppend(t,e){let a=this.bitCount,n=this.token;if(t!==this.mode){let s=i2[this.mode][t];n=x1(n,s&65535,s>>16),a+=s>>16}let r=t===fe?4:5;return n=x1(n,e,r),new Ie(n,t,0,a+r)}shiftAndAppend(t,e){let a=this.token,n=this.mode===fe?4:5;return a=x1(a,O2[this.mode][t],n),a=x1(a,e,5),new Ie(a,this.mode,0,this.bitCount+n+5)}addBinaryShiftChar(t){let e=this.token,a=this.mode,n=this.bitCount;if(this.mode===Ee||this.mode===fe){let h=i2[a][Pe];e=x1(e,h&65535,h>>16),n+=h>>16,a=Pe}let r=this.binaryShiftByteCount===0||this.binaryShiftByteCount===31?18:this.binaryShiftByteCount===62?9:8,s=new Ie(e,a,this.binaryShiftByteCount+1,n+r);return s.binaryShiftByteCount===2078&&(s=s.endBinaryShift(t+1)),s}endBinaryShift(t){if(this.binaryShiftByteCount===0)return this;let e=this.token;return e=Sr(e,t-this.binaryShiftByteCount,this.binaryShiftByteCount),new Ie(e,this.mode,0,this.bitCount)}isBetterThanOrEqualTo(t){let e=this.bitCount+(i2[this.mode][t.mode]>>16);return this.binaryShiftByteCount<t.binaryShiftByteCount?e+=Ie.calculateBinaryShiftCost(t)-Ie.calculateBinaryShiftCost(this):this.binaryShiftByteCount>t.binaryShiftByteCount&&t.binaryShiftByteCount>0&&(e+=10),e<=t.bitCount}toBitArray(t){let e=[];for(let n=this.endBinaryShift(t.length).token;n!==null;n=n.getPrevious())e.unshift(n);let a=new et;for(const n of e)n.appendTo(a,t);return a}toString(){return tt.format("%s bits=%d bytes=%d",Tr[this.mode],this.bitCount,this.binaryShiftByteCount)}static calculateBinaryShiftCost(t){return t.binaryShiftByteCount>62?21:t.binaryShiftByteCount>31?20:t.binaryShiftByteCount>0?10:0}}Ie.INITIAL_STATE=new Ie(Nr,Pe,0,0);function Or(f){const t=tt.getCharCode(" "),e=tt.getCharCode("."),a=tt.getCharCode(",");f[Pe][t]=1;const n=tt.getCharCode("Z"),r=tt.getCharCode("A");for(let y=r;y<=n;y++)f[Pe][y]=y-r+2;f[O1][t]=1;const s=tt.getCharCode("z"),h=tt.getCharCode("a");for(let y=h;y<=s;y++)f[O1][y]=y-h+2;f[fe][t]=1;const o=tt.getCharCode("9"),c=tt.getCharCode("0");for(let y=c;y<=o;y++)f[fe][y]=y-c+2;f[fe][a]=12,f[fe][e]=13;const p=["\0"," ","","","","","","","\x07","\b","	",`
`,"\v","\f","\r","\x1B","","","","","@","\\","^","_","`","|","~",""];for(let y=0;y<p.length;y++)f[R2][tt.getCharCode(p[y])]=y;const x=["\0","\r","\0","\0","\0","\0","!","'","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","[","]","{","}"];for(let y=0;y<x.length;y++)tt.getCharCode(x[y])>0&&(f[Ee][tt.getCharCode(x[y])]=y);return f}const s2=Or(st.createInt32Array(5,256));class M1{constructor(t){this.text=t}encode(){const t=tt.getCharCode(" "),e=tt.getCharCode(`
`);let a=N2.singletonList(Ie.INITIAL_STATE);for(let r=0;r<this.text.length;r++){let s,h=r+1<this.text.length?this.text[r+1]:0;switch(this.text[r]){case tt.getCharCode("\r"):s=h===e?2:0;break;case tt.getCharCode("."):s=h===t?3:0;break;case tt.getCharCode(","):s=h===t?4:0;break;case tt.getCharCode(":"):s=h===t?5:0;break;default:s=0}s>0?(a=M1.updateStateListForPair(a,r,s),r++):a=this.updateStateListForChar(a,r)}return N2.min(a,(r,s)=>r.getBitCount()-s.getBitCount()).toBitArray(this.text)}updateStateListForChar(t,e){const a=[];for(let n of t)this.updateStateForChar(n,e,a);return M1.simplifyStates(a)}updateStateForChar(t,e,a){let n=this.text[e]&255,r=s2[t.getMode()][n]>0,s=null;for(let h=0;h<=Ee;h++){let o=s2[h][n];if(o>0){if(s==null&&(s=t.endBinaryShift(e)),!r||h===t.getMode()||h===fe){const c=s.latchAndAppend(h,o);a.push(c)}if(!r&&O2[t.getMode()][h]>=0){const c=s.shiftAndAppend(h,o);a.push(c)}}}if(t.getBinaryShiftByteCount()>0||s2[t.getMode()][n]===0){let h=t.addBinaryShiftChar(e);a.push(h)}}static updateStateListForPair(t,e,a){const n=[];for(let r of t)this.updateStateForPair(r,e,a,n);return this.simplifyStates(n)}static updateStateForPair(t,e,a,n){let r=t.endBinaryShift(e);if(n.push(r.latchAndAppend(Ee,a)),t.getMode()!==Ee&&n.push(r.shiftAndAppend(Ee,a)),a===3||a===4){let s=r.latchAndAppend(fe,16-a).latchAndAppend(fe,1);n.push(s)}if(t.getBinaryShiftByteCount()>0){let s=t.addBinaryShiftChar(e).addBinaryShiftChar(e+1);n.push(s)}}static simplifyStates(t){let e=[];for(const a of t){let n=!0;for(const r of e){if(r.isBetterThanOrEqualTo(a)){n=!1;break}a.isBetterThanOrEqualTo(r)&&(e=e.filter(s=>s!==r))}n&&e.push(a)}return e}}class lt{constructor(){}static encodeBytes(t){return lt.encode(t,lt.DEFAULT_EC_PERCENT,lt.DEFAULT_AZTEC_LAYERS)}static encode(t,e,a){let n=new M1(t).encode(),r=Y.truncDivision(n.getSize()*e,100)+11,s=n.getSize()+r,h,o,c,p,x;if(a!==lt.DEFAULT_AZTEC_LAYERS){if(h=a<0,o=Math.abs(a),o>(h?lt.MAX_NB_BITS_COMPACT:lt.MAX_NB_BITS))throw new D(tt.format("Illegal value %s for layers",a));c=lt.totalBitsInLayer(o,h),p=lt.WORD_SIZE[o];let P=c-c%p;if(x=lt.stuffBits(n,p),x.getSize()+r>P)throw new D("Data to large for user specified layer");if(h&&x.getSize()>p*64)throw new D("Data to large for user specified layer")}else{p=0,x=null;for(let P=0;;P++){if(P>lt.MAX_NB_BITS)throw new D("Data too large for an Aztec code");if(h=P<=3,o=h?P+1:P,c=lt.totalBitsInLayer(o,h),s>c)continue;(x==null||p!==lt.WORD_SIZE[o])&&(p=lt.WORD_SIZE[o],x=lt.stuffBits(n,p));let ht=c-c%p;if(!(h&&x.getSize()>p*64)&&x.getSize()+r<=ht)break}}let y=lt.generateCheckWords(x,c,p),A=x.getSize()/p,E=lt.generateModeMessage(h,o,A),I=(h?11:14)+o*4,S=new Int32Array(I),O;if(h){O=I;for(let P=0;P<S.length;P++)S[P]=P}else{O=I+1+2*Y.truncDivision(Y.truncDivision(I,2)-1,15);let P=Y.truncDivision(I,2),ht=Y.truncDivision(O,2);for(let at=0;at<P;at++){let he=at+Y.truncDivision(at,15);S[P-at-1]=ht-he-1,S[P+at]=ht+he+1}}let H=new Ut(O);for(let P=0,ht=0;P<o;P++){let at=(o-P)*4+(h?9:12);for(let he=0;he<at;he++){let ve=he*2;for(let oe=0;oe<2;oe++)y.get(ht+ve+oe)&&H.set(S[P*2+oe],S[P*2+he]),y.get(ht+at*2+ve+oe)&&H.set(S[P*2+he],S[I-1-P*2-oe]),y.get(ht+at*4+ve+oe)&&H.set(S[I-1-P*2-oe],S[I-1-P*2-he]),y.get(ht+at*6+ve+oe)&&H.set(S[I-1-P*2-he],S[P*2+oe])}ht+=at*8}if(lt.drawModeMessage(H,h,O,E),h)lt.drawBullsEye(H,Y.truncDivision(O,2),5);else{lt.drawBullsEye(H,Y.truncDivision(O,2),7);for(let P=0,ht=0;P<Y.truncDivision(I,2)-1;P+=15,ht+=16)for(let at=Y.truncDivision(O,2)&1;at<O;at+=2)H.set(Y.truncDivision(O,2)-ht,at),H.set(Y.truncDivision(O,2)+ht,at),H.set(at,Y.truncDivision(O,2)-ht),H.set(at,Y.truncDivision(O,2)+ht)}let F=new T2;return F.setCompact(h),F.setSize(O),F.setLayers(o),F.setCodeWords(A),F.setMatrix(H),F}static drawBullsEye(t,e,a){for(let n=0;n<a;n+=2)for(let r=e-n;r<=e+n;r++)t.set(r,e-n),t.set(r,e+n),t.set(e-n,r),t.set(e+n,r);t.set(e-a,e-a),t.set(e-a+1,e-a),t.set(e-a,e-a+1),t.set(e+a,e-a),t.set(e+a,e-a+1),t.set(e+a,e+a-1)}static generateModeMessage(t,e,a){let n=new et;return t?(n.appendBits(e-1,2),n.appendBits(a-1,6),n=lt.generateCheckWords(n,28,4)):(n.appendBits(e-1,5),n.appendBits(a-1,11),n=lt.generateCheckWords(n,40,4)),n}static drawModeMessage(t,e,a,n){let r=Y.truncDivision(a,2);if(e)for(let s=0;s<7;s++){let h=r-3+s;n.get(s)&&t.set(h,r-5),n.get(s+7)&&t.set(r+5,h),n.get(20-s)&&t.set(h,r+5),n.get(27-s)&&t.set(r-5,h)}else for(let s=0;s<10;s++){let h=r-5+s+Y.truncDivision(s,5);n.get(s)&&t.set(h,r-7),n.get(s+10)&&t.set(r+7,h),n.get(29-s)&&t.set(h,r+7),n.get(39-s)&&t.set(r-7,h)}}static generateCheckWords(t,e,a){let n=t.getSize()/a,r=new e2(lt.getGF(a)),s=Y.truncDivision(e,a),h=lt.bitsToWords(t,a,s);r.encode(h,s-n);let o=e%a,c=new et;c.appendBits(0,o);for(const p of Array.from(h))c.appendBits(p,a);return c}static bitsToWords(t,e,a){let n=new Int32Array(a),r,s;for(r=0,s=t.getSize()/e;r<s;r++){let h=0;for(let o=0;o<e;o++)h|=t.get(r*e+o)?1<<e-o-1:0;n[r]=h}return n}static getGF(t){switch(t){case 4:return gt.AZTEC_PARAM;case 6:return gt.AZTEC_DATA_6;case 8:return gt.AZTEC_DATA_8;case 10:return gt.AZTEC_DATA_10;case 12:return gt.AZTEC_DATA_12;default:throw new D("Unsupported word size "+t)}}static stuffBits(t,e){let a=new et,n=t.getSize(),r=(1<<e)-2;for(let s=0;s<n;s+=e){let h=0;for(let o=0;o<e;o++)(s+o>=n||t.get(s+o))&&(h|=1<<e-1-o);(h&r)===r?(a.appendBits(h&r,e),s--):h&r?a.appendBits(h,e):(a.appendBits(h|1,e),s--)}return a}static totalBitsInLayer(t,e){return((e?88:112)+16*t)*t}}lt.DEFAULT_EC_PERCENT=33,lt.DEFAULT_AZTEC_LAYERS=0,lt.MAX_NB_BITS=32,lt.MAX_NB_BITS_COMPACT=4,lt.WORD_SIZE=Int32Array.from([4,6,6,8,8,8,8,8,8,10,10,10,10,10,10,10,10,10,10,10,10,10,10,12,12,12,12,12,12,12,12,12,12]);class D1{encode(t,e,a,n){return this.encodeWithHints(t,e,a,n,null)}encodeWithHints(t,e,a,n,r){let s=n2.ISO_8859_1,h=lt.DEFAULT_EC_PERCENT,o=lt.DEFAULT_AZTEC_LAYERS;return r!=null&&(r.has(kt.CHARACTER_SET)&&(s=S2.forName(r.get(kt.CHARACTER_SET).toString())),r.has(kt.ERROR_CORRECTION)&&(h=Y.parseInt(r.get(kt.ERROR_CORRECTION).toString())),r.has(kt.AZTEC_LAYERS)&&(o=Y.parseInt(r.get(kt.AZTEC_LAYERS).toString()))),D1.encodeLayers(t,e,a,n,s,h,o)}static encodeLayers(t,e,a,n,r,s,h){if(e!==Q.AZTEC)throw new D("Can only encode AZTEC, but got "+e);let o=lt.encode(tt.getBytes(t,r),s,h);return D1.renderResult(o,a,n)}static renderResult(t,e,a){let n=t.getMatrix();if(n==null)throw new ye;let r=n.getWidth(),s=n.getHeight(),h=Math.max(e,r),o=Math.max(a,s),c=Math.min(h/r,o/s),p=(h-r*c)/2,x=(o-s*c)/2,y=new Ut(h,o);for(let A=0,E=x;A<s;A++,E+=c)for(let I=0,S=p;I<r;I++,S+=c)n.get(I,A)&&y.setRegion(S,E,c,c);return y}}d.AbstractExpandedDecoder=z1,d.ArgumentException=_,d.ArithmeticException=m1,d.AztecCode=T2,d.AztecCodeReader=C1,d.AztecCodeWriter=D1,d.AztecDecoder=Et,d.AztecDetector=g2,d.AztecDetectorResult=p2,d.AztecEncoder=lt,d.AztecHighLevelEncoder=M1,d.AztecPoint=te,d.BarcodeFormat=Q,d.Binarizer=pt,d.BinaryBitmap=j,d.BitArray=et,d.BitMatrix=Ut,d.BitSource=j1,d.BrowserAztecCodeReader=nr,d.BrowserBarcodeReader=or,d.BrowserCodeReader=Ve,d.BrowserDatamatrixCodeReader=dr,d.BrowserMultiFormatReader=wr,d.BrowserPDF417Reader=Ar,d.BrowserQRCodeReader=Cr,d.BrowserQRCodeSvgWriter=ze,d.CharacterSetECI=V,d.ChecksumException=z,d.Code128Reader=U,d.Code39Reader=Ft,d.DataMatrixDecodedBitStreamParser=De,d.DataMatrixReader=_e,d.DecodeHintType=ut,d.DecoderResult=s1,d.DefaultGridSampler=u2,d.DetectorResult=A1,d.EAN13Reader=ke,d.EncodeHintType=kt,d.Exception=w,d.FormatException=k,d.GenericGF=gt,d.GenericGFPoly=ne,d.GlobalHistogramBinarizer=Zt,d.GridSampler=U1,d.GridSamplerInstance=Re,d.HTMLCanvasElementLuminanceSource=Ne,d.HybridBinarizer=nt,d.ITFReader=wt,d.IllegalArgumentException=D,d.IllegalStateException=ye,d.InvertedLuminanceSource=Te,d.LuminanceSource=i1,d.MathUtils=dt,d.MultiFormatOneDReader=Qe,d.MultiFormatReader=b2,d.MultiFormatWriter=Ir,d.NotFoundException=L,d.OneDReader=Ht,d.PDF417DecodedBitStreamParser=R,d.PDF417DecoderErrorCorrection=m2,d.PDF417Reader=Yt,d.PDF417ResultMetadata=A2,d.PerspectiveTransform=xe,d.PlanarYUVLuminanceSource=Ce,d.QRCodeByteMatrix=R1,d.QRCodeDataMask=ue,d.QRCodeDecodedBitStreamParser=Ot,d.QRCodeDecoderErrorCorrectionLevel=It,d.QRCodeDecoderFormatInformation=Qt,d.QRCodeEncoder=bt,d.QRCodeEncoderQRCode=We,d.QRCodeMaskUtil=Lt,d.QRCodeMatrixUtil=J,d.QRCodeMode=K,d.QRCodeReader=Le,d.QRCodeVersion=X,d.QRCodeWriter=$e,d.RGBLuminanceSource=a2,d.RSS14Reader=_t,d.RSSExpandedReader=B,d.ReaderException=N1,d.ReedSolomonDecoder=o1,d.ReedSolomonEncoder=e2,d.ReedSolomonException=qe,d.Result=$t,d.ResultMetadataType=Gt,d.ResultPoint=W,d.StringUtils=tt,d.UnsupportedOperationException=Xe,d.VideoInputDevice=l2,d.WhiteRectangleDetector=be,d.WriterException=At,d.ZXingArrays=st,d.ZXingCharset=S2,d.ZXingInteger=Y,d.ZXingStandardCharsets=n2,d.ZXingStringBuilder=yt,d.ZXingStringEncoding=ae,d.ZXingSystem=q,d.createAbstractExpandedDecoder=v2,Object.defineProperty(d,"__esModule",{value:!0})})})(c2,c2.exports);var St=c2.exports;const eA=tA(St),aA=Pr({__proto__:null,default:eA},[St]);var Wn=function(){function v(l,d,u){if(this.formatMap=new Map([[G.QR_CODE,St.BarcodeFormat.QR_CODE],[G.AZTEC,St.BarcodeFormat.AZTEC],[G.CODABAR,St.BarcodeFormat.CODABAR],[G.CODE_39,St.BarcodeFormat.CODE_39],[G.CODE_93,St.BarcodeFormat.CODE_93],[G.CODE_128,St.BarcodeFormat.CODE_128],[G.DATA_MATRIX,St.BarcodeFormat.DATA_MATRIX],[G.MAXICODE,St.BarcodeFormat.MAXICODE],[G.ITF,St.BarcodeFormat.ITF],[G.EAN_13,St.BarcodeFormat.EAN_13],[G.EAN_8,St.BarcodeFormat.EAN_8],[G.PDF_417,St.BarcodeFormat.PDF_417],[G.RSS_14,St.BarcodeFormat.RSS_14],[G.RSS_EXPANDED,St.BarcodeFormat.RSS_EXPANDED],[G.UPC_A,St.BarcodeFormat.UPC_A],[G.UPC_E,St.BarcodeFormat.UPC_E],[G.UPC_EAN_EXTENSION,St.BarcodeFormat.UPC_EAN_EXTENSION]]),this.reverseFormatMap=this.createReverseFormatMap(),!aA)throw"Use html5qrcode.min.js without edit, ZXing not found.";this.verbose=d,this.logger=u;var M=this.createZXingFormats(l),g=new Map;g.set(St.DecodeHintType.POSSIBLE_FORMATS,M),g.set(St.DecodeHintType.TRY_HARDER,!1),this.hints=g}return v.prototype.decodeAsync=function(l){var d=this;return new Promise(function(u,M){try{u(d.decode(l))}catch(g){M(g)}})},v.prototype.decode=function(l){var d=new St.MultiFormatReader(this.verbose,this.hints),u=new St.HTMLCanvasElementLuminanceSource(l),M=new St.BinaryBitmap(new St.HybridBinarizer(u)),g=d.decode(M);return{text:g.text,format:Jn.create(this.toHtml5QrcodeSupportedFormats(g.format)),debugData:this.createDebugData()}},v.prototype.createReverseFormatMap=function(){var l=new Map;return this.formatMap.forEach(function(d,u,M){l.set(d,u)}),l},v.prototype.toHtml5QrcodeSupportedFormats=function(l){if(!this.reverseFormatMap.has(l))throw"reverseFormatMap doesn't have ".concat(l);return this.reverseFormatMap.get(l)},v.prototype.createZXingFormats=function(l){for(var d=[],u=0,M=l;u<M.length;u++){var g=M[u];this.formatMap.has(g)?d.push(this.formatMap.get(g)):this.logger.logError("".concat(g," is not supported by")+"ZXingHtml5QrcodeShim")}return d},v.prototype.createDebugData=function(){return{decoderName:"zxing-js"}},v}(),nA=function(v,l,d,u){function M(g){return g instanceof d?g:new d(function(C){C(g)})}return new(d||(d=Promise))(function(g,C){function b(_){try{w(u.next(_))}catch(D){C(D)}}function N(_){try{w(u.throw(_))}catch(D){C(D)}}function w(_){_.done?g(_.value):M(_.value).then(b,N)}w((u=u.apply(v,l||[])).next())})},rA=function(v,l){var d={label:0,sent:function(){if(g[0]&1)throw g[1];return g[1]},trys:[],ops:[]},u,M,g,C;return C={next:b(0),throw:b(1),return:b(2)},typeof Symbol=="function"&&(C[Symbol.iterator]=function(){return this}),C;function b(w){return function(_){return N([w,_])}}function N(w){if(u)throw new TypeError("Generator is already executing.");for(;C&&(C=0,w[0]&&(d=0)),d;)try{if(u=1,M&&(g=w[0]&2?M.return:w[0]?M.throw||((g=M.return)&&g.call(M),0):M.next)&&!(g=g.call(M,w[1])).done)return g;switch(M=0,g&&(w=[w[0]&2,g.value]),w[0]){case 0:case 1:g=w;break;case 4:return d.label++,{value:w[1],done:!1};case 5:d.label++,M=w[1],w=[0];continue;case 7:w=d.ops.pop(),d.trys.pop();continue;default:if(g=d.trys,!(g=g.length>0&&g[g.length-1])&&(w[0]===6||w[0]===2)){d=0;continue}if(w[0]===3&&(!g||w[1]>g[0]&&w[1]<g[3])){d.label=w[1];break}if(w[0]===6&&d.label<g[1]){d.label=g[1],g=w;break}if(g&&d.label<g[2]){d.label=g[2],d.ops.push(w);break}g[2]&&d.ops.pop(),d.trys.pop();continue}w=l.call(v,d)}catch(_){w=[6,_],M=0}finally{u=g=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}},zn=function(){function v(l,d,u){if(this.formatMap=new Map([[G.QR_CODE,"qr_code"],[G.AZTEC,"aztec"],[G.CODABAR,"codabar"],[G.CODE_39,"code_39"],[G.CODE_93,"code_93"],[G.CODE_128,"code_128"],[G.DATA_MATRIX,"data_matrix"],[G.ITF,"itf"],[G.EAN_13,"ean_13"],[G.EAN_8,"ean_8"],[G.PDF_417,"pdf417"],[G.UPC_A,"upc_a"],[G.UPC_E,"upc_e"]]),this.reverseFormatMap=this.createReverseFormatMap(),!v.isSupported())throw"Use html5qrcode.min.js without edit, Use BarcodeDetectorDelegate only if it isSupported();";this.verbose=d,this.logger=u;var M=this.createBarcodeDetectorFormats(l);if(this.detector=new BarcodeDetector(M),!this.detector)throw"BarcodeDetector detector not supported"}return v.isSupported=function(){if(!("BarcodeDetector"in window))return!1;var l=new BarcodeDetector({formats:["qr_code"]});return typeof l<"u"},v.prototype.decodeAsync=function(l){return nA(this,void 0,void 0,function(){var d,u;return rA(this,function(M){switch(M.label){case 0:return[4,this.detector.detect(l)];case 1:if(d=M.sent(),!d||d.length===0)throw"No barcode or QR code detected.";return u=this.selectLargestBarcode(d),[2,{text:u.rawValue,format:Jn.create(this.toHtml5QrcodeSupportedFormats(u.format)),debugData:this.createDebugData()}]}})})},v.prototype.selectLargestBarcode=function(l){for(var d=null,u=0,M=0,g=l;M<g.length;M++){var C=g[M],b=C.boundingBox.width*C.boundingBox.height;b>u&&(u=b,d=C)}if(!d)throw"No largest barcode found";return d},v.prototype.createBarcodeDetectorFormats=function(l){for(var d=[],u=0,M=l;u<M.length;u++){var g=M[u];this.formatMap.has(g)?d.push(this.formatMap.get(g)):this.logger.warn("".concat(g," is not supported by")+"BarcodeDetectorDelegate")}return{formats:d}},v.prototype.toHtml5QrcodeSupportedFormats=function(l){if(!this.reverseFormatMap.has(l))throw"reverseFormatMap doesn't have ".concat(l);return this.reverseFormatMap.get(l)},v.prototype.createReverseFormatMap=function(){var l=new Map;return this.formatMap.forEach(function(d,u,M){l.set(d,u)}),l},v.prototype.createDebugData=function(){return{decoderName:"BarcodeDetector"}},v}(),Xn=function(v,l,d,u){function M(g){return g instanceof d?g:new d(function(C){C(g)})}return new(d||(d=Promise))(function(g,C){function b(_){try{w(u.next(_))}catch(D){C(D)}}function N(_){try{w(u.throw(_))}catch(D){C(D)}}function w(_){_.done?g(_.value):M(_.value).then(b,N)}w((u=u.apply(v,l||[])).next())})},qn=function(v,l){var d={label:0,sent:function(){if(g[0]&1)throw g[1];return g[1]},trys:[],ops:[]},u,M,g,C;return C={next:b(0),throw:b(1),return:b(2)},typeof Symbol=="function"&&(C[Symbol.iterator]=function(){return this}),C;function b(w){return function(_){return N([w,_])}}function N(w){if(u)throw new TypeError("Generator is already executing.");for(;C&&(C=0,w[0]&&(d=0)),d;)try{if(u=1,M&&(g=w[0]&2?M.return:w[0]?M.throw||((g=M.return)&&g.call(M),0):M.next)&&!(g=g.call(M,w[1])).done)return g;switch(M=0,g&&(w=[w[0]&2,g.value]),w[0]){case 0:case 1:g=w;break;case 4:return d.label++,{value:w[1],done:!1};case 5:d.label++,M=w[1],w=[0];continue;case 7:w=d.ops.pop(),d.trys.pop();continue;default:if(g=d.trys,!(g=g.length>0&&g[g.length-1])&&(w[0]===6||w[0]===2)){d=0;continue}if(w[0]===3&&(!g||w[1]>g[0]&&w[1]<g[3])){d.label=w[1];break}if(w[0]===6&&d.label<g[1]){d.label=g[1],g=w;break}if(g&&d.label<g[2]){d.label=g[2],d.ops.push(w);break}g[2]&&d.ops.pop(),d.trys.pop();continue}w=l.call(v,d)}catch(_){w=[6,_],M=0}finally{u=g=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}},iA=function(){function v(l,d,u,M){this.EXECUTIONS_TO_REPORT_PERFORMANCE=100,this.executions=0,this.executionResults=[],this.wasPrimaryDecoderUsedInLastDecode=!1,this.verbose=u,d&&zn.isSupported()?(this.primaryDecoder=new zn(l,u,M),this.secondaryDecoder=new Wn(l,u,M)):this.primaryDecoder=new Wn(l,u,M)}return v.prototype.decodeAsync=function(l){return Xn(this,void 0,void 0,function(){var d;return qn(this,function(u){switch(u.label){case 0:d=performance.now(),u.label=1;case 1:return u.trys.push([1,,3,4]),[4,this.getDecoder().decodeAsync(l)];case 2:return[2,u.sent()];case 3:return this.possiblyLogPerformance(d),[7];case 4:return[2]}})})},v.prototype.decodeRobustlyAsync=function(l){return Xn(this,void 0,void 0,function(){var d,u;return qn(this,function(M){switch(M.label){case 0:d=performance.now(),M.label=1;case 1:return M.trys.push([1,3,4,5]),[4,this.primaryDecoder.decodeAsync(l)];case 2:return[2,M.sent()];case 3:if(u=M.sent(),this.secondaryDecoder)return[2,this.secondaryDecoder.decodeAsync(l)];throw u;case 4:return this.possiblyLogPerformance(d),[7];case 5:return[2]}})})},v.prototype.getDecoder=function(){return this.secondaryDecoder?this.wasPrimaryDecoderUsedInLastDecode===!1?(this.wasPrimaryDecoderUsedInLastDecode=!0,this.primaryDecoder):(this.wasPrimaryDecoderUsedInLastDecode=!1,this.secondaryDecoder):this.primaryDecoder},v.prototype.possiblyLogPerformance=function(l){if(this.verbose){var d=performance.now()-l;this.executionResults.push(d),this.executions++,this.possiblyFlushPerformanceReport()}},v.prototype.possiblyFlushPerformanceReport=function(){if(!(this.executions<this.EXECUTIONS_TO_REPORT_PERFORMANCE)){for(var l=0,d=0,u=this.executionResults;d<u.length;d++){var M=u[d];l+=M}var g=l/this.executionResults.length;console.log("".concat(g," ms for ").concat(this.executionResults.length," last runs.")),this.executions=0,this.executionResults=[]}},v}(),d2=function(){var v=function(l,d){return v=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(u,M){u.__proto__=M}||function(u,M){for(var g in M)Object.prototype.hasOwnProperty.call(M,g)&&(u[g]=M[g])},v(l,d)};return function(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Class extends value "+String(d)+" is not a constructor or null");v(l,d);function u(){this.constructor=l}l.prototype=d===null?Object.create(d):(u.prototype=d.prototype,new u)}}(),H1=function(v,l,d,u){function M(g){return g instanceof d?g:new d(function(C){C(g)})}return new(d||(d=Promise))(function(g,C){function b(_){try{w(u.next(_))}catch(D){C(D)}}function N(_){try{w(u.throw(_))}catch(D){C(D)}}function w(_){_.done?g(_.value):M(_.value).then(b,N)}w((u=u.apply(v,l||[])).next())})},F1=function(v,l){var d={label:0,sent:function(){if(g[0]&1)throw g[1];return g[1]},trys:[],ops:[]},u,M,g,C;return C={next:b(0),throw:b(1),return:b(2)},typeof Symbol=="function"&&(C[Symbol.iterator]=function(){return this}),C;function b(w){return function(_){return N([w,_])}}function N(w){if(u)throw new TypeError("Generator is already executing.");for(;C&&(C=0,w[0]&&(d=0)),d;)try{if(u=1,M&&(g=w[0]&2?M.return:w[0]?M.throw||((g=M.return)&&g.call(M),0):M.next)&&!(g=g.call(M,w[1])).done)return g;switch(M=0,g&&(w=[w[0]&2,g.value]),w[0]){case 0:case 1:g=w;break;case 4:return d.label++,{value:w[1],done:!1};case 5:d.label++,M=w[1],w=[0];continue;case 7:w=d.ops.pop(),d.trys.pop();continue;default:if(g=d.trys,!(g=g.length>0&&g[g.length-1])&&(w[0]===6||w[0]===2)){d=0;continue}if(w[0]===3&&(!g||w[1]>g[0]&&w[1]<g[3])){d.label=w[1];break}if(w[0]===6&&d.label<g[1]){d.label=g[1],g=w;break}if(g&&d.label<g[2]){d.label=g[2],d.ops.push(w);break}g[2]&&d.ops.pop(),d.trys.pop();continue}w=l.call(v,d)}catch(_){w=[6,_],M=0}finally{u=g=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}},tr=function(){function v(l,d){this.name=l,this.track=d}return v.prototype.isSupported=function(){return this.track.getCapabilities?this.name in this.track.getCapabilities():!1},v.prototype.apply=function(l){var d={};d[this.name]=l;var u={advanced:[d]};return this.track.applyConstraints(u)},v.prototype.value=function(){var l=this.track.getSettings();if(this.name in l){var d=l[this.name];return d}return null},v}(),sA=function(v){d2(l,v);function l(d,u){return v.call(this,d,u)||this}return l.prototype.min=function(){return this.getCapabilities().min},l.prototype.max=function(){return this.getCapabilities().max},l.prototype.step=function(){return this.getCapabilities().step},l.prototype.apply=function(d){var u={};u[this.name]=d;var M={advanced:[u]};return this.track.applyConstraints(M)},l.prototype.getCapabilities=function(){this.failIfNotSupported();var d=this.track.getCapabilities(),u=d[this.name];return{min:u.min,max:u.max,step:u.step}},l.prototype.failIfNotSupported=function(){if(!this.isSupported())throw new Error("".concat(this.name," capability not supported"))},l}(tr),hA=function(v){d2(l,v);function l(d){return v.call(this,"zoom",d)||this}return l}(sA),oA=function(v){d2(l,v);function l(d){return v.call(this,"torch",d)||this}return l}(tr),cA=function(){function v(l){this.track=l}return v.prototype.zoomFeature=function(){return new hA(this.track)},v.prototype.torchFeature=function(){return new oA(this.track)},v}(),dA=function(){function v(l,d,u){this.isClosed=!1,this.parentElement=l,this.mediaStream=d,this.callbacks=u,this.surface=this.createVideoElement(this.parentElement.clientWidth),l.append(this.surface)}return v.prototype.createVideoElement=function(l){var d=document.createElement("video");return d.style.width="".concat(l,"px"),d.style.display="block",d.muted=!0,d.setAttribute("muted","true"),d.playsInline=!0,d},v.prototype.setupSurface=function(){var l=this;this.surface.onabort=function(){throw"RenderedCameraImpl video surface onabort() called"},this.surface.onerror=function(){throw"RenderedCameraImpl video surface onerror() called"};var d=function(){var u=l.surface.clientWidth,M=l.surface.clientHeight;l.callbacks.onRenderSurfaceReady(u,M),l.surface.removeEventListener("playing",d)};this.surface.addEventListener("playing",d),this.surface.srcObject=this.mediaStream,this.surface.play()},v.create=function(l,d,u,M){return H1(this,void 0,void 0,function(){var g,C;return F1(this,function(b){switch(b.label){case 0:return g=new v(l,d,M),u.aspectRatio?(C={aspectRatio:u.aspectRatio},[4,g.getFirstTrackOrFail().applyConstraints(C)]):[3,2];case 1:b.sent(),b.label=2;case 2:return g.setupSurface(),[2,g]}})})},v.prototype.failIfClosed=function(){if(this.isClosed)throw"The RenderedCamera has already been closed."},v.prototype.getFirstTrackOrFail=function(){if(this.failIfClosed(),this.mediaStream.getVideoTracks().length===0)throw"No video tracks found";return this.mediaStream.getVideoTracks()[0]},v.prototype.pause=function(){this.failIfClosed(),this.surface.pause()},v.prototype.resume=function(l){this.failIfClosed();var d=this,u=function(){setTimeout(l,200),d.surface.removeEventListener("playing",u)};this.surface.addEventListener("playing",u),this.surface.play()},v.prototype.isPaused=function(){return this.failIfClosed(),this.surface.paused},v.prototype.getSurface=function(){return this.failIfClosed(),this.surface},v.prototype.getRunningTrackCapabilities=function(){return this.getFirstTrackOrFail().getCapabilities()},v.prototype.getRunningTrackSettings=function(){return this.getFirstTrackOrFail().getSettings()},v.prototype.applyVideoConstraints=function(l){return H1(this,void 0,void 0,function(){return F1(this,function(d){if("aspectRatio"in l)throw"Changing 'aspectRatio' in run-time is not yet supported.";return[2,this.getFirstTrackOrFail().applyConstraints(l)]})})},v.prototype.close=function(){if(this.isClosed)return Promise.resolve();var l=this;return new Promise(function(d,u){var M=l.mediaStream.getVideoTracks(),g=M.length,C=0;l.mediaStream.getVideoTracks().forEach(function(b){l.mediaStream.removeTrack(b),b.stop(),++C,C>=g&&(l.isClosed=!0,l.parentElement.removeChild(l.surface),d())})})},v.prototype.getCapabilities=function(){return new cA(this.getFirstTrackOrFail())},v}(),lA=function(){function v(l){this.mediaStream=l}return v.prototype.render=function(l,d,u){return H1(this,void 0,void 0,function(){return F1(this,function(M){return[2,dA.create(l,this.mediaStream,d,u)]})})},v.create=function(l){return H1(this,void 0,void 0,function(){var d,u;return F1(this,function(M){switch(M.label){case 0:if(!navigator.mediaDevices)throw"navigator.mediaDevices not supported";return d={audio:!1,video:l},[4,navigator.mediaDevices.getUserMedia(d)];case 1:return u=M.sent(),[2,new v(u)]}})})},v}(),Yn=function(v,l,d,u){function M(g){return g instanceof d?g:new d(function(C){C(g)})}return new(d||(d=Promise))(function(g,C){function b(_){try{w(u.next(_))}catch(D){C(D)}}function N(_){try{w(u.throw(_))}catch(D){C(D)}}function w(_){_.done?g(_.value):M(_.value).then(b,N)}w((u=u.apply(v,l||[])).next())})},jn=function(v,l){var d={label:0,sent:function(){if(g[0]&1)throw g[1];return g[1]},trys:[],ops:[]},u,M,g,C;return C={next:b(0),throw:b(1),return:b(2)},typeof Symbol=="function"&&(C[Symbol.iterator]=function(){return this}),C;function b(w){return function(_){return N([w,_])}}function N(w){if(u)throw new TypeError("Generator is already executing.");for(;C&&(C=0,w[0]&&(d=0)),d;)try{if(u=1,M&&(g=w[0]&2?M.return:w[0]?M.throw||((g=M.return)&&g.call(M),0):M.next)&&!(g=g.call(M,w[1])).done)return g;switch(M=0,g&&(w=[w[0]&2,g.value]),w[0]){case 0:case 1:g=w;break;case 4:return d.label++,{value:w[1],done:!1};case 5:d.label++,M=w[1],w=[0];continue;case 7:w=d.ops.pop(),d.trys.pop();continue;default:if(g=d.trys,!(g=g.length>0&&g[g.length-1])&&(w[0]===6||w[0]===2)){d=0;continue}if(w[0]===3&&(!g||w[1]>g[0]&&w[1]<g[3])){d.label=w[1];break}if(w[0]===6&&d.label<g[1]){d.label=g[1],g=w;break}if(g&&d.label<g[2]){d.label=g[2],d.ops.push(w);break}g[2]&&d.ops.pop(),d.trys.pop();continue}w=l.call(v,d)}catch(_){w=[6,_],M=0}finally{u=g=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}},pA=function(){function v(){}return v.failIfNotSupported=function(){return Yn(this,void 0,void 0,function(){return jn(this,function(l){if(!navigator.mediaDevices)throw"navigator.mediaDevices not supported";return[2,new v]})})},v.prototype.create=function(l){return Yn(this,void 0,void 0,function(){return jn(this,function(d){return[2,lA.create(l)]})})},v}(),uA=function(v,l,d,u){function M(g){return g instanceof d?g:new d(function(C){C(g)})}return new(d||(d=Promise))(function(g,C){function b(_){try{w(u.next(_))}catch(D){C(D)}}function N(_){try{w(u.throw(_))}catch(D){C(D)}}function w(_){_.done?g(_.value):M(_.value).then(b,N)}w((u=u.apply(v,l||[])).next())})},gA=function(v,l){var d={label:0,sent:function(){if(g[0]&1)throw g[1];return g[1]},trys:[],ops:[]},u,M,g,C;return C={next:b(0),throw:b(1),return:b(2)},typeof Symbol=="function"&&(C[Symbol.iterator]=function(){return this}),C;function b(w){return function(_){return N([w,_])}}function N(w){if(u)throw new TypeError("Generator is already executing.");for(;C&&(C=0,w[0]&&(d=0)),d;)try{if(u=1,M&&(g=w[0]&2?M.return:w[0]?M.throw||((g=M.return)&&g.call(M),0):M.next)&&!(g=g.call(M,w[1])).done)return g;switch(M=0,g&&(w=[w[0]&2,g.value]),w[0]){case 0:case 1:g=w;break;case 4:return d.label++,{value:w[1],done:!1};case 5:d.label++,M=w[1],w=[0];continue;case 7:w=d.ops.pop(),d.trys.pop();continue;default:if(g=d.trys,!(g=g.length>0&&g[g.length-1])&&(w[0]===6||w[0]===2)){d=0;continue}if(w[0]===3&&(!g||w[1]>g[0]&&w[1]<g[3])){d.label=w[1];break}if(w[0]===6&&d.label<g[1]){d.label=g[1],g=w;break}if(g&&d.label<g[2]){d.label=g[2],d.ops.push(w);break}g[2]&&d.ops.pop(),d.trys.pop();continue}w=l.call(v,d)}catch(_){w=[6,_],M=0}finally{u=g=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}},fA=function(){function v(){}return v.retrieve=function(){if(navigator.mediaDevices)return v.getCamerasFromMediaDevices();var l=MediaStreamTrack;return MediaStreamTrack&&l.getSources?v.getCamerasFromMediaStreamTrack():v.rejectWithError()},v.rejectWithError=function(){var l=r1.unableToQuerySupportedDevices();return v.isHttpsOrLocalhost()||(l=r1.insecureContextCameraQueryError()),Promise.reject(l)},v.isHttpsOrLocalhost=function(){if(location.protocol==="https:")return!0;var l=location.host.split(":")[0];return l==="127.0.0.1"||l==="localhost"},v.getCamerasFromMediaDevices=function(){return uA(this,void 0,void 0,function(){var l,d,u,M,g,C,b;return gA(this,function(N){switch(N.label){case 0:return l=function(w){for(var _=w.getVideoTracks(),D=0,j=_;D<j.length;D++){var z=j[D];z.enabled=!1,z.stop(),w.removeTrack(z)}},[4,navigator.mediaDevices.getUserMedia({audio:!1,video:!0})];case 1:return d=N.sent(),[4,navigator.mediaDevices.enumerateDevices()];case 2:for(u=N.sent(),M=[],g=0,C=u;g<C.length;g++)b=C[g],b.kind==="videoinput"&&M.push({id:b.deviceId,label:b.label});return l(d),[2,M]}})})},v.getCamerasFromMediaStreamTrack=function(){return new Promise(function(l,d){var u=function(g){for(var C=[],b=0,N=g;b<N.length;b++){var w=N[b];w.kind==="video"&&C.push({id:w.id,label:w.label})}l(C)},M=MediaStreamTrack;M.getSources(u)})},v}(),Bt;(function(v){v[v.UNKNOWN=0]="UNKNOWN",v[v.NOT_STARTED=1]="NOT_STARTED",v[v.SCANNING=2]="SCANNING",v[v.PAUSED=3]="PAUSED"})(Bt||(Bt={}));var xA=function(){function v(){this.state=Bt.NOT_STARTED,this.onGoingTransactionNewState=Bt.UNKNOWN}return v.prototype.directTransition=function(l){this.failIfTransitionOngoing(),this.validateTransition(l),this.state=l},v.prototype.startTransition=function(l){return this.failIfTransitionOngoing(),this.validateTransition(l),this.onGoingTransactionNewState=l,this},v.prototype.execute=function(){if(this.onGoingTransactionNewState===Bt.UNKNOWN)throw"Transaction is already cancelled, cannot execute().";var l=this.onGoingTransactionNewState;this.onGoingTransactionNewState=Bt.UNKNOWN,this.directTransition(l)},v.prototype.cancel=function(){if(this.onGoingTransactionNewState===Bt.UNKNOWN)throw"Transaction is already cancelled, cannot cancel().";this.onGoingTransactionNewState=Bt.UNKNOWN},v.prototype.getState=function(){return this.state},v.prototype.failIfTransitionOngoing=function(){if(this.onGoingTransactionNewState!==Bt.UNKNOWN)throw"Cannot transition to a new state, already under transition"},v.prototype.validateTransition=function(l){switch(this.state){case Bt.UNKNOWN:throw"Transition from unknown is not allowed";case Bt.NOT_STARTED:this.failIfNewStateIs(l,[Bt.PAUSED]);break;case Bt.SCANNING:break;case Bt.PAUSED:break}},v.prototype.failIfNewStateIs=function(l,d){for(var u=0,M=d;u<M.length;u++){var g=M[u];if(l===g)throw"Cannot transition from ".concat(this.state," to ").concat(l)}},v}(),MA=function(){function v(l){this.stateManager=l}return v.prototype.startTransition=function(l){return this.stateManager.startTransition(l)},v.prototype.directTransition=function(l){this.stateManager.directTransition(l)},v.prototype.getState=function(){return this.stateManager.getState()},v.prototype.canScanFile=function(){return this.stateManager.getState()===Bt.NOT_STARTED},v.prototype.isScanning=function(){return this.stateManager.getState()!==Bt.NOT_STARTED},v.prototype.isStrictlyScanning=function(){return this.stateManager.getState()===Bt.SCANNING},v.prototype.isPaused=function(){return this.stateManager.getState()===Bt.PAUSED},v}(),vA=function(){function v(){}return v.create=function(){return new MA(new xA)},v}(),yA=function(){var v=function(l,d){return v=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(u,M){u.__proto__=M}||function(u,M){for(var g in M)Object.prototype.hasOwnProperty.call(M,g)&&(u[g]=M[g])},v(l,d)};return function(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Class extends value "+String(d)+" is not a constructor or null");v(l,d);function u(){this.constructor=l}l.prototype=d===null?Object.create(d):(u.prototype=d.prototype,new u)}}(),de=function(v){yA(l,v);function l(){return v!==null&&v.apply(this,arguments)||this}return l.DEFAULT_WIDTH=300,l.DEFAULT_WIDTH_OFFSET=2,l.FILE_SCAN_MIN_HEIGHT=300,l.FILE_SCAN_HIDDEN_CANVAS_PADDING=100,l.MIN_QR_BOX_SIZE=50,l.SHADED_LEFT=1,l.SHADED_RIGHT=2,l.SHADED_TOP=3,l.SHADED_BOTTOM=4,l.SHADED_REGION_ELEMENT_ID="qr-shaded-region",l.VERBOSE=!1,l.BORDER_SHADER_DEFAULT_COLOR="#ffffff",l.BORDER_SHADER_MATCH_COLOR="rgb(90, 193, 56)",l}(Qw),mA=function(){function v(l,d){this.logger=d,this.fps=de.SCAN_DEFAULT_FPS,l?(l.fps&&(this.fps=l.fps),this.disableFlip=l.disableFlip===!0,this.qrbox=l.qrbox,this.aspectRatio=l.aspectRatio,this.videoConstraints=l.videoConstraints):this.disableFlip=de.DEFAULT_DISABLE_FLIP}return v.prototype.isMediaStreamConstraintsValid=function(){return this.videoConstraints?$n.isMediaStreamConstraintsValid(this.videoConstraints,this.logger):(this.logger.logError("Empty videoConstraints",!0),!1)},v.prototype.isShadedBoxEnabled=function(){return!Se(this.qrbox)},v.create=function(l,d){return new v(l,d)},v}(),wA=function(){function v(l,d){if(this.element=null,this.canvasElement=null,this.scannerPausedUiElement=null,this.hasBorderShaders=null,this.borderShaders=null,this.qrMatch=null,this.renderedCamera=null,this.qrRegion=null,this.context=null,this.lastScanImageFile=null,this.isScanning=!1,!document.getElementById(l))throw"HTML Element with id=".concat(l," not found");this.elementId=l,this.verbose=!1;var u;typeof d=="boolean"?this.verbose=d===!0:d&&(u=d,this.verbose=u.verbose===!0,u.experimentalFeatures),this.logger=new $w(this.verbose),this.qrcode=new iA(this.getSupportedFormats(d),this.getUseBarCodeDetectorIfSupported(u),this.verbose,this.logger),this.foreverScanTimeout,this.shouldScan=!0,this.stateManagerProxy=vA.create()}return v.prototype.start=function(l,d,u,M){var g=this;if(!l)throw"cameraIdOrConfig is required";if(!u||typeof u!="function")throw"qrCodeSuccessCallback is required and should be a function.";var C;M?C=M:C=this.verbose?this.logger.log:function(){};var b=mA.create(d,this.logger);this.clearElement();var N=!1;b.videoConstraints&&(b.isMediaStreamConstraintsValid()?N=!0:this.logger.logError("'videoConstraints' is not valid 'MediaStreamConstraints, it will be ignored.'",!0));var w=N,_=document.getElementById(this.elementId);_.clientWidth?_.clientWidth:de.DEFAULT_WIDTH,_.style.position="relative",this.shouldScan=!0,this.element=_;var D=this,j=this.stateManagerProxy.startTransition(Bt.SCANNING);return new Promise(function(z,pt){var q=w?b.videoConstraints:D.createVideoConstraints(l);if(!q){j.cancel(),pt("videoConstraints should be defined");return}var ct={};(!w||b.aspectRatio)&&(ct.aspectRatio=b.aspectRatio);var Tt={onRenderSurfaceReady:function(st,Y){D.setupUi(st,Y,b),D.isScanning=!0,D.foreverScan(b,u,C)}};pA.failIfNotSupported().then(function(st){st.create(q).then(function(Y){return Y.render(g.element,ct,Tt).then(function(et){D.renderedCamera=et,j.execute(),z(null)}).catch(function(et){j.cancel(),pt(et)})}).catch(function(Y){j.cancel(),pt(r1.errorGettingUserMedia(Y))})}).catch(function(st){j.cancel(),pt(r1.cameraStreamingNotSupported())})})},v.prototype.pause=function(l){if(!this.stateManagerProxy.isStrictlyScanning())throw"Cannot pause, scanner is not scanning.";this.stateManagerProxy.directTransition(Bt.PAUSED),this.showPausedState(),(Se(l)||l!==!0)&&(l=!1),l&&this.renderedCamera&&this.renderedCamera.pause()},v.prototype.resume=function(){if(!this.stateManagerProxy.isPaused())throw"Cannot result, scanner is not paused.";if(!this.renderedCamera)throw"renderedCamera doesn't exist while trying resume()";var l=this,d=function(){l.stateManagerProxy.directTransition(Bt.SCANNING),l.hidePausedState()};if(!this.renderedCamera.isPaused()){d();return}this.renderedCamera.resume(function(){d()})},v.prototype.getState=function(){return this.stateManagerProxy.getState()},v.prototype.stop=function(){var l=this;if(!this.stateManagerProxy.isScanning())throw"Cannot stop, scanner is not running or paused.";var d=this.stateManagerProxy.startTransition(Bt.NOT_STARTED);this.shouldScan=!1,this.foreverScanTimeout&&clearTimeout(this.foreverScanTimeout);var u=function(){if(l.element){var g=document.getElementById(de.SHADED_REGION_ELEMENT_ID);g&&l.element.removeChild(g)}},M=this;return this.renderedCamera.close().then(function(){return M.renderedCamera=null,M.element&&(M.element.removeChild(M.canvasElement),M.canvasElement=null),u(),M.qrRegion&&(M.qrRegion=null),M.context&&(M.context=null),d.execute(),M.hidePausedState(),M.isScanning=!1,Promise.resolve()})},v.prototype.scanFile=function(l,d){return this.scanFileV2(l,d).then(function(u){return u.decodedText})},v.prototype.scanFileV2=function(l,d){var u=this;if(!l||!(l instanceof File))throw"imageFile argument is mandatory and should be instance of File. Use 'event.target.files[0]'.";if(Se(d)&&(d=!0),!this.stateManagerProxy.canScanFile())throw"Cannot start file scan - ongoing camera scan";return new Promise(function(M,g){u.possiblyCloseLastScanImageFile(),u.clearElement(),u.lastScanImageFile=URL.createObjectURL(l);var C=new Image;C.onload=function(){var b=C.width,N=C.height,w=document.getElementById(u.elementId),_=w.clientWidth?w.clientWidth:de.DEFAULT_WIDTH,D=Math.max(w.clientHeight?w.clientHeight:N,de.FILE_SCAN_MIN_HEIGHT),j=u.computeCanvasDrawConfig(b,N,_,D);if(d){var z=u.createCanvasElement(_,D,"qr-canvas-visible");z.style.display="inline-block",w.appendChild(z);var pt=z.getContext("2d");if(!pt)throw"Unable to get 2d context from canvas";pt.canvas.width=_,pt.canvas.height=D,pt.drawImage(C,0,0,b,N,j.x,j.y,j.width,j.height)}var q=de.FILE_SCAN_HIDDEN_CANVAS_PADDING,ct=Math.max(C.width,j.width),Tt=Math.max(C.height,j.height),st=ct+2*q,Y=Tt+2*q,et=u.createCanvasElement(st,Y);w.appendChild(et);var le=et.getContext("2d");if(!le)throw"Unable to get 2d context from canvas";le.canvas.width=st,le.canvas.height=Y,le.drawImage(C,0,0,b,N,q,q,ct,Tt);try{u.qrcode.decodeRobustlyAsync(et).then(function(ut){M(Gn.createFromQrcodeResult(ut))}).catch(g)}catch(ut){g("QR code parse error, error = ".concat(ut))}},C.onerror=g,C.onabort=g,C.onstalled=g,C.onsuspend=g,C.src=URL.createObjectURL(l)})},v.prototype.clear=function(){this.clearElement()},v.getCameras=function(){return fA.retrieve()},v.prototype.getRunningTrackCapabilities=function(){return this.getRenderedCameraOrFail().getRunningTrackCapabilities()},v.prototype.getRunningTrackSettings=function(){return this.getRenderedCameraOrFail().getRunningTrackSettings()},v.prototype.getRunningTrackCameraCapabilities=function(){return this.getRenderedCameraOrFail().getCapabilities()},v.prototype.applyVideoConstraints=function(l){if(l){if(!$n.isMediaStreamConstraintsValid(l,this.logger))throw"invalid videoConstaints passed, check logs for more details"}else throw"videoConstaints is required argument.";return this.getRenderedCameraOrFail().applyVideoConstraints(l)},v.prototype.getRenderedCameraOrFail=function(){if(this.renderedCamera==null)throw"Scanning is not in running state, call this API only when QR code scanning using camera is in running state.";return this.renderedCamera},v.prototype.getSupportedFormats=function(l){var d=[G.QR_CODE,G.AZTEC,G.CODABAR,G.CODE_39,G.CODE_93,G.CODE_128,G.DATA_MATRIX,G.MAXICODE,G.ITF,G.EAN_13,G.EAN_8,G.PDF_417,G.RSS_14,G.RSS_EXPANDED,G.UPC_A,G.UPC_E,G.UPC_EAN_EXTENSION];if(!l||typeof l=="boolean"||!l.formatsToSupport)return d;if(!Array.isArray(l.formatsToSupport))throw"configOrVerbosityFlag.formatsToSupport should be undefined or an array.";if(l.formatsToSupport.length===0)throw"Atleast 1 formatsToSupport is needed.";for(var u=[],M=0,g=l.formatsToSupport;M<g.length;M++){var C=g[M];Kw(C)?u.push(C):this.logger.warn("Invalid format: ".concat(C," passed in config, ignoring."))}if(u.length===0)throw"None of formatsToSupport match supported values.";return u},v.prototype.getUseBarCodeDetectorIfSupported=function(l){if(Se(l))return!0;if(!Se(l.useBarCodeDetectorIfSupported))return l.useBarCodeDetectorIfSupported!==!1;if(Se(l.experimentalFeatures))return!0;var d=l.experimentalFeatures;return Se(d.useBarCodeDetectorIfSupported)?!0:d.useBarCodeDetectorIfSupported!==!1},v.prototype.validateQrboxSize=function(l,d,u){var M=this,g=u.qrbox;this.validateQrboxConfig(g);var C=this.toQrdimensions(l,d,g),b=function(w){if(w<de.MIN_QR_BOX_SIZE)throw"minimum size of 'config.qrbox' dimension value is"+" ".concat(de.MIN_QR_BOX_SIZE,"px.")},N=function(w){return w>l&&(M.logger.warn("`qrbox.width` or `qrbox` is larger than the width of the root element. The width will be truncated to the width of root element."),w=l),w};b(C.width),b(C.height),C.width=N(C.width)},v.prototype.validateQrboxConfig=function(l){if(typeof l!="number"&&typeof l!="function"&&(l.width===void 0||l.height===void 0))throw"Invalid instance of QrDimensions passed for 'config.qrbox'. Both 'width' and 'height' should be set."},v.prototype.toQrdimensions=function(l,d,u){if(typeof u=="number")return{width:u,height:u};if(typeof u=="function")try{return u(l,d)}catch(M){throw new Error("qrbox config was passed as a function but it failed with unknown error"+M)}return u},v.prototype.setupUi=function(l,d,u){u.isShadedBoxEnabled()&&this.validateQrboxSize(l,d,u);var M=Se(u.qrbox)?{width:l,height:d}:u.qrbox;this.validateQrboxConfig(M);var g=this.toQrdimensions(l,d,M);g.height>d&&this.logger.warn("[Html5Qrcode] config.qrbox has height that isgreater than the height of the video stream. Shading will be ignored");var C=u.isShadedBoxEnabled()&&g.height<=d,b={x:0,y:0,width:l,height:d},N=C?this.getShadedRegionBounds(l,d,g):b,w=this.createCanvasElement(N.width,N.height),_={willReadFrequently:!0},D=w.getContext("2d",_);D.canvas.width=N.width,D.canvas.height=N.height,this.element.append(w),C&&this.possiblyInsertShadingElement(this.element,l,d,g),this.createScannerPausedUiElement(this.element),this.qrRegion=N,this.context=D,this.canvasElement=w},v.prototype.createScannerPausedUiElement=function(l){var d=document.createElement("div");d.innerText=r1.scannerPaused(),d.style.display="none",d.style.position="absolute",d.style.top="0px",d.style.zIndex="1",d.style.background="rgba(9, 9, 9, 0.46)",d.style.color="#FFECEC",d.style.textAlign="center",d.style.width="100%",l.appendChild(d),this.scannerPausedUiElement=d},v.prototype.scanContext=function(l,d){var u=this;return this.stateManagerProxy.isPaused()?Promise.resolve(!1):this.qrcode.decodeAsync(this.canvasElement).then(function(M){return l(M.text,Gn.createFromQrcodeResult(M)),u.possiblyUpdateShaders(!0),!0}).catch(function(M){u.possiblyUpdateShaders(!1);var g=r1.codeParseError(M);return d(g,Jw.createFrom(g)),!1})},v.prototype.foreverScan=function(l,d,u){var M=this;if(this.shouldScan&&this.renderedCamera){var g=this.renderedCamera.getSurface(),C=g.videoWidth/g.clientWidth,b=g.videoHeight/g.clientHeight;if(!this.qrRegion)throw"qrRegion undefined when localMediaStream is ready.";var N=this.qrRegion.width*C,w=this.qrRegion.height*b,_=this.qrRegion.x*C,D=this.qrRegion.y*b;this.context.drawImage(g,_,D,N,w,0,0,this.qrRegion.width,this.qrRegion.height);var j=function(){M.foreverScanTimeout=setTimeout(function(){M.foreverScan(l,d,u)},M.getTimeoutFps(l.fps))};this.scanContext(d,u).then(function(z){!z&&l.disableFlip!==!0?(M.context.translate(M.context.canvas.width,0),M.context.scale(-1,1),M.scanContext(d,u).finally(function(){j()})):j()}).catch(function(z){M.logger.logError("Error happend while scanning context",z),j()})}},v.prototype.createVideoConstraints=function(l){if(typeof l=="string")return{deviceId:{exact:l}};if(typeof l=="object"){var d="facingMode",u="deviceId",M={user:!0,environment:!0},g="exact",C=function(pt){if(pt in M)return!0;throw"config has invalid 'facingMode' value = "+"'".concat(pt,"'")},b=Object.keys(l);if(b.length!==1)throw"'cameraIdOrConfig' object should have exactly 1 key,"+" if passed as an object, found ".concat(b.length," keys");var N=Object.keys(l)[0];if(N!==d&&N!==u)throw"Only '".concat(d,"' and '").concat(u,"' ")+" are supported for 'cameraIdOrConfig'";if(N===d){var w=l.facingMode;if(typeof w=="string"){if(C(w))return{facingMode:w}}else if(typeof w=="object")if(g in w){if(C(w["".concat(g)]))return{facingMode:{exact:w["".concat(g)]}}}else throw"'facingMode' should be string or object with"+" ".concat(g," as key.");else{var _=typeof w;throw"Invalid type of 'facingMode' = ".concat(_)}}else{var D=l.deviceId;if(typeof D=="string")return{deviceId:D};if(typeof D=="object"){if(g in D)return{deviceId:{exact:D["".concat(g)]}};throw"'deviceId' should be string or object with"+" ".concat(g," as key.")}else{var j=typeof D;throw"Invalid type of 'deviceId' = ".concat(j)}}}var z=typeof l;throw"Invalid type of 'cameraIdOrConfig' = ".concat(z)},v.prototype.computeCanvasDrawConfig=function(l,d,u,M){if(l<=u&&d<=M){var g=(u-l)/2,C=(M-d)/2;return{x:g,y:C,width:l,height:d}}else{var b=l,N=d;return l>u&&(d=u/l*d,l=u),d>M&&(l=M/d*l,d=M),this.logger.log("Image downsampled from "+"".concat(b,"X").concat(N)+" to ".concat(l,"X").concat(d,".")),this.computeCanvasDrawConfig(l,d,u,M)}},v.prototype.clearElement=function(){if(this.stateManagerProxy.isScanning())throw"Cannot clear while scan is ongoing, close it first.";var l=document.getElementById(this.elementId);l&&(l.innerHTML="")},v.prototype.possiblyUpdateShaders=function(l){this.qrMatch!==l&&(this.hasBorderShaders&&this.borderShaders&&this.borderShaders.length&&this.borderShaders.forEach(function(d){d.style.backgroundColor=l?de.BORDER_SHADER_MATCH_COLOR:de.BORDER_SHADER_DEFAULT_COLOR}),this.qrMatch=l)},v.prototype.possiblyCloseLastScanImageFile=function(){this.lastScanImageFile&&(URL.revokeObjectURL(this.lastScanImageFile),this.lastScanImageFile=null)},v.prototype.createCanvasElement=function(l,d,u){var M=l,g=d,C=document.createElement("canvas");return C.style.width="".concat(M,"px"),C.style.height="".concat(g,"px"),C.style.display="none",C.id=Se(u)?"qr-canvas":u,C},v.prototype.getShadedRegionBounds=function(l,d,u){if(u.width>l||u.height>d)throw"'config.qrbox' dimensions should not be greater than the dimensions of the root HTML element.";return{x:(l-u.width)/2,y:(d-u.height)/2,width:u.width,height:u.height}},v.prototype.possiblyInsertShadingElement=function(l,d,u,M){if(!(d-M.width<1||u-M.height<1)){var g=document.createElement("div");g.style.position="absolute";var C=(d-M.width)/2,b=(u-M.height)/2;if(g.style.borderLeft="".concat(C,"px solid rgba(0, 0, 0, 0.48)"),g.style.borderRight="".concat(C,"px solid rgba(0, 0, 0, 0.48)"),g.style.borderTop="".concat(b,"px solid rgba(0, 0, 0, 0.48)"),g.style.borderBottom="".concat(b,"px solid rgba(0, 0, 0, 0.48)"),g.style.boxSizing="border-box",g.style.top="0px",g.style.bottom="0px",g.style.left="0px",g.style.right="0px",g.id="".concat(de.SHADED_REGION_ELEMENT_ID),d-M.width<11||u-M.height<11)this.hasBorderShaders=!1;else{var N=5,w=40;this.insertShaderBorders(g,w,N,-N,null,0,!0),this.insertShaderBorders(g,w,N,-N,null,0,!1),this.insertShaderBorders(g,w,N,null,-N,0,!0),this.insertShaderBorders(g,w,N,null,-N,0,!1),this.insertShaderBorders(g,N,w+N,-N,null,-N,!0),this.insertShaderBorders(g,N,w+N,null,-N,-N,!0),this.insertShaderBorders(g,N,w+N,-N,null,-N,!1),this.insertShaderBorders(g,N,w+N,null,-N,-N,!1),this.hasBorderShaders=!0}l.append(g)}},v.prototype.insertShaderBorders=function(l,d,u,M,g,C,b){var N=document.createElement("div");N.style.position="absolute",N.style.backgroundColor=de.BORDER_SHADER_DEFAULT_COLOR,N.style.width="".concat(d,"px"),N.style.height="".concat(u,"px"),M!==null&&(N.style.top="".concat(M,"px")),g!==null&&(N.style.bottom="".concat(g,"px")),b?N.style.left="".concat(C,"px"):N.style.right="".concat(C,"px"),this.borderShaders||(this.borderShaders=[]),this.borderShaders.push(N),l.appendChild(N)},v.prototype.showPausedState=function(){if(!this.scannerPausedUiElement)throw"[internal error] scanner paused UI element not found";this.scannerPausedUiElement.style.display="block"},v.prototype.hidePausedState=function(){if(!this.scannerPausedUiElement)throw"[internal error] scanner paused UI element not found";this.scannerPausedUiElement.style.display="none"},v.prototype.getTimeoutFps=function(l){return 1e3/l},v}(),Kn;(function(v){v[v.STATUS_DEFAULT=0]="STATUS_DEFAULT",v[v.STATUS_SUCCESS=1]="STATUS_SUCCESS",v[v.STATUS_WARNING=2]="STATUS_WARNING",v[v.STATUS_REQUESTING_PERMISSION=3]="STATUS_REQUESTING_PERMISSION"})(Kn||(Kn={}));class AA{constructor(l){He(this,"html5QrCode",null);He(this,"isScanning",!1);this.elementId=l,console.log("[Scanner] Initialized with element:",l)}async startScanning(l){if(this.isScanning){console.log("[Scanner] Already scanning");return}try{console.log("[Scanner] Starting camera..."),this.html5QrCode=new wA(this.elementId);const d={fps:10,qrbox:{width:250,height:150},formatsToSupport:[13]};await this.html5QrCode.start({facingMode:"environment"},d,(u,M)=>{console.log("[Scanner] Barcode detected:",u),console.log("[Scanner] Format:",M.result.format),u.length===13&&/^\d+$/.test(u)?(console.log("[Scanner] Valid EAN-13 detected"),l(u)):console.log("[Scanner] Invalid barcode format, ignoring")},u=>{}),this.isScanning=!0,console.log("[Scanner] Camera started successfully")}catch(d){throw console.error("[Scanner] Error starting camera:",d),new Error("Failed to start camera. Please check permissions.")}}async stopScanning(){if(!(!this.html5QrCode||!this.isScanning))try{console.log("[Scanner] Stopping camera..."),await this.html5QrCode.stop(),this.html5QrCode.clear(),this.isScanning=!1,console.log("[Scanner] Camera stopped")}catch(l){console.error("[Scanner] Error stopping camera:",l)}}isCurrentlyScanning(){return this.isScanning}}const er=new Map([]);function CA(v){console.log("[Product Lookup] Searching for barcode:",v);const l=er.get(v);return l?(console.log("[Product Lookup] Found:",l),l):(console.log("[Product Lookup] Not found in database"),null)}function EA(v){console.log("[Product Database] Adding product:",v),er.set(v.barcode,v)}function IA(v,l,d,u,M){EA({barcode:v,name:l,calories:d,protein:u,cost:M}),console.log("[DEBUG] Product added to database")}const bA="https://world.openfoodfacts.org/api/v2";async function SA(v){console.log("[OpenFoodFacts] Looking up barcode:",v);try{const l=await fetch(`${bA}/product/${v}.json`);if(!l.ok)return console.log("[OpenFoodFacts] API request failed:",l.status),null;const d=await l.json();if(d.status===0)return console.log("[OpenFoodFacts] Product not found in database"),null;const u=d.product;console.log("[OpenFoodFacts] Raw product data:",u);const M=u.nutriments||{},g=M["energy-kcal_100g"]||M["energy-kcal"]||Math.round((M.energy_100g||0)/4.184)||0,C=M.proteins_100g||M.proteins||0,b=u.product_name||u.product_name_en||"Unknown Product",N=u.brands||void 0,w=u.image_url||u.image_front_url||void 0,_={barcode:v,name:N?`${N} - ${b}`:b,calories:Math.round(g),protein:Math.round(C*10)/10,brand:N,imageUrl:w};return console.log("[OpenFoodFacts] Parsed product:",_),_}catch(l){return console.error("[OpenFoodFacts] API error:",l),null}}class TA{constructor(){He(this,"currentDate",n1());He(this,"scanner",null);He(this,"per100gCalories",0);He(this,"per100gProtein",0)}async init(){try{await Rt.init(),this.setupEventListeners(),this.setCurrentDate(n1()),await this.refreshAll(),this.initIcons()}catch(l){console.error("Failed to initialize app:",l),this.showNotification("Failed to initialize app","error")}}initIcons(){jw({icons:Yw})}setupEventListeners(){var b,N,w,_,D,j,z,pt,q;const l=document.getElementById("food-form");l==null||l.addEventListener("submit",ct=>this.handleFoodSubmit(ct));const d=document.getElementById("weight-form");d==null||d.addEventListener("submit",ct=>this.handleWeightSubmit(ct));const u=document.getElementById("goal-form");u==null||u.addEventListener("submit",ct=>this.handleGoalSubmit(ct));const M=document.getElementById("calorie-goal-form");M==null||M.addEventListener("submit",ct=>this.handleCalorieGoalSubmit(ct)),(b=document.getElementById("prev-day"))==null||b.addEventListener("click",()=>this.navigateDay(-1)),(N=document.getElementById("next-day"))==null||N.addEventListener("click",()=>this.navigateDay(1)),(w=document.getElementById("today-btn"))==null||w.addEventListener("click",()=>this.setCurrentDate(n1()));const g=document.getElementById("date-picker");g==null||g.addEventListener("change",ct=>{const Tt=ct.target;this.setCurrentDate(Tt.value)}),document.querySelectorAll("[data-tab]").forEach(ct=>{ct.addEventListener("click",Tt=>{const st=Tt.currentTarget;this.switchTab(st.dataset.tab)})}),(_=document.getElementById("toggle-calorie-goal-form"))==null||_.addEventListener("click",()=>{this.toggleCalorieGoalForm()}),(D=document.getElementById("cancel-calorie-goal-form"))==null||D.addEventListener("click",()=>{this.cancelCalorieGoalForm()});const C=document.getElementById("calorie-goal-type");C==null||C.addEventListener("change",()=>this.handleCalorieGoalTypeChange()),(j=document.getElementById("scan-barcode-btn"))==null||j.addEventListener("click",()=>this.openScannerModal()),(z=document.getElementById("close-scanner-btn"))==null||z.addEventListener("click",()=>this.closeScannerModal()),(pt=document.getElementById("manual-barcode-submit"))==null||pt.addEventListener("click",()=>this.handleManualBarcode()),(q=document.getElementById("calculate-serving-btn"))==null||q.addEventListener("click",()=>this.calculateServingSize())}async handleFoodSubmit(l){l.preventDefault();const d=l.target,u=document.getElementById("food-name"),M=document.getElementById("food-calories"),g=document.getElementById("food-protein"),C=document.getElementById("food-cost"),b=document.getElementById("serving-size-input"),N=u.value.trim(),w=parseInt(M.value,10),_=g.value?parseFloat(g.value):void 0,D=C.value?parseFloat(C.value):void 0,j=b.value?parseFloat(b.value):void 0;if(!N||isNaN(w)||w<=0){this.showNotification("Please enter valid food name and calories","error");return}try{const z={name:N,calories:w,protein:_,cost:D,servingSize:j,date:this.currentDate,timestamp:Date.now()};await Rt.addFoodEntry(z),d.reset(),this.hideServingSizeConverter(),await this.refreshAll(),this.showNotification("Food entry added!","success"),this.initIcons()}catch(z){console.error("Failed to add food entry:",z),this.showNotification("Failed to add entry","error")}}async handleWeightSubmit(l){l.preventDefault();const d=document.getElementById("weight-value"),u=document.getElementById("weight-date"),M=parseFloat(d.value),g=u.value;if(isNaN(M)||M<=0||!g){this.showNotification("Please enter valid weight and date","error");return}try{const C={weight:M,date:g,timestamp:Date.now()};await Rt.addOrUpdateWeightEntry(C),await this.refreshWeightHistory(),this.showNotification("Weight recorded!","success"),this.initIcons()}catch(C){console.error("Failed to add weight entry:",C),this.showNotification("Failed to record weight","error")}}navigateDay(l){const d=Fe(this.currentDate);d.setDate(d.getDate()+l),this.setCurrentDate(B1(d))}setCurrentDate(l){this.currentDate=l;const d=document.getElementById("date-picker");d&&(d.value=l);const u=document.getElementById("current-date-display");u&&(u.textContent=y1(l));const M=document.getElementById("today-btn");M&&(l===n1()?(M.classList.add("bg-primary-500","text-white"),M.classList.remove("bg-gray-200","text-gray-700")):(M.classList.remove("bg-primary-500","text-white"),M.classList.add("bg-gray-200","text-gray-700"))),this.refreshAll()}async refreshAll(){await Promise.all([this.refreshDailyEntries(),this.refreshDailySummary(),this.refreshWeeklyAverage(),this.refreshMonthlyAverage(),this.refreshWeightHistory(),this.refreshGoalProgress(),this.refreshCalorieGoals(),this.refreshActiveCalorieGoal()]),this.initIcons()}async refreshDailyEntries(){try{const l=await Rt.getFoodEntriesByDate(this.currentDate),d=document.getElementById("daily-entries");if(!d)return;l.length===0?d.innerHTML=`
          <div class="text-center text-gray-500 py-8">
            <i data-lucide="utensils" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
            <p>No food entries for this day</p>
            <p class="text-sm mt-1">Add your first meal above!</p>
          </div>
        `:d.innerHTML=l.map(u=>`
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors" data-entry-id="${u.id}">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <i data-lucide="apple" class="w-5 h-5 text-primary-600"></i>
              </div>
              <div>
                <p class="font-medium text-gray-900">${this.escapeHtml(u.name)}</p>
                <p class="text-sm text-gray-500">
                  ${u.cost?_1(u.cost):"No cost recorded"}
                  ${u.protein?` • ${u.protein}g protein`:""}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-semibold text-primary-600">${u.calories} cal</span>
              <button 
                onclick="window.app.deleteFood(${u.id})" 
                class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete entry"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `).join("")}catch(l){console.error("Failed to refresh daily entries:",l)}}async refreshDailySummary(){try{const l=await Rt.getFoodEntriesByDate(this.currentDate),d=D2(l,this.currentDate),u=document.getElementById("daily-calories"),M=document.getElementById("daily-protein"),g=document.getElementById("daily-protein-percent"),C=document.getElementById("daily-cost"),b=document.getElementById("daily-count");if(u&&(u.textContent=d.totalCalories.toLocaleString()),M&&(M.textContent=d.totalProtein.toFixed(1)),g){const N=d.totalProtein*4,w=d.totalCalories>0?Math.round(N/d.totalCalories*100):0;g.textContent=`${w}%`}C&&(C.textContent=_1(d.totalCost)),b&&(b.textContent=d.entries.length.toString())}catch(l){console.error("Failed to refresh daily summary:",l)}}async refreshWeeklyAverage(){try{const l=kr(Fe(this.currentDate)),d=await Rt.getFoodEntriesInRange(l.start,l.end),u=Ur(d,l.start,l.end),M=document.getElementById("weekly-avg-calories"),g=document.getElementById("weekly-avg-cost"),C=document.getElementById("weekly-days");M&&(M.textContent=u.avgCalories.toLocaleString()),g&&(g.textContent=_1(u.avgCost)),C&&(C.textContent=`${u.totalDays} days tracked`)}catch(l){console.error("Failed to refresh weekly average:",l)}}async refreshMonthlyAverage(){try{const l=Fe(this.currentDate),d=await Rt.getAllFoodEntries(),u=Zr(d,l.getFullYear(),l.getMonth()),M=document.getElementById("monthly-avg-calories"),g=document.getElementById("monthly-avg-cost"),C=document.getElementById("monthly-period");M&&(M.textContent=u.avgCalories.toLocaleString()),g&&(g.textContent=_1(u.avgCost)),C&&(C.textContent=`${u.month} ${u.year} (${u.totalDays} days)`)}catch(l){console.error("Failed to refresh monthly average:",l)}}async refreshWeightHistory(){try{const l=await Rt.getAllWeightEntries(),d=document.getElementById("weight-history"),u=document.getElementById("latest-weight");if(u&&l.length>0?u.textContent=`${l[0].weight.toFixed(1)} kg`:u&&(u.textContent="-- kg"),!d)return;l.length===0?d.innerHTML=`
          <div class="text-center text-gray-500 py-6">
            <i data-lucide="scale" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
            <p>No weight records yet</p>
          </div>
        `:d.innerHTML=l.slice(0,10).map((M,g)=>{const C=l[g+1];let b="";if(C){const N=M.weight-C.weight;N>0?b=`<span class="text-red-500 text-sm flex items-center gap-1"><i data-lucide="trending-up" class="w-3 h-3"></i>+${N.toFixed(1)}</span>`:N<0?b=`<span class="text-green-500 text-sm flex items-center gap-1"><i data-lucide="trending-down" class="w-3 h-3"></i>${N.toFixed(1)}</span>`:b='<span class="text-gray-400 text-sm">--</span>'}return`
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i data-lucide="scale" class="w-4 h-4 text-blue-600"></i>
                </div>
                <span class="text-sm text-gray-600">${y1(M.date)}</span>
              </div>
              <div class="flex items-center gap-3">
                ${b}
                <span class="font-semibold text-gray-900">${M.weight.toFixed(1)} kg</span>
                <button 
                  onclick="window.app.deleteWeight(${M.id})" 
                  class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          `}).join("")}catch(l){console.error("Failed to refresh weight history:",l)}}switchTab(l){document.querySelectorAll("[data-tab]").forEach(d=>{const u=d;u.dataset.tab===l?(u.classList.add("border-primary-500","text-primary-600"),u.classList.remove("border-transparent","text-gray-500")):(u.classList.remove("border-primary-500","text-primary-600"),u.classList.add("border-transparent","text-gray-500"))}),document.querySelectorAll("[data-panel]").forEach(d=>{const u=d;u.dataset.panel===l?u.classList.remove("hidden"):u.classList.add("hidden")}),this.initIcons()}async deleteFood(l){if(confirm("Delete this food entry?"))try{await Rt.deleteFoodEntry(l),await this.refreshAll(),this.showNotification("Entry deleted","success")}catch(d){console.error("Failed to delete food entry:",d),this.showNotification("Failed to delete entry","error")}}async deleteWeight(l){if(confirm("Delete this weight record?"))try{await Rt.deleteWeightEntry(l),await this.refreshWeightHistory(),this.showNotification("Weight record deleted","success"),this.initIcons()}catch(d){console.error("Failed to delete weight entry:",d),this.showNotification("Failed to delete record","error")}}showNotification(l,d){const u=document.getElementById("notification-container");if(!u)return;const M=document.createElement("div");M.className=`
      fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50
      transform translate-y-0 transition-all duration-300
      ${d==="success"?"bg-green-500 text-white":"bg-red-500 text-white"}
    `,M.innerHTML=`
      <i data-lucide="${d==="success"?"check-circle":"alert-circle"}" class="w-5 h-5"></i>
      <span>${l}</span>
    `,u.appendChild(M),this.initIcons(),setTimeout(()=>{M.classList.add("translate-y-full","opacity-0"),setTimeout(()=>M.remove(),300)},3e3)}escapeHtml(l){const d=document.createElement("div");return d.textContent=l,d.innerHTML}showGoalModal(){const l=document.getElementById("goal-modal");l&&(Rt.getGoalWeight().then(d=>{d&&(document.getElementById("goal-weight").value=d.targetWeight.toString(),document.getElementById("goal-date").value=d.targetDate,document.getElementById("start-weight").value=d.startWeight.toString())}),l.classList.remove("hidden"),this.initIcons())}closeGoalModal(){const l=document.getElementById("goal-modal");l==null||l.classList.add("hidden")}async handleGoalSubmit(l){l.preventDefault();const d=parseFloat(document.getElementById("goal-weight").value),u=document.getElementById("goal-date").value,M=parseFloat(document.getElementById("start-weight").value);if(isNaN(d)||isNaN(M)||!u){this.showNotification("Please fill all fields","error");return}const g=n1();if(u<=g){this.showNotification("Target date must be in the future","error");return}try{const C={targetWeight:d,targetDate:u,startWeight:M,startDate:g,createdAt:Date.now()};await Rt.setGoalWeight(C),this.closeGoalModal(),await this.refreshGoalProgress(),this.showNotification("Goal saved!","success"),this.initIcons()}catch(C){console.error("Failed to save goal:",C),this.showNotification("Failed to save goal","error")}}async deleteGoal(){if(confirm("Delete your weight goal?"))try{await Rt.deleteGoalWeight(),this.closeGoalModal(),await this.refreshGoalProgress(),this.showNotification("Goal deleted","success"),this.initIcons()}catch(l){console.error("Failed to delete goal:",l),this.showNotification("Failed to delete goal","error")}}async refreshGoalProgress(){var l;try{const d=await Rt.getGoalWeight(),u=document.getElementById("goal-content"),M=document.getElementById("goal-subtitle"),g=document.getElementById("weight-chart-container");if(!d){u&&(u.innerHTML=`
            <button 
              onclick="window.app.showGoalModal()"
              class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              Set Your Goal
            </button>
          `),M&&(M.textContent="Set a target"),g&&(g.style.display="none");return}const C=await Rt.getAllWeightEntries(),b=C.length>0?C[0]:null,N=Gr((b==null?void 0:b.weight)||null,d.targetWeight,d.targetDate,d.startWeight,d.startDate,C);if(M&&(M.textContent=`${N.daysRemaining} days remaining`),u){const _={"on-track":{bg:"bg-green-100",text:"text-green-700",icon:"check-circle"},ahead:{bg:"bg-blue-100",text:"text-blue-700",icon:"trending-up"},behind:{bg:"bg-orange-100",text:"text-orange-700",icon:"trending-down"},"insufficient-data":{bg:"bg-gray-100",text:"text-gray-700",icon:"alert-circle"}}[N.status],D=N.status.replace("-"," ").replace(/\b\w/g,j=>j.toUpperCase());u.innerHTML=`
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="text-left">
              <div class="text-xs text-blue-100 mb-1">Current</div>
              <div class="text-2xl font-bold">${((l=N.currentWeight)==null?void 0:l.toFixed(1))||"--"} kg</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-blue-100 mb-1">Target</div>
              <div class="text-2xl font-bold">${d.targetWeight.toFixed(1)} kg</div>
            </div>
          </div>
          
          <div class="w-full bg-white/20 rounded-full h-2 mb-3">
            <div class="bg-white rounded-full h-2 transition-all duration-500" style="width: ${Math.min(100,N.percentComplete)}%"></div>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <span class="text-blue-100">${N.percentComplete.toFixed(0)}% complete</span>
            <span class="px-2 py-1 ${_.bg} ${_.text} rounded-lg flex items-center gap-1 text-xs font-medium">
              <i data-lucide="${_.icon}" class="w-3 h-3"></i>
              ${D}
            </span>
          </div>
        `}g&&C.length>0&&(g.style.display="block",this.renderWeightChart(C,d))}catch(d){console.error("Failed to refresh goal progress:",d)}}renderWeightChart(l,d){const u=document.getElementById("weight-chart");if(!u)return;const M=[...l].sort((q,ct)=>new Date(q.date).getTime()-new Date(ct.date).getTime()),g=Math.max(...M.map(q=>q.weight),d.targetWeight,d.startWeight),C=Math.min(...M.map(q=>q.weight),d.targetWeight,d.startWeight),b=g-C,N=b*.2,w=192,_=u.clientWidth,D=q=>w-(q-(C-N))/(b+N*2)*w,j=(q,ct)=>{const Tt=M.length-1;return Tt>0?ct/Tt*_:_/2};let z=`<svg width="100%" height="${w}" viewBox="0 0 ${_} ${w}" class="overflow-visible">`;const pt=D(d.targetWeight);if(z+=`<line x1="0" y1="${pt}" x2="${_}" y2="${pt}" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>`,M.length>1){let q=`M ${j(M[0].date,0)} ${D(M[0].weight)}`;M.forEach((ct,Tt)=>{Tt>0&&(q+=` L ${j(ct.date,Tt)} ${D(ct.weight)}`)}),z+=`<path d="${q}" fill="none" stroke="#10b981" stroke-width="2"/>`}M.forEach((q,ct)=>{const Tt=j(q.date,ct),st=D(q.weight);z+=`<circle cx="${Tt}" cy="${st}" r="4" fill="#10b981"/>`}),z+="</svg>",u.innerHTML=z}toggleCalorieGoalForm(){const l=document.getElementById("calorie-goal-form-container"),d=document.getElementById("calorie-goal-form");l!=null&&l.classList.contains("hidden")?(l.classList.remove("hidden"),d==null||d.reset(),document.getElementById("calorie-goal-id").value="",document.getElementById("calorie-goal-submit-text").textContent="Set Goal",this.handleCalorieGoalTypeChange()):l==null||l.classList.add("hidden"),this.initIcons()}cancelCalorieGoalForm(){const l=document.getElementById("calorie-goal-form-container");l==null||l.classList.add("hidden")}handleCalorieGoalTypeChange(){const l=document.getElementById("calorie-goal-type").value,d=document.getElementById("date-fields"),u=document.getElementById("start-date-field"),M=document.getElementById("end-date-field");if(l==="permanent")d==null||d.classList.add("hidden");else if(l==="specific-date"){d==null||d.classList.remove("hidden"),u==null||u.classList.remove("hidden"),M==null||M.classList.add("hidden");const g=document.getElementById("calorie-goal-start-date");g.required=!0,document.getElementById("calorie-goal-end-date").required=!1}else l==="date-range"&&(d==null||d.classList.remove("hidden"),u==null||u.classList.remove("hidden"),M==null||M.classList.remove("hidden"),document.getElementById("calorie-goal-start-date").required=!0,document.getElementById("calorie-goal-end-date").required=!0)}async handleCalorieGoalSubmit(l){l.preventDefault();const d=document.getElementById("calorie-goal-id"),u=document.getElementById("calorie-goal-target"),M=document.getElementById("calorie-goal-name"),g=document.getElementById("calorie-goal-type"),C=document.getElementById("calorie-goal-start-date"),b=document.getElementById("calorie-goal-end-date"),N=parseInt(u.value,10),w=M.value.trim()||void 0,_=g.value,D=C.value||void 0,j=b.value||void 0;if(isNaN(N)||N<=0){this.showNotification("Please enter valid target calories","error");return}if(_!=="permanent"&&!D){this.showNotification("Please select a date","error");return}if(_==="date-range"&&(!D||!j)){this.showNotification("Please select both start and end dates","error");return}if(_==="date-range"&&D&&j&&D>j){this.showNotification("End date must be after start date","error");return}try{const z={targetCalories:N,goalType:_,startDate:D,endDate:j,name:w,createdAt:Date.now()},pt=d.value;pt?(await Rt.updateCalorieGoal(parseInt(pt,10),z),this.showNotification("Goal updated!","success")):(await Rt.addCalorieGoal(z),this.showNotification("Goal created!","success")),this.cancelCalorieGoalForm(),await this.refreshCalorieGoals(),await this.refreshActiveCalorieGoal(),this.initIcons()}catch(z){console.error("Failed to save calorie goal:",z),this.showNotification("Failed to save goal","error")}}async editCalorieGoal(l){try{const d=await Rt.getCalorieGoal(l);if(!d)return;const u=document.getElementById("calorie-goal-form-container");u==null||u.classList.remove("hidden"),document.getElementById("calorie-goal-id").value=l.toString(),document.getElementById("calorie-goal-target").value=d.targetCalories.toString(),document.getElementById("calorie-goal-name").value=d.name||"",document.getElementById("calorie-goal-type").value=d.goalType,document.getElementById("calorie-goal-start-date").value=d.startDate||"",document.getElementById("calorie-goal-end-date").value=d.endDate||"",document.getElementById("calorie-goal-submit-text").textContent="Update Goal",this.handleCalorieGoalTypeChange(),this.initIcons()}catch(d){console.error("Failed to load calorie goal:",d),this.showNotification("Failed to load goal","error")}}async deleteCalorieGoal(l){if(confirm("Delete this calorie goal?"))try{await Rt.deleteCalorieGoal(l),await this.refreshCalorieGoals(),await this.refreshActiveCalorieGoal(),this.showNotification("Goal deleted","success")}catch(d){console.error("Failed to delete calorie goal:",d),this.showNotification("Failed to delete goal","error")}}async refreshCalorieGoals(){try{const l=await Rt.getAllCalorieGoals(),d=document.getElementById("calorie-goals-list"),u=document.getElementById("no-calorie-goals");if(!d||!u)return;l.length===0?(d.innerHTML="",u.classList.remove("hidden")):(u.classList.add("hidden"),d.innerHTML=l.map(M=>{const g=zr(M,this.currentDate),C=_2(M),b={permanent:"infinity","date-range":"calendar-range","specific-date":"calendar-days"};return`
            <div class="p-3 bg-gray-50 rounded-lg ${g?"ring-2 ring-orange-200":""}">
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 ${{permanent:"bg-purple-100 text-purple-600","date-range":"bg-blue-100 text-blue-600","specific-date":"bg-green-100 text-green-600"}[M.goalType]} rounded-lg flex items-center justify-center">
                    <i data-lucide="${b[M.goalType]}" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">
                      ${M.name||"Calorie Goal"}
                      ${g?'<span class="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">Active</span>':""}
                    </div>
                    <div class="text-xs text-gray-500">${C}</div>
                  </div>
                </div>
                <div class="flex gap-1">
                  <button 
                    onclick="window.app.editCalorieGoal(${M.id})"
                    class="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Edit"
                  >
                    <i data-lucide="pencil" class="w-4 h-4"></i>
                  </button>
                  <button 
                    onclick="window.app.deleteCalorieGoal(${M.id})"
                    class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
              <div class="text-2xl font-bold text-orange-600">
                ${M.targetCalories.toLocaleString()} cal/day
              </div>
            </div>
          `}).join(""))}catch(l){console.error("Failed to refresh calorie goals:",l)}}async refreshActiveCalorieGoal(){try{const l=document.getElementById("active-calorie-goal");if(!l)return;const d=await Rt.getActiveCalorieGoalForDate(this.currentDate);if(!d){l.classList.add("hidden");return}const u=await Rt.getFoodEntriesByDate(this.currentDate),M=D2(u,this.currentDate),g=Wr(d,M.totalCalories);l.classList.remove("hidden");const C=Math.min(100,g.percentConsumed),b=g.isOverGoal?"bg-red-500":"bg-green-500",N=g.isOverGoal?"text-red-600":"text-green-600";l.innerHTML=`
        <div class="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl mb-3">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="text-sm font-medium text-gray-700">Today's Goal</div>
              <div class="text-xs text-gray-500">${d.name||_2(d)}</div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-orange-600">${d.targetCalories.toLocaleString()}</div>
              <div class="text-xs text-gray-500">cal target</div>
            </div>
          </div>

          <div class="w-full bg-white/50 rounded-full h-3 mb-2 overflow-hidden">
            <div class="${b} h-3 transition-all duration-500 rounded-full" style="width: ${C}%"></div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <span class="${N} font-semibold">
              ${M.totalCalories.toLocaleString()} / ${d.targetCalories.toLocaleString()} cal
            </span>
            <span class="${N} font-semibold">
              ${g.isOverGoal?"+":""}${Math.abs(g.remainingCalories).toLocaleString()} cal
              ${g.isOverGoal?"over":"remaining"}
            </span>
          </div>
        </div>
      `}catch(l){console.error("Failed to refresh active calorie goal:",l)}}async openScannerModal(){console.log("[App] Opening scanner modal");const l=document.getElementById("scanner-modal");if(l){l.classList.remove("hidden"),this.initIcons(),this.scanner||(this.scanner=new AA("scanner-reader"));try{await this.scanner.startScanning(d=>{console.log("[App] Barcode scanned:",d),this.handleBarcodeDetected(d)}),this.updateScannerStatus("Scanning... Position barcode in view","info")}catch(d){console.error("[App] Scanner error:",d),this.updateScannerStatus("Failed to start camera. Please check permissions.","error")}}}async closeScannerModal(){var d,u;console.log("[App] Closing scanner modal");const l=document.getElementById("scanner-modal");l&&(this.scanner&&await this.scanner.stopScanning(),(d=document.getElementById("scanner-result"))==null||d.classList.add("hidden"),(u=document.getElementById("scanner-error"))==null||u.classList.add("hidden"),l.classList.add("hidden"),this.updateScannerStatus("Position barcode in the box above","info"))}handleBarcodeDetected(l){var M;console.log("[App] Processing barcode:",l);const d=document.getElementById("scanner-barcode");d&&(d.textContent=l),(M=document.getElementById("scanner-result"))==null||M.classList.remove("hidden");const u=CA(l);if(u){console.log("[App] Product found in local database:",u),this.fillFormWithProduct(u.name,u.calories,u.protein,u.cost),this.updateScannerStatus(`Found: ${u.name}`,"success"),setTimeout(()=>{this.closeScannerModal(),this.showNotification(`Product loaded: ${u.name}`,"success")},1500);return}console.log("[App] Not in local database, checking Open Food Facts..."),this.updateScannerStatus("Searching Open Food Facts database...","info"),this.lookupProductFromAPI(l)}async lookupProductFromAPI(l){try{const d=await SA(l);d?(console.log("[App] Product found in Open Food Facts:",d),this.per100gCalories=d.calories,this.per100gProtein=d.protein,this.fillFormWithProduct(d.name,d.calories,d.protein,0),this.showServingSizeConverter(d.calories,d.protein),this.updateScannerStatus(`Found: ${d.name} - Enter serving size below`,"success"),setTimeout(()=>{this.closeScannerModal(),this.showNotification("Product found! Enter serving size to calculate.","success")},1e3)):(console.log("[App] Product not found in Open Food Facts"),this.updateScannerStatus(`Barcode ${l} not found in any database. Please enter details manually.`,"warning"))}catch(d){console.error("[App] Error looking up product:",d),this.updateScannerStatus("Error searching database. Please try again or enter manually.","error")}}showServingSizeConverter(l,d){const u=document.getElementById("serving-size-container"),M=document.getElementById("per-100g-values");u&&u.classList.remove("hidden"),M&&(M.innerHTML=`Per 100g: ${l} cal, ${d}g protein`,M.classList.remove("hidden")),this.initIcons()}hideServingSizeConverter(){const l=document.getElementById("serving-size-container");l&&l.classList.add("hidden");const d=document.getElementById("serving-size-input");d&&(d.value="")}calculateServingSize(){const l=document.getElementById("serving-size-input"),d=parseFloat(l.value);if(!d||d<=0){this.showNotification("Please enter a valid serving size","error");return}const u=Math.round(this.per100gCalories*d/100),M=Math.round(this.per100gProtein*d/10)/10;console.log(`[App] Converted from per-100g to ${d}g: ${u}cal, ${M}g protein`),document.getElementById("food-calories").value=u.toString(),document.getElementById("food-protein").value=M.toString(),this.showNotification(`Calculated for ${d}g serving`,"success")}fillFormWithProduct(l,d,u,M){console.log("[App] Filling form with product data"),document.getElementById("food-name").value=l,document.getElementById("food-calories").value=d.toString(),document.getElementById("food-protein").value=u.toString(),document.getElementById("food-cost").value=M>0?M.toString():""}updateScannerStatus(l,d){const u=document.getElementById("scanner-status"),M=document.getElementById("scanner-error");d==="error"?(M&&(M.textContent=l,M.classList.remove("hidden")),u&&(u.textContent="")):(M&&M.classList.add("hidden"),u&&(u.textContent=l,u.className=`text-sm text-center mb-3 ${d==="success"?"text-green-600 font-medium":d==="warning"?"text-orange-600 font-medium":"text-gray-600"}`))}handleManualBarcode(){const l=document.getElementById("manual-barcode-input"),d=l.value.trim();d.length===13&&/^\d+$/.test(d)?(console.log("[App] Manual barcode entered:",d),this.handleBarcodeDetected(d),l.value=""):this.updateScannerStatus("Please enter a valid 13-digit barcode","error")}addTestProduct(l,d,u,M,g){IA(l,d,u,M,g),this.showNotification(`Test product added: ${d}`,"success")}async exportData(){try{const l=await Rt.exportAllData(),d=new Blob([l],{type:"application/json"}),u=URL.createObjectURL(d),M=document.createElement("a");M.href=u,M.download=`calorie-tracker-backup-${n1()}.json`,document.body.appendChild(M),M.click(),document.body.removeChild(M),URL.revokeObjectURL(u),this.showNotification("Backup exported!","success")}catch(l){console.error("Failed to export data:",l),this.showNotification("Failed to export backup","error")}}showImportModal(){const l=document.getElementById("import-modal");l==null||l.classList.remove("hidden"),this.initIcons()}closeImportModal(){const l=document.getElementById("import-modal");l==null||l.classList.add("hidden")}async importData(){var u;const l=document.getElementById("import-file"),d=(u=l.files)==null?void 0:u[0];if(!d){this.showNotification("Please select a file","error");return}try{const M=await d.text();await Rt.importData(M),this.closeImportModal(),l.value="",await this.refreshAll(),this.showNotification("Data imported successfully!","success")}catch(M){console.error("Failed to import data:",M),this.showNotification("Failed to import: "+M.message,"error")}}}const ar=new TA;window.app=ar;document.addEventListener("DOMContentLoaded",()=>ar.init());
