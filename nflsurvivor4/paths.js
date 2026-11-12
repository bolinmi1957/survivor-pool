const fs=require("fs");const d=JSON.parse(fs.readFileSync("data.json","utf8"));
const TEAMS=Object.keys(d.teams);
const BAN=new Set(["BAL","LV","CLE","NO","ARI","PHI","IND","TEN","NYJ","MIA","LAC"]); // DK futures +12500 or worse
const SHELF={LAR:[10,11,12,13]}; // Nacua IR
function erf(x){var s=x<0?-1:1;x=Math.abs(x);var t=1/(1+0.3275911*x);var y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return s*y;}
function wp(w,k){for(const g of d.schedule[w]||[]){if(g.away!==k&&g.home!==k)continue;const m=String(g.sp||"").replace("WSH","WAS").match(/^([A-Z]{2,3}) -([\d.]+)$/);if(!m)return null;const p=0.5*(1+erf((Number(m[2])/13.86)/Math.SQRT2));return{p:m[1]===k?p:1-p,opp:g.away===k?"@ "+g.home:"vs "+g.away,sp:g.sp.replace("WSH","WAS"),t:g.t};}return null;}
function ok(w,k){return !BAN.has(k)&&!(SHELF[k]&&SHELF[k].includes(w));}
function lv(w,k){if(!ok(w,k))return -50;const g=wp(w,k);return g?Math.log(g.p):-50;}
function hung(M){var n=M.length,m=M[0].length,INF=1e18,cost=M.map(r=>r.map(v=>-v));var u=Array(n+1).fill(0),v=Array(m+1).fill(0),p=Array(m+1).fill(0),way=Array(m+1).fill(0);for(var i=1;i<=n;i++){p[0]=i;var j0=0,minv=Array(m+1).fill(INF),used=Array(m+1).fill(false);do{used[j0]=true;var i0=p[j0],delta=INF,j1=0;for(var j=1;j<=m;j++)if(!used[j]){var cur=cost[i0-1][j-1]-u[i0]-v[j];if(cur<minv[j]){minv[j]=cur;way[j]=j0;}if(minv[j]<delta){delta=minv[j];j1=j;}}for(var j2=0;j2<=m;j2++){if(used[j2]){u[p[j2]]+=delta;v[j2]-=delta;}else minv[j2]-=delta;}j0=j1;}while(p[j0]!==0);do{var jj=way[j0];p[j0]=p[jj];j0=jj;}while(j0!==0);}var out=[];for(var j3=1;j3<=m;j3++)if(p[j3])out.push([p[j3]-1,j3-1]);return out;}
function bestRest(used,weeks){if(!weeks.length)return 0;const teams=TEAMS.filter(t=>!used.has(t));const M=weeks.map(w=>teams.map(t=>lv(w,t)));let v=0;hung(M).forEach(pr=>v+=M[pr[0]][pr[1]]);return v;}
const entries={YanksPads1:["NE","CHI"],YanksPads2:["JAX","KC"],YanksPads3:["CIN","DET"],YanksPads4:["CIN","JAX"],YanksPads5:["NE","CHI"]};
const CAP=Number(process.argv[2]||2), W=[10,11,12,13,14,15,16,17,18];
const LOCK=process.argv[3]?JSON.parse(process.argv[3]):{};
const names=Object.keys(entries);const used={};names.forEach(n=>used[n]=new Set(entries[n]));const picks={};names.forEach(n=>picks[n]={});
for(let wi=0;wi<W.length;wi++){const w=W[wi],rest=W.slice(wi+1);
  const cols=[];TEAMS.forEach(t=>{for(let c=0;c<CAP;c++)cols.push(t);});
  const M=names.map(n=>cols.map(t=>{if(LOCK[n]&&LOCK[n][w]&&LOCK[n][w]!==t)return -1e6;if(used[n].has(t)||!ok(w,t))return -1e6;const u=new Set(used[n]);u.add(t);return lv(w,t)+bestRest(u,rest);}));
  hung(M).forEach(pr=>{const n=names[pr[0]],t=cols[pr[1]];picks[n][w]=t;used[n].add(t);});
}
const out={};names.forEach(n=>{let prod=1;const rows=W.map(w=>{const t=picks[n][w];const g=wp(w,t);prod*=g.p;return{w,t,opp:g.opp,sp:g.sp,p:Math.round(g.p*100),cum:Math.round(prod*1000)/10,t_:g.t};});out[n]={used:entries[n],rows,path:Math.round(prod*1000)/10};});
fs.writeFileSync((process.argv[4]||"paths"+CAP)+".json",JSON.stringify(out,null,1));
names.forEach(n=>{console.log(n,"used",entries[n].join(","),"path",out[n].path+"%");out[n].rows.forEach(r=>console.log("  W"+r.w,r.t,r.sp,r.opp,r.p+"%","alive "+r.cum+"%"));});
