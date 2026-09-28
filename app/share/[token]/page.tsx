import {SecureShare} from '@/components/secure-share';
export default async function SharePage({params}:{params:Promise<{token:string}>}){const {token}=await params;return <SecureShare token={token}/>}
