
import {build} from 'esbuild';
await build({entryPoints:['services/index.ts'],bundle:true,platform:'node',format:'esm',outfile:'../work/services-under-test.mjs',logLevel:'silent'});
const memory=new Map();globalThis.localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};globalThis.sessionStorage={setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)};globalThis.window={dispatchEvent:()=>{}};
const {caseService,researchService,authService,newCase,readState}=await import('../work/services-under-test.mjs');
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
let invalid=false;try{caseService.save(newCase())}catch{invalid=true}assert(invalid,'Empty case must be rejected');
const c={...newCase(),title:'Synthetic workflow test',age:'42',sex:'Female',symptoms:'Cough, fatigue and fever',labs:'COVID test requested'};caseService.save(c);assert(caseService.get(c.id)?.title===c.title,'Saved case missing');const analysis=await caseService.analyze(c);assert(analysis.entities.includes('cough')&&analysis.entities.includes('fever'),'Submitted entities not extracted');assert(analysis.summary.includes('42-year-old'),'Summary did not reflect age');
assert(researchService.search('long covid').length===1,'Search mismatch');assert(researchService.search('','Review').every(p=>p.category==='Review'),'Category filter mismatch');researchService.toggleSave('long-covid');assert(readState().saved.includes('long-covid'),'Bookmark not persisted');researchService.toggleSave('long-covid');assert(!readState().saved.includes('long-covid'),'Unsave failed');caseService.remove(c.id);assert(!caseService.get(c.id),'Delete failed');
authService.signIn('demo@example.com','sample-only');assert(![...memory.values()].some(v=>v.includes('sample-only')),'Password was persisted');
console.log('PASS: invalid case validation, case create/read/delete, input-dependent analysis, research search/filter, save/unsave, password non-persistence');
const routes=['/','/dashboard','/cases','/case','/similar','/trends','/research','/saved','/profile','/login','/signup','/research/arbovirus-2025','/research/dengue-testing','/research/long-covid','/research/recovery','/research/arbovirus-2022','/research/dengue-2009'];
const results=await Promise.all(routes.map(async route=>{const response=await fetch('http://localhost:5173'+route);assert(response.status===200,route+' returned '+response.status);return route+': '+response.status}));console.log(results.join('\n'));
