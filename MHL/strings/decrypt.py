from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64

key = b"your_secret_key_1234567890123456"
iv = b"1234567890123456"
ciphertext = base64.b64decode("bqGrDKdQ8zo26HflRsGvVA==")

cipher = AES.new(key, AES.MODE_CBC, iv)
text = unpad(cipher.decrypt(ciphertext), AES.block_size)
print(text.decode('utf-8'))
