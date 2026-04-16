import pandas as pd
import time

# configurations
# we define the columns we expect to use in our logic
REQUIRED_COLUMNS = [ 'Model', 'Trim' ,'Price', 'Type','MPG','HP', 'Seats', 'Screen','AppleCP',
'Sound', 'Material', 'BlindSpot', 'HeatedSeats', 'Sunroof', 'AWD', 'ParkingSensors', 'RemoteStart']

def load_and_clean_data():
    #reads the excel file and performs data engineering to clean it up
    print("Loading the Honda Dataset...")
    try:
        df = pd.read_excel('honda_data.xlsx')

        #fill empty cells with no to prevent crashes in the logic
        df = df.fillna("No")

        #extract year bc model starts with year 
        if 'Year' not in df.columns: 
            print("Extracting year from model name...")
            #take first 4 chars
            df['Year'] = df['Model'].astype(str).str[:4].astype(int)

        #standardize model name, split by space and take the second word
        print("Standardizing model names...")
        df['Model_Name'] = df['Model'].astype(str).str.split().str[1]

        print("Data cleaned. Loaded {len(df)} cars")

        return df
    
    except FileNotFoundError:
        print("Error: couldn't find 'honda_data.xlsx'")
        return None
    except Exception as e:
        print(f"Critical data error: {e}"  )
        return None

def get_user_profile( ) :
    print("\n" + "="*60) 
    print("AUTO MATCH ENGINE WELCOMES YOU (v2.0)")
    print("="*60)

    #hard inputs
    while True:
        try: 
            budget = int(input("1. What is your MAX budget? eg. 40000 : $"))
            break # breaks the loop if the number is valid
        except ValueError: 
            print("  Please enter a valid number")

    seats_input = input("2. Do you need a 3rd row (7+ seaets)? (y/n): ").lower()
    min_seats = 7 if seats_input.startswith('y') else 5

    #multi select preferences
    print("\n 3. What are your priorities? (type tags separated by comma)")
    print( " [safety]  - Blind Spot, Parking Sensors")
    print(  " [winter]  - Heated Seats, AWD, Remote Start")
    print("  [tech]  - Big Screen (9 inch+), Wireless CarPlay")
    print("  [music]  -  Bose Premium Audio")
    print("  [speed]   - High Horsepower (>250 HP)")

    #example input : safety, tech
    user_input = input("\n. > Your choices: ").lower()
    priorities = [ x.strip() for x in user_input.split(',')]

    return {
        "budget": budget,
        "min_seats": min_seats,
        "priorities": priorities
    }
    
def calculate_score(row, user_prefs):
    score = 0

    #hard constraints, dealbreakers
    if row['Seats'] < user_prefs['min_seats']:
        return -500  
    
    # gray area budget logic
    price_gap= row['Price'] - user_prefs['budget']

    if price_gap <=0:
        #reward for saving money (up to 20 pts)
        score += min(20, (abs(price_gap) / 1000) *2)

    elif price_gap <= (user_prefs['budget'] * 0.10):
        #grey zone penalty (0-10% over)
        # -5 points for every $500 over
        score -= (price_gap /500) * 5
    
    else:
        #hard disqualification (10% over)
        return -500
    
    # feature matchin (weighted algorithm)
    #priority : safety
    if 'safety' in user_prefs['priorities']:
        if str(row['BlindSpot']) == 'Yes': score +=30
        if str(row['ParkingSensors']) == 'Yes': score +=15
        if str(row['BlindSpot']) == 'No': score -= 40 # important penalty

    #priority : winter/adventure
    if 'winter' in user_prefs['priorities']:
        if str(row['HeatedSeats']) == 'Yes': score +=15
        if str(row['AWD']) == 'Yes': score +=25
        if str(row['RemoteStart']) == 'Yes': score +=10
        if str(row['AWD']) == 'No': score -=20 # penalty 

    #priority : tech
    if 'tech' in user_prefs['priorities']:
        if row['Screen'] >=9: score += 15
        if str(row['AppleCP']) == 'Wireless': score +=15

    #priority : music/luxury
    if 'music' in user_prefs['priorities']:
        if 'Bose' in str(row['Sound']): score +=25
        if str(row['Material']) == 'Leather': score +=10

    #priority : speed/performance
    if 'speed' in user_prefs['priorities']:
        if row['HP'] > 250: score +=20
        if row['HP'] < 190: score -=20

    return score


def run_engine():
    #ETL pipeline (extract, transform, load)
    df = load_and_clean_data()
    if df is None: return

    #user query
    user = get_user_profile()

    print(f"Running algorithm on {len(df) } vehicles...")
    time.sleep(1)

    # processing (apply logic)
    df['Match_Score'] = df.apply(lambda row: calculate_score(row, user), axis=1)

    #sorting and filtering
    valid_results = df[df['Match_Score'] > -100].copy()
    valid_results = valid_results.sort_values(by= 'Match_Score', ascending=False)

    #output results 
    print("\n" + "="*60)
    if valid_results.empty:
        print("No matches found. Try increasing your budget")

    else:
        print(f"TOP 3 RECOMMENDATIONS FOR {user['priorities']}\n")

        for i, (index, car) in enumerate (valid_results.head(3).iterrows()):
            print(f" #{i+1}: {car['Year']} Honda {car['Model_Name']} {car['Trim']}")

            print(f" Prince: ${car['Price']:,} | Score: {int(car['Match_Score'])}")

        #smart why explanation tbd
        

if __name__ == "__main__":
    run_engine()
