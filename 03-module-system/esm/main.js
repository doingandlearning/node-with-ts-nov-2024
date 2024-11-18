import { add as a, subtract as sub } from "./exports.js"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

console.log(a(1, 2))
console.log(sub(1, 2))

console.log(import.meta.filename)
console.log(import.meta.dirname)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log(__dirname)
