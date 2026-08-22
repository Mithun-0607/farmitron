"""
FARMiTRON Weather Forecasting Model Trainer
Trains a RandomForestRegressor to predict tomorrow's mean temperature
using the same feature engineering pipeline as the Google Colab notebook.
"""

import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEATHER_MODEL_PATH = os.path.join(BASE_DIR, "models", "weather_model.pkl")


def generate_weather_dataset(n_years=5):
    """Generate realistic synthetic daily weather data for North India (Delhi/Punjab climate)."""
    np.random.seed(42)
    n_days = n_years * 365

    dates = pd.date_range(start="2019-01-01", periods=n_days, freq="D")

    day_of_year = dates.dayofyear
    month = dates.month

    # Realistic seasonal temperature curve (North India)
    seasonal_temp = (
        20
        + 15 * np.sin((day_of_year - 80) * 2 * np.pi / 365)
        + np.random.normal(0, 2.5, n_days)
    )

    # Humidity: inversely related to temperature, peaks in monsoon (Jul-Sep)
    monsoon_mask = np.array((month >= 7) & (month <= 9))
    humidity = 60 + 20 * np.cos((day_of_year - 180) * 2 * np.pi / 365) + np.random.normal(0, 8, n_days)
    humidity = np.array(humidity, dtype=float)
    humidity[monsoon_mask] += 15
    humidity = np.clip(humidity, 15, 95)

    # Wind speed (km/h)
    wind_speed = 8 + 5 * np.sin(day_of_year * 2 * np.pi / 365) + np.random.exponential(2, n_days)
    wind_speed = np.clip(wind_speed, 0.5, 40)

    # Atmospheric pressure (hPa)
    meanpressure = 1013 + 4 * np.sin((day_of_year - 30) * 2 * np.pi / 365) + np.random.normal(0, 1.5, n_days)

    df = pd.DataFrame({
        "date": dates,
        "meantemp": seasonal_temp,
        "humidity": humidity,
        "wind_speed": wind_speed,
        "meanpressure": meanpressure,
        "month": month,
        "day_of_year": day_of_year,
    })

    # Feature engineering: 1-day lag features
    df["temp_lag1"] = df["meantemp"].shift(1)
    df["humidity_lag1"] = df["humidity"].shift(1)
    df["wind_lag1"] = df["wind_speed"].shift(1)
    df["pressure_lag1"] = df["meanpressure"].shift(1)

    # Feature engineering: 3-day rolling averages
    df["temp_avg3"] = df["meantemp"].rolling(3).mean()
    df["humidity_avg3"] = df["humidity"].rolling(3).mean()
    df["wind_avg3"] = df["wind_speed"].rolling(3).mean()

    # Target: next day's temperature
    df["target_temp_next"] = df["meantemp"].shift(-1)

    # Drop rows with NaN (from lag/rolling/shift)
    df = df.dropna().reset_index(drop=True)

    return df


FEATURE_COLUMNS = [
    "meantemp", "humidity", "wind_speed", "meanpressure",
    "temp_lag1", "humidity_lag1", "wind_lag1", "pressure_lag1",
    "temp_avg3", "humidity_avg3", "wind_avg3",
    "month", "day_of_year"
]


def train_and_save_weather_model():
    """Train RandomForestRegressor for weather forecasting and save to disk."""
    print("🌦️  Generating FARMiTRON weather dataset (5 years)...")
    df = generate_weather_dataset(n_years=5)

    X = df[FEATURE_COLUMNS].values
    y = df["target_temp_next"].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("🌲  Training RandomForestRegressor (n_estimators=300)...")
    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=12,
        min_samples_split=4,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"✅  Test MAE: {mae:.2f}°C | R²: {r2:.4f}")

    os.makedirs(os.path.dirname(WEATHER_MODEL_PATH), exist_ok=True)
    joblib.dump(model, WEATHER_MODEL_PATH)
    print(f"💾  Model saved to: {WEATHER_MODEL_PATH}")
    return model


if __name__ == "__main__":
    train_and_save_weather_model()
