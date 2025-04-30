/** dynamic function to encrypt
 * some key we use NEXTAUTH_SECRET
 */
import Cryptr from 'cryptr'

const secretKey = 'kIIPQVlztQgSWlZtf3h1Hvv5rSUjpyld7Ih3qwPMZy0='

const cryptr = new Cryptr(secretKey)

export function encrypted(text: string) {
  return cryptr?.encrypt(text)
}

export function decrypted(encryptedString: string) {
  return cryptr?.decrypt(encryptedString)
}
