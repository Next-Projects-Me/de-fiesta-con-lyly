export function parseBoolean(value: string | null | undefined): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'all') return undefined;
    return undefined; // para "" o undefined/null
}