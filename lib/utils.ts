// Format price in Pakistani currency
export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₨${(price / 1000000).toFixed(1)}M`
  } else if (price >= 100000) {
    return `₨${(price / 100000).toFixed(1)}L`
  } else if (price >= 1000) {
    return `₨${(price / 1000).toFixed(1)}k`
  }
  return `₨${price.toLocaleString('en-PK')}`
}

// Format price with currency symbol
export function formatPriceWithCurrency(price: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price)
}

// Format date to time ago
export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'
  
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'
  
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'
  
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'
  
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'
  
  return Math.floor(seconds) + ' seconds ago'
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString('en-PK')
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Get vehicle icon
export function getVehicleIcon(vehicleType: string): string {
  switch (vehicleType.toLowerCase()) {
    case 'car': return '🚗'
    case 'bike': return '🏍️'
    case 'suv': return '🚙'
    case 'truck': return '🚚'
    case 'van': return '🚐'
    case 'jeep': return '🚙'
    default: return '🚗'
  }
}

// Get transmission icon
export function getTransmissionIcon(transmission: string): string {
  switch (transmission?.toLowerCase()) {
    case 'automatic': return '🔄'
    case 'manual': return '🎛️'
    case 'semi-automatic': return '⚙️'
    case 'cvt': return '⚡'
    default: return '⚙️'
  }
}

// Get condition color
export function getConditionColor(condition: string): { bg: string; text: string } {
  switch (condition?.toLowerCase()) {
    case 'new':
      return { bg: 'bg-green-100', text: 'text-green-800' }
    case 'used':
      return { bg: 'bg-blue-100', text: 'text-blue-800' }
    case 'reconditioned':
      return { bg: 'bg-purple-100', text: 'text-purple-800' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' }
  }
}

// Get fuel type icon
export function getFuelIcon(fuelType: string): string {
  switch (fuelType?.toLowerCase()) {
    case 'petrol': return '⛽'
    case 'diesel': return '⛽'
    case 'electric': return '⚡'
    case 'hybrid': return '🔋'
    case 'cng': return '💨'
    case 'lpg': return '🔥'
    default: return '⛽'
  }
}

// Validate phone number (Pakistani)
export function validatePhoneNumber(phone: string): boolean {
  const regex = /^03[0-9]{2}[0-9]{7}$/
  return regex.test(phone)
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{4})(\d{7})/, '$1 $2')
  }
  return phone
}

// Generate slug from text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Generate random ID
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Calculate percentage
export function calculatePercentage(partial: number, total: number): number {
  if (total === 0) return 0
  return Math.round((partial / total) * 100)
}

// Get brand logo (placeholder function)
export function getBrandLogo(brand: string): string {
  const logos: Record<string, string> = {
    'toyota': '/logos/toyota.png',
    'honda': '/logos/honda.png',
    'suzuki': '/logos/suzuki.png',
    'mercedes': '/logos/mercedes.png',
    'bmw': '/logos/bmw.png',
    'audi': '/logos/audi.png',
    'hyundai': '/logos/hyundai.png',
    'kia': '/logos/kia.png',
    'ford': '/logos/ford.png',
    'nissan': '/logos/nissan.png',
  }
  
  return logos[brand.toLowerCase()] || '/logos/default.png'
}

// Get city coordinates (placeholder)
export function getCityCoordinates(city: string): { lat: number; lng: number } {
  const coordinates: Record<string, { lat: number; lng: number }> = {
    'karachi': { lat: 24.8607, lng: 67.0011 },
    'lahore': { lat: 31.5497, lng: 74.3436 },
    'islamabad': { lat: 33.6844, lng: 73.0479 },
    'rawalpindi': { lat: 33.5651, lng: 73.0169 },
    'faisalabad': { lat: 31.4504, lng: 73.1350 },
    'multan': { lat: 30.1575, lng: 71.5249 },
    'peshawar': { lat: 34.0151, lng: 71.5249 },
    'quetta': { lat: 30.1798, lng: 66.9750 },
  }
  
  return coordinates[city.toLowerCase()] || { lat: 0, lng: 0 }
}

// Calculate EMI
export function calculateEMI(price: number, months: number = 60, interestRate: number = 12): number {
  const monthlyRate = interestRate / 12 / 100
  const emi = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(emi)
}

// Validate email
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Extract year from date
export function extractYear(dateString: string): number {
  return new Date(dateString).getFullYear()
}

// Get current year
export function getCurrentYear(): number {
  return new Date().getFullYear()
}

// Sort array of objects
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    let aVal = a[key]
    let bVal = b[key]
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
}

// Group array by key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    groups[groupKey] = groups[groupKey] || []
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Generate search URL
export function generateSearchUrl(filters: Record<string, any>): string {
  const params = new URLSearchParams()
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all' && value !== '') {
      params.append(key, String(value))
    }
  })
  
  return params.toString() ? `/search?${params.toString()}` : '/search'
}

// Parse search URL
export function parseSearchUrl(searchParams: URLSearchParams): Record<string, string> {
  const filters: Record<string, string> = {}
  
  searchParams.forEach((value, key) => {
    filters[key] = value
  })
  
  return filters
}

// Get image placeholder
export function getImagePlaceholder(vehicleType: string): string {
  const placeholders = {
    car: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/example_car.jpg',
    bike: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/example_bike.jpg',
    suv: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/example_suv.jpg',
    truck: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/example_truck.jpg',
  }
  
  return placeholders[vehicleType.toLowerCase() as keyof typeof placeholders] || placeholders.car
}