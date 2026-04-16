from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os
import automatch_engine as engine  # Importing your original script!

app = FastAPI()

# 1. ALLOW REACT TO TALK TO THIS SCRIPT
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. DEFINE THE DATA SHAPE (Must match what React sends)
class UserPreferences(BaseModel):
    budget: int
    min_seats: int
    priorities: list[str]

# 3. HELPER: FIX IMAGE PATHS
# Since your Excel doesn't have image links, we auto-assign them based on model name
def assign_assets(row):
    model = str(row.get('Model', '')).lower()
    if 'civic' in model: return '/cars/civic-type-r.png'
    if 'accord' in model: return '/cars/accord.png'
    if 'cr-v' in model: return '/cars/crv.png'
    if 'prologue' in model: return '/cars/prologue.png'
    return '/cars/placeholder.png'

# --- API ENDPOINTS ---

@app.get("/inventory")
def get_inventory():
    """Sends your raw Excel data to React"""
    # Force Python to look in the CURRENT folder for the Excel file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "honda_data.xlsx")
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=500, detail="honda_data.xlsx not found in backend folder")

    # Use your engine's loading logic if you want, or plain pandas here
    df = pd.read_excel(file_path)
    df = df.fillna("No") # Prevent crashes
    
    # Add the 'img' column so React can show pictures
    df['img'] = df.apply(assign_assets, axis=1)
    
    return df.to_dict(orient="records")

@app.post("/match")
def match_car(prefs: UserPreferences):
    """The Brain: Receives React input -> Runs YOUR Engine -> Returns Winners"""
    
    # 1. Load Data
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "honda_data.xlsx")
    df = pd.read_excel(file_path)
    df = df.fillna("No")
    
    # 2. Convert React Data to Python Dictionary
    # React sends: { budget: 40000, min_seats: 5, priorities: ['safety'] }
    user_dict = {
        "budget": prefs.budget,
        "min_seats": prefs.min_seats,
        "priorities": prefs.priorities
    }
    
    # 3. RUN YOUR ALGORITHM
    # We use your exact function: calculate_score(row, user_prefs)
    df['Match_Score'] = df.apply(lambda row: engine.calculate_score(row, user_dict), axis=1)
    
    # 4. Sort and Filter
    results = df[df['Match_Score'] > -100].sort_values(by='Match_Score', ascending=False)
    
    # 5. Add Images for the UI
    results['img'] = results.apply(assign_assets, axis=1)
    
    # 6. Return Top 3
    return results.head(3).to_dict(orient="records")