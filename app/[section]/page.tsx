import Workspace from '@/components/workspace';
const routes=['dashboard','case','cases','similar','trends','research','saved','profile','login','signup','qr-center'];
export function generateStaticParams(){return routes.map(section=>({section}))}
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;return <Workspace section={section}/>}
