import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function createAdmin() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error('Usage: ts-node scripts/create-admin.ts <email> <password>')
    process.exit(1)
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        isAdmin: true,
        password: hashedPassword,
      },
      create: {
        email,
        password: hashedPassword,
        isAdmin: true,
      },
    })

    console.log(`Admin user ${email} created/updated successfully!`)
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()
