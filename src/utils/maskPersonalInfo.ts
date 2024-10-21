export function maskEmail(email: string) {
  if (!email) return "";
  const [userId, domain] = email.split("@");
  const visiblePart = userId.slice(0, 3);
  const maskedId = visiblePart + "*".repeat(userId.length - 3);

  const [domainName, topLevelDomain] = domain.split(".");
  const maskedDomain = "*".repeat(domainName.length) + "." + topLevelDomain;
  return `${maskedId}@${maskedDomain}`;
}

export function maskName(name: string) {
  if (!name) return "";
  if (name.length === 2) {
    return name[0] + "*";
  }
  if (name.length >= 3) {
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
  }
}

export function maskPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return "";
  if (phoneNumber.length >= 10) {
    return (
      phoneNumber.slice(0, 3) +
      "*".repeat(phoneNumber.length - 7) +
      phoneNumber.slice(-4)
    );
  }
}
