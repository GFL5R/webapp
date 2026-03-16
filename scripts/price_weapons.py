#!/usr/bin/env python3
"""
Weapon Pricing Calculator

Calculates consistent prices for weapons based on their attributes and qualities.
Run this script to verify and update weapon prices in weapons.djson.

Usage:
    python scripts/price_weapons.py
"""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

import docstring_json

# ============================================================
# PRICING CONFIGURATION
# Adjust these values to tune the pricing formula
# ============================================================

BASE_PRICE = 500

# Attribute costs (positive = adds to price, negative = subtracts)
DAMAGE_COST = 200        # Per point of damage
DEADLINESS_COST = 150    # Per point of deadliness
THREAT_COST = -100       # Per point of threat (negative = cheaper for loud weapons)
SIGNATURE_COST = -75     # Per point of signature (negative = cheaper for hard-to-conceal)

# Quality costs (positive = adds to price, negative = subtracts)
QUALITY_COSTS = {
    "AOE": 300,          # Area of effect is powerful
    "Concealable": 150,  # Stealth advantage
    "Durable": 100,      # Reliability is valuable
    "Mobile": 100,       # Tactical flexibility
    "Stationary": -150,  # Significant limitation
    "Suppressed": 250,   # Stealth advantage (if built-in)
}

# Category modifiers (multiplier applied after base calculation)
CATEGORY_MODIFIERS = {
    "KNF": 0.75,  # Knives - 25% discount (range 0 only)
    "BLD": 0.75,  # Blades - 25% discount (range 0 only)
    "HG": 1.0,    # Handguns - base price
    "SMG": 1.0,   # Submachine guns - base price
    "SG": 1.0,    # Shotguns - base price
    "AR": 1.0,    # Assault rifles - base price
    "BR": 1.0,    # Battle rifles - base price
    "RF": 1.0,    # Rifles - base price
    "MG": 1.0,    # Machine guns - base price
}

# Round prices to nearest
PRICE_ROUNDING = 50


def calculate_price(weapon: dict) -> int:
    """Calculate the price for a weapon based on its attributes."""
    price = BASE_PRICE
    
    # Add attribute costs
    price += weapon.get("damage", 0) * DAMAGE_COST
    price += weapon.get("deadliness", 0) * DEADLINESS_COST
    price += weapon.get("threat", 0) * THREAT_COST
    price += weapon.get("signature", 0) * SIGNATURE_COST
    
    # Add quality costs
    for quality in weapon.get("qualities", []):
        price += QUALITY_COSTS.get(quality, 0)
    
    # Apply category modifier
    category = weapon.get("category", "")
    modifier = CATEGORY_MODIFIERS.get(category, 1.0)
    price = price * modifier
    
    # Round to nearest PRICE_ROUNDING
    price = round(price / PRICE_ROUNDING) * PRICE_ROUNDING
    
    return int(price)


def main():
    """Load weapons, calculate prices, and update weapons.djson."""
    weapons_path = Path(__file__).parent.parent / "data" / "weapons.djson"
    
    if not weapons_path.exists():
        print(f"Error: {weapons_path} not found")
        sys.exit(1)
    
    weapons = docstring_json.load(str(weapons_path))
    
    # Read the file as text to preserve formatting
    content = weapons_path.read_text()
    
    changes = 0
    for name, weapon in weapons.items():
        calculated = calculate_price(weapon)
        file_price = weapon.get("price", 0)
        
        if file_price != calculated:
            # Replace the price in the file
            # This is a simple string replacement - works for our format
            old_line = f'price: {file_price},'
            new_line = f'price: {calculated},'
            if old_line in content:
                content = content.replace(old_line, new_line, 1)
                changes += 1
                print(f"  {name}: {file_price} → {calculated}")
    
    if changes > 0:
        weapons_path.write_text(content)
        print(f"\n✓ Updated {changes} prices in {weapons_path}")
    else:
        print("\n✓ All prices already match the formula!")
    
    return changes


if __name__ == "__main__":
    main()
