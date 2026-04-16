import streamlit as st
import pandas as pd
import json
import requests
from streamlit_lottie import st_lottie
import backend.automatch_engine as engine 

# --- 1. SYSTEM CONFIGURATION ---
st.set_page_config(
    page_title="Lute Riley Honda | Configurator",
    page_icon="🚘",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# --- 2. ASSET LOADER ---
# Option: Use the downloaded file if you have it, otherwise fallback to URL
def load_lottie_url(url):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()

# Using a KNOWN Transparent Animation (Modern Car Scan)
lottie_hero = load_lottie_url("https://lottie.host/9338006e-8263-4796-a979-9942a17db91f/Qf9XW5yq2P.json")
lottie_processing = load_lottie_url("https://lottie.host/81b2f7d3-78c6-4340-a396-8579b29c0d38/D0J2j5zL1H.json")

# --- 3. PROFESSIONAL DESIGN SYSTEM (CSS) ---
st.markdown("""
<style>
    /* 1. HIDE STREAMLIT ELEMENTS */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* 2. REMOVE THE 'LINK' EMOJI ON HOVER */
    .st-emotion-cache-1v0mbdj > a {display: none !important;}
    a.anchor-link {display: none !important;}
    
    /* 3. PROFESSIONAL TYPOGRAPHY */
    h1 { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 800; letter-spacing: -1px; }
    h2, h3 { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 600; }
    p { font-family: 'Arial', sans-serif; font-size: 1.1rem; color: #444; }
    
    /* 4. HONDA BUTTON STYLING (No Emojis, Sharp Edges) */
    .stButton > button {
        background-color: #CC0000 !important;
        color: white !important;
        border-radius: 4px !important; /* Sharp professional corners */
        font-weight: bold !important;
        border: none !important;
        padding: 10px 25px !important;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
    }
    .stButton > button:hover {
        background-color: #990000 !important;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        transform: translateY(-2px);
    }

    /* 5. CARD STYLING */
    .inventory-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 25px;
        transition: transform 0.2s;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    .inventory-card:hover {
        border-color: #CC0000;
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .spec-tag {
        background-color: #f0f2f6;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        color: #555;
        font-weight: 600;
        margin-right: 5px;
    }
</style>
""", unsafe_allow_html=True)

# --- 4. STATE MANAGEMENT ---
if 'current_phase' not in st.session_state:
    st.session_state.current_phase = 'landing'

if 'user_prefs' not in st.session_state:
    st.session_state.user_prefs = {}

def set_phase(phase_name):
    st.session_state.current_phase = phase_name
    st.rerun()

# --- 5. HEADER (Minimalist) ---
col1, col2 = st.columns([1, 5])
with col1:
    # You can replace this with a real logo image later
    st.markdown("<h2 style='color:#CC0000; margin:0;'>HONDA</h2>", unsafe_allow_html=True) 
with col2:
    st.markdown("<div style='text-align:right; color:gray; padding-top:10px; font-size:0.9rem;'>LUTE RILEY INVENTORY SYSTEM v2.1</div>", unsafe_allow_html=True)
st.markdown("---")

# ==========================================
# PHASE 1: LANDING PAGE (Professional)
# ==========================================
if st.session_state.current_phase == 'landing':
    
    # 2-COLUMN HERO LAYOUT
    # Adjusted ratio to give text more room, animation less empty space
    c1, c2 = st.columns([3, 2], gap="large")
    
    with c1:
        st.markdown("<div style='padding-top: 20px;'>", unsafe_allow_html=True)
        st.markdown("<h1 style='font-size: 4em; line-height: 1.1;'>The Intelligent Way to Buy a Honda.</h1>", unsafe_allow_html=True)
        st.markdown("<p style='margin-top: 20px; font-size: 1.2rem; line-height: 1.6;'>Stop scrolling through spreadsheets. Our AI-driven configurator analyzes 30+ vehicle attributes to match you with the specific VIN that fits your budget and lifestyle.</p>", unsafe_allow_html=True)
        
        st.markdown("<br>", unsafe_allow_html=True)
        # PROFESSIONAL BUTTON
        if st.button("Start Configuration", type="primary"):
            set_phase('quiz')
        st.markdown("</div>", unsafe_allow_html=True)
        
    with c2:
        # ANIMATION (Transparent Background)
        if lottie_hero:
            st_lottie(lottie_hero, height=300, key="hero_anim")

    # PROFESSIONAL INVENTORY SPOTLIGHT
    df = engine.load_and_clean_data()
    if df is not None:
        st.markdown("<br><br><br>", unsafe_allow_html=True)
        st.markdown("### CURRENT MARKET LEADERS")
        
        col1, col2, col3 = st.columns(3)

        def draw_pro_card(col, car, category, badge_color):
            with col:
                st.markdown(f"""
                <div class="inventory-card">
                    <div style="color: {badge_color}; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                        {category}
                    </div>
                    <h3 style="margin: 0; font-size: 1.6rem;">{car['Model_Name']}</h3>
                    <div style="color: #666; font-size: 1rem; margin-bottom: 15px;">{car['Trim']} Edition</div>
                    
                    <div style="margin-bottom: 15px;">
                        <span class="spec-tag">{car['HP']} HP</span>
                        <span class="spec-tag">{car['MPG']} MPG</span>
                        <span class="spec-tag">{car['Seats']} Seats</span>
                    </div>
                    
                    <div style="font-size: 1.4rem; font-weight: 700; color: #111;">
                        ${car['Price']:,}
                    </div>
                    <div style="font-size: 0.8rem; color: #888;">MSRP excluding tax</div>
                </div>
                """, unsafe_allow_html=True)

        # Finding the cars
        perf_car = df.loc[df['HP'].idxmax()]
        effic_car = df.loc[df['MPG'].idxmax()]
        lux_car = df.loc[df['Price'].idxmax()]

        draw_pro_card(col1, perf_car, "Performance Leader", "#CC0000")
        draw_pro_card(col2, effic_car, "Efficiency Leader", "#2e7bcf")
        draw_pro_card(col3, lux_car, "Flagship Model", "#000")

# ==========================================
# PHASE 2: THE WIZARD (Professional)
# ==========================================
elif st.session_state.current_phase == 'quiz':
    df = engine.load_and_clean_data()
    
    if 'temp_prefs' not in st.session_state:
        st.session_state.temp_prefs = {"budget": 40000, "priorities": ["safety"]}

    # Clean Progress Bar
    st.progress(50)
    st.caption("Step 2 of 3: Preferences")

    c1, c2 = st.columns([2, 1], gap="large")
    
    with c1:
        st.subheader("Configuration Parameters")
        
        # Budget
        st.markdown("**Maximum Investment**")
        budget = st.slider("Budget", 20000, 60000, st.session_state.temp_prefs['budget'], 500, label_visibility="collapsed")
        st.caption(f"Selected Limit: ${budget:,}")
        
        st.markdown("<br>", unsafe_allow_html=True)
        
        # Seats
        st.markdown("**Passenger Requirements**")
        seats_mode = st.radio("Seats", ["Standard (5 Passengers)", "Extended (7+ Passengers)"], label_visibility="collapsed")
        min_seats = 7 if "7+" in seats_mode else 5

        st.markdown("<br>", unsafe_allow_html=True)

        # Priorities
        st.markdown("**Vehicle Priorities**")
        priorities = st.multiselect("Select critical features:", ["safety", "winter", "tech", "music", "speed"], default=["safety"], label_visibility="collapsed")

    with c2:
        # Live Stats Box
        st.markdown("""
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
            <h4 style="margin-top:0;">Database Status</h4>
        """, unsafe_allow_html=True)
        
        if lottie_processing:
            st_lottie(lottie_processing, height=100, key="proc_anim")
            
        matches = df[(df['Price'] <= budget) & (df['Seats'] >= min_seats)]
        match_count = len(matches)
        
        st.metric("Available Matches", f"{match_count} Units")
        
        if match_count == 0:
            st.error("Constraint Error: Budget too low for selected criteria.")
        else:
            st.success("Query Valid. Ready to process.")
            
        st.markdown("</div><br>", unsafe_allow_html=True)
        
        if st.button("Generate Results", type="primary", disabled=(match_count==0), use_container_width=True):
            st.session_state.user_prefs = {"budget": budget, "min_seats": min_seats, "priorities": priorities}
            set_phase('gallery')

# ==========================================
# PHASE 3: THE GALLERY (Professional)
# ==========================================
elif st.session_state.current_phase == 'gallery':
    
    if st.button("← Modify Search"): 
        set_phase('quiz')
    
    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("## Top Recommendations")
    st.markdown("Based on algorithmic scoring of your profile against live inventory.")
    st.markdown("---")
    
    df = engine.load_and_clean_data()
    prefs = st.session_state.user_prefs
    df['Match_Score'] = df.apply(lambda row: engine.calculate_score(row, prefs), axis=1)
    results = df[df['Match_Score'] > -100].sort_values(by='Match_Score', ascending=False).head(3)
    
    if results.empty:
        st.error("No matches found.")
    else:
        cols = st.columns(3)
        for i, (index, car) in enumerate(results.iterrows()):
            with cols[i]:
                # Dynamic Border Color for Ranking
                border_color = "#CC0000" if i==0 else "#e0e0e0"
                
                st.markdown(f"""
                <div class="inventory-card" style="border-top: 4px solid {border_color};">
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span style="font-weight:bold; color:#888;">RANK #{i+1}</span>
                        <span style="font-weight:bold; color:#CC0000;">{int(car['Match_Score'])}% MATCH</span>
                    </div>
                    <h3 style="margin:0;">{car['Model_Name']}</h3>
                    <p style="color:#666; font-size:0.9rem;">{car['Trim']}</p>
                    <h2 style="margin:10px 0;">${car['Price']:,}</h2>
                    <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                """, unsafe_allow_html=True)
                
                # Logic Explanations
                if 'safety' in prefs['priorities'] and str(car['BlindSpot']) == 'Yes': 
                    st.markdown("✅ **Safety Suite:** Blind Spot Info")
                if 'tech' in prefs['priorities'] and car['Screen'] >= 9: 
                    st.markdown("✅ **Tech Package:** 9\"+ Display")
                if 'speed' in prefs['priorities'] and car['HP'] > 250:
                    st.markdown("✅ **Performance:** V6 Engine")
                    
                st.markdown("</div>", unsafe_allow_html=True)