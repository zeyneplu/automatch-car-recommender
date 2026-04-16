#HTML data scraping
# import requests
# from bs4 import BeautifulSoup
# import pandas as pd
# import datetime
# import time

# # --- CONFIGURATION ---
# BASE_URL = "https://www.luterileyhonda.com/new-inventory/index.htm"
# OUTPUT_FILE = "Lute_Riley_Inventory_Final.xlsx"

# # Professional Headers (Identity)
# HEADERS = {
#     'User-Agent': 'UTD-CS-Student-Project/1.0 (m.uslu@utdallas.edu)',
#     'Accept-Language': 'en-US,en;q=0.9',
# }

# # Mapping logic for "Missing" data
# BODY_TYPE_MAP = {
#     'Civic': 'Sedan', 'Accord': 'Sedan', 'Integra': 'Sedan',
#     'CR-V': 'SUV', 'HR-V': 'SUV', 'Pilot': 'SUV', 'Passport': 'SUV', 'Prologue': 'SUV',
#     'Odyssey': 'Minivan', 'Ridgeline': 'Truck'
# }

# def get_body_type(model_name):
#     for key, value in BODY_TYPE_MAP.items():
#         if key in model_name:
#             return value
#     return "Unknown"

# def scrape_inventory():
#     timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#     print(f"[INFO] Process started at {timestamp}")
#     print(f"[INFO] Connecting to: {BASE_URL}")
    
#     try:
#         response = requests.get(BASE_URL, headers=HEADERS)
#         response.raise_for_status()
#     except requests.exceptions.RequestException as e:
#         print(f"[ERROR] Connection failed: {e}")
#         return

#     soup = BeautifulSoup(response.text, 'html.parser')
    
#     # Locate all vehicle cards, just find the class
#     cars = soup.find_all(True, class_='vehicle-card')
    
#     if not cars:
#         print("[WARNING] No cars found. The website structure might have changed.")
#         return

#     print(f"[INFO] Found {len(cars)} vehicles. Extracting data...")
    
#     car_data = []

#     for car in cars:
#         try:
#             # 1. Title & Year
#             title_tag = car.find('h2', class_='vehicle-card-title')
#             full_title = title_tag.text.strip() if title_tag else "Unknown"
            
#             parts = full_title.split(' ')
#             year = parts[0] if parts[0].isdigit() else "2025"
            
#             # 2. Robust Price Finder (Checks 3 places)
#             price_tag = car.find('span', class_='price-value') # Priority 1
#             if not price_tag:
#                 price_tag = car.find('span', class_='internetPrice') # Priority 2
#             if not price_tag:
#                 price_tag = car.find('span', class_='primary-price') # Priority 3
            
#             price = price_tag.text.strip() if price_tag else "Call for Price"
            
#             # 3. VIN (Hidden in the code)
#             vin = car.get('data-vin', 'N/A')

#             # 4. Intelligence Logic (Guessing specs from Name)
#             body_type = get_body_type(full_title)
            
#             # Fuel Type Logic
#             if "Prologue" in full_title:
#                 fuel_type = "Electric"
#             elif "Hybrid" in full_title:
#                 fuel_type = "Hybrid"
#             else:
#                 fuel_type = "Gas"
                
#             # Drivetrain Logic
#             if "AWD" in full_title or "4WD" in full_title:
#                 drivetrain = "AWD"
#             elif "Ridgeline" in full_title:
#                 drivetrain = "AWD"
#             else:
#                 drivetrain = "FWD"

#             # 5. Save Row
#             car_data.append({
#                 "Full Title": full_title,
#                 "Year": year,
#                 "Price": price,
#                 "BodyType": body_type,
#                 "FuelType": fuel_type,
#                 "Drivetrain": drivetrain,
#                 "VIN": vin
#             })
            
#         except Exception as e:
#             # Skip bad rows silently
#             continue

#     # Export to Excel
#     if car_data:
#         df = pd.DataFrame(car_data)
        
#         # Clean Price for sorting (Remove $ and ,)
#         df['Price_Numeric'] = df['Price'].astype(str).str.replace(r'[$,]', '', regex=True)
        
#         df.to_excel(OUTPUT_FILE, index=False)
#         print(f"[SUCCESS] Saved {len(df)} cars to '{OUTPUT_FILE}'")
#         print(f"[INFO] Check your folder for the file!")
#     else:
#         print("[WARNING] No data extracted.")

# if __name__ == "__main__":
#     scrape_inventory()

#API data scraping
import requests
import pandas as pd
import time

# --- CONFIGURATION ---
# The "Hidden" API URL derived from your screenshot's widget ID
# Format: /apis/widget/WIDGET_NAME:WIDGET_ID/getInventory
API_URL = "https://www.luterileyhonda.com/apis/widget/inventory-listing-ws-inv-data-service:inventory-data-bus1/getInventory"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://www.luterileyhonda.com/new-inventory/index.htm',
    'Accept': 'application/json'
}

def scrape_api_inventory():
    print("🚀 Connecting to Lute Riley Hidden API...")
    
    all_cars = []
    start_index = 0
    batch_size = 18 # The API sends 18 cars at a time
    
    while True:
        # Ask for the next batch of cars
        params = {'start': start_index}
        print(f"   -> Fetching batch starting at {start_index}...")
        
        try:
            response = requests.get(API_URL, headers=HEADERS, params=params)
            
            if response.status_code != 200:
                print(f"⚠️ API Limit Reached or Error (Status: {response.status_code})")
                break
                
            data = response.json()
            
            # The API returns a 'pageInfo' and 'inventory' list
            if 'inventory' not in data or not data['inventory']:
                print("✅ End of inventory reached!")
                break
                
            cars_batch = data['inventory']
            print(f"      Found {len(cars_batch)} vehicles.")
            
            for car in cars_batch:
                # This gives you 100% accurate data directly from their database
                all_cars.append({
                    "Year": car.get('year', 'N/A'),
                    "Make": car.get('make', 'N/A'),
                    "Model": car.get('model', 'N/A'),
                    "Trim": car.get('trim', 'N/A'),
                    "VIN": car.get('vin', 'N/A'),
                    "Type": car.get('bodyType', 'N/A'),
                    "Engine": car.get('engine', 'N/A'),
                    "MSRP": car['pricing'].get('msrp', 'Call for Price'),
                    "Our Price": car['pricing'].get('finalPrice', 'Call for Price'),
                    "Fuel": car.get('fuelType', 'N/A')
                })
            
            # Stop if we received fewer cars than the batch size (means it's the last page)
            if len(cars_batch) < batch_size:
                break
                
            start_index += len(cars_batch)
            time.sleep(1) # Be polite to the server
            
        except Exception as e:
            print(f"❌ Critical Error: {e}")
            break

    # Export
    print(f"🎉 TOTAL: Scraped {len(all_cars)} cars directly from API.")
    if all_cars:
        df = pd.DataFrame(all_cars)
        filename = "Lute_Riley_API_Data.xlsx"
        df.to_excel(filename, index=False)
        print(f"💾 Saved clean data to {filename}")

if __name__ == "__main__":
    scrape_api_inventory()