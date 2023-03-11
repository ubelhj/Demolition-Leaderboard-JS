// calculate respawn time

const tDivide = {
    years: 31536000,
    days: 86400,
    hours: 3600,
    minutes: 60,
}

const tMultiply = {
    years: 365,
    days: 24,
    hours: 60,
    minutes: 60,
}


export const calculateYears = (demoSeconds) => {
    return Math.floor(demoSeconds / tDivide.years)
}

export const calculateDays = (demoSeconds, years) => {
    const x = years * tMultiply.years
    return Math.floor(demoSeconds / tDivide.days - x)
}

export const calculateHours = (demoSeconds, years, days) => {
    const x = years * tMultiply.years * tMultiply.days
    const y = days * tMultiply.days
    return Math.floor(demoSeconds / tDivide.hours - x - y)
}

export const calculateMinutes = (demoSeconds, years, days, hours) => {
    const x = years * tMultiply.years * tMultiply.days * tMultiply.hours
    const y = days * tMultiply.days * tMultiply.hours
    const z = hours * tMultiply.hours
    return Math.floor(demoSeconds / tDivide.minutes - x - y - z)
}

export const calculateSeconds = (demoSeconds, years, days, hours, minutes) => {
    const w = years * tMultiply.years * tMultiply.days * tMultiply.hours * tMultiply.minutes
    const x = days * tMultiply.days * tMultiply.hours * tMultiply.minutes
    const y = hours * tMultiply.hours * tMultiply.minutes
    const z = minutes * tMultiply.minutes
    return Math.floor(demoSeconds - w - x - y - z)
}