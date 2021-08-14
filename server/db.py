import psycopg2
conn = psycopg2.connect("dbname=anon user=Jawadtp")


def getUsernameFromEmail(email):
    cur = conn.cursor()      
    cur.execute("SELECT username FROM accounts WHERE email=%s limit 1",(email,))        
    res = cur.fetchone()
    return res[0]