import { prisma } from '../config/prisma.js';
export const findSimilarCases=async(caseId:string,keywords:string[])=>{const rows=await prisma.similarCase.findMany({where:{clinicalCaseId:caseId}});if(rows.length)return rows;return prisma.similarCase.findMany({take:10,orderBy:{similarityScore:'desc'}});};
