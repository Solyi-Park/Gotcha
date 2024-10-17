export function maskEmail(email: string) {
  const [userId, domain] = email.split("@");
  const visiblePart = userId.slice(0, 3);
  const maskedId = visiblePart + "*".repeat(userId.length - 3);

  const [domainName, topLevelDomain] = domain.split(".");
  const maskedDomain = "*".repeat(domainName.length) + "." + topLevelDomain;
  return `${maskedId}@${maskedDomain}`;
}
