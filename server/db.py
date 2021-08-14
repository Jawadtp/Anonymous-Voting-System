import psycopg2
from datetime import datetime, timezone

conn = psycopg2.connect("dbname=anon user=Jawadtp")


def getUsernameFromEmail(email):
    cur = conn.cursor()      
    cur.execute("SELECT username FROM accounts WHERE email=%s limit 1",(email,))        
    res = cur.fetchone()
    return res[0]

def doesUserExist(email, password):
    cur = conn.cursor()       
    cur.execute("SELECT EXISTS(select 1 from accounts where email=%s AND password=%s)",(email, password))        
    res = cur.fetchone()
    return res[0]

def areUsernameAndEmailUnique(email, username):
    
    cur = conn.cursor()       
    cur.execute("SELECT username, email FROM accounts WHERE username=%s OR email=%s limit 1",(username, email))        
    res = cur.fetchone()
    
    if(cur.rowcount):
        if res[0]==username:
            return ['error','username']
        if res[1]==email:
            return ['error','email']
    
    return True

def createAccount(email, username, password):
    try:
        current_time = datetime.now(timezone.utc) 
        cur = conn.cursor()       
        cur.execute("INSERT INTO accounts (username, password, email, createdon) VALUES (%s,%s,%s, %s)",(username, password, email, current_time))
        cur.close()
        conn.commit()
        return True
    except Exception as e:
        return str(e)