import pgPromise from 'pg-promise'

const pgp = pgPromise()

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'UserDB',
    user: 'dba',
    password: 'dba'
})

export function deleteUserByEmail(email) {
    return db.none(
        'delete from users where email = $1',
        [email]
    )
}