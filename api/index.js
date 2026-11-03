import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import prisma from './prisma.js'

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON format.' })
    }
    next()
})

app.get('/', (req, res) => {
    res.json({
        message: 'API do curso Ninja do Cypress!'
    })
})

app.post('/api/users/register', async (req, res) => {

    try {
        const { name, email, password } = req.body

        if (!name) {
            return res.status(400).json({
                error: 'Name is required!'
            })
        }

        if (!email) {
            return res.status(400).json({
                error: 'Email is required!'
            })
        }

        if (!password) {
            return res.status(400).json({
                error: 'Password is required!'
            })
        }

        // Normalize input data
        const normalizedName = name.trim()
        const normalizedEmail = email.trim()
        const normalizedPassword = password.trim()

        if (!normalizedName) {
            return res.status(400).json({
                error: 'Name is required!'
            })
        }

        if (!normalizedEmail) {
            return res.status(400).json({
                error: 'Email is required!'
            })
        }

        if (!normalizedPassword) {
            return res.status(400).json({
                error: 'Password is required!'
            })
        }

        // Check whether the email address is already registered
        const existingUser = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        })

        if (existingUser) {
            return res.status(409).json({
                error: 'Email address is already registered!'
            })
        }

        // Hash the user's password
        //const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user record in the PostgreSQL database
        const user = await prisma.user.create({
            data: {
                name: normalizedName,
                email: normalizedEmail,
                password: normalizedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        })

        return res.status(201).json({
            message: 'User successfully registered!',
            user
        })

    } catch (error) {

        // Handle unique constraint violations
        if (error.code === 'P2002') {
            return res.status(409).json({
                error: 'Email address is already registered!'
            })
        }

        console.error('Error registering user:', error)

        return res.status(500).json({
            error: 'Internal server error!'
        })
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users.' })
    }
})

app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({
            error: 'Name is required!'
        })
    }

    if (!email) {
        return res.status(400).json({
            error: 'Email is required!'
        })
    }

    if (!password) {
        return res.status(400).json({
            error: 'Password is required!'
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }
        
        await prisma.user.update({
            where: { id: Number(id) },
            data: {
                name, email, password
            }
        })

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Error updading user :(' })
    }
})

app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        await prisma.user.delete({ where: { id: Number(id) } })
        return res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user :(' })
    }
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
