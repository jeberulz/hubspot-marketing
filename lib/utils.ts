export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function getAiScoreStyle(score: number) {
  if (score >= 80)
    return "bg-[#00BDA5]/10 text-[#00BDA5] border-[#00BDA5]/20";
  if (score >= 60)
    return "bg-[#DBAB09]/10 text-[#DBAB09] border-[#DBAB09]/20";
  return "bg-[#F2545B]/10 text-[#F2545B] border-[#F2545B]/20";
}
