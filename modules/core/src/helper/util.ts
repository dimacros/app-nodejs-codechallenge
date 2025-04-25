export function messagePatternFromClass(className: string) {
  let messagePattern = className
    .replace(/([a-z])([A-Z])/g, '$1.$2') // Insert a dot between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, '$1.$2') // Insert a dot between uppercase letters followed by lowercase letters
    .toLowerCase();

  // Delete suffixes
  const suffixes = ['command', 'event', 'query'];

  suffixes.forEach((suffix) => {
    messagePattern = messagePattern.replace(
      new RegExp(`\\.${suffix}$`, 'i'),
      '',
    );
  });

  return messagePattern;
}
