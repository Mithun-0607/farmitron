import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

def create_synthetic_crop_data():
    """Generates realistic agricultural dataset for 22 crop species based on ICAR & FAO soil-climate specs."""
    crops_config = [
        # crop, N_mean, P_mean, K_mean, temp_mean, hum_mean, ph_mean, rain_mean
        ("rice", 90, 42, 43, 23.6, 82.0, 6.4, 236.0),
        ("maize", 78, 48, 20, 22.3, 65.0, 6.2, 85.0),
        ("chickpea", 40, 68, 80, 18.9, 16.8, 7.3, 80.0),
        ("kidneybeans", 20, 67, 20, 20.1, 21.6, 5.7, 105.0),
        ("pigeonpeas", 20, 68, 20, 27.7, 48.0, 5.8, 149.0),
        ("mothbeans", 20, 48, 20, 28.2, 53.0, 6.8, 51.0),
        ("mungbean", 20, 48, 20, 28.5, 85.0, 6.7, 48.0),
        ("blackgram", 40, 68, 20, 29.9, 65.0, 7.1, 67.0),
        ("lentil", 20, 68, 20, 24.5, 64.0, 6.9, 45.0),
        ("pomegranate", 20, 18, 40, 21.8, 90.0, 6.4, 107.0),
        ("banana", 100, 82, 50, 27.3, 80.0, 6.0, 104.0),
        ("mango", 20, 28, 30, 31.2, 50.0, 5.7, 94.0),
        ("grapes", 23, 132, 200, 23.8, 81.0, 6.0, 69.0),
        ("watermelon", 99, 17, 50, 25.5, 85.0, 6.5, 50.0),
        ("muskmelon", 100, 17, 50, 28.6, 92.0, 6.3, 24.0),
        ("apple", 20, 134, 199, 22.6, 92.0, 5.9, 112.0),
        ("orange", 20, 16, 10, 22.8, 92.0, 7.0, 110.0),
        ("papaya", 50, 59, 50, 33.7, 92.0, 6.7, 142.0),
        ("coconut", 22, 17, 30, 27.4, 94.0, 5.9, 175.0),
        ("cotton", 117, 46, 19, 23.9, 79.0, 6.9, 80.0),
        ("jute", 78, 46, 40, 24.9, 79.0, 6.7, 174.0),
        ("coffee", 101, 28, 30, 25.5, 58.0, 6.7, 158.0),
    ]

    data = []
    np.random.seed(42)
    for crop, n_m, p_m, k_m, t_m, h_m, ph_m, r_m in crops_config:
        for _ in range(100): # 100 samples per crop = 2200 total samples
            n = max(0, int(np.random.normal(n_m, 12)))
            p = max(5, int(np.random.normal(p_m, 10)))
            k = max(5, int(np.random.normal(k_m, 12)))
            t = round(float(np.random.normal(t_m, 2.5)), 1)
            h = round(float(np.clip(np.random.normal(h_m, 5.0), 10, 100)), 1)
            ph = round(float(np.clip(np.random.normal(ph_m, 0.4), 4.0, 9.5)), 2)
            r = round(float(max(10, np.random.normal(r_m, 25.0))), 1)

            data.append([n, p, k, t, h, ph, r, crop])

    df = pd.DataFrame(data, columns=["N", "P", "K", "temperature", "humidity", "ph", "rainfall", "label"])
    return df

def train_and_save_model():
    print("Generating agricultural crop recommendation dataset...")
    df = create_synthetic_crop_data()

    X = df[["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]]
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training RandomForestClassifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    print(f"Model Accuracy: {acc * 100:.2f}%")

    # Ensure models directory exists
    base_dir = os.path.dirname(os.path.abspath(__file__))
    models_dir = os.path.join(base_dir, "models")
    os.makedirs(models_dir, exist_ok=True)

    model_path = os.path.join(models_dir, "farmitron_crop_model.pkl")
    joblib.dump(model, model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == "__main__":
    train_and_save_model()
