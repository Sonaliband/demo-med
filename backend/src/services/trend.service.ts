import { prisma } from '../config/prisma.js';
export const listTrends=(region?:string,disease?:string)=>prisma.diseaseTrend.findMany({where:{...(region?{region:{contains:region,mode:'insensitive'}}:{}),...(disease?{disease:{contains:disease,mode:'insensitive'}}:{})},orderBy:{activity:'desc'}});
