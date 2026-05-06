import psycopg2

conn = psycopg2.connect(
    database="garage_app",
    user="postgres",
    password="Likidc@1822",
    host="localhost",
    port="5432"
)

cursor = conn.cursor()
print("Connected to PostgreSQL successfully!")