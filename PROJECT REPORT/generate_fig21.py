import os
from PIL import Image, ImageDraw, ImageFont

def generate_structure_image():
    width, height = 800, 430
    img = Image.new('RGB', (width, height), color='#1e1e1e')
    draw = ImageDraw.Draw(img)

    # Window header
    draw.rectangle([0, 0, width, 36], fill='#252526')
    draw.ellipse([14, 12, 24, 22], fill='#ff5f56')
    draw.ellipse([30, 12, 40, 22], fill='#ffbd2e')
    draw.ellipse([46, 12, 56, 22], fill='#27c93f')

    # Sidebar & Editor split
    draw.rectangle([0, 36, 270, height], fill='#181818')
    draw.line([(270, 36), (270, height)], fill='#2d2d2d', width=1)

    try:
        font_bold = ImageFont.truetype('arialbd.ttf', 13)
        font_regular = ImageFont.truetype('consola.ttf', 12)
        font_title = ImageFont.truetype('arial.ttf', 12)
        font_code = ImageFont.truetype('consola.ttf', 11)
    except Exception:
        font_bold = font_regular = font_title = font_code = ImageFont.load_default()

    draw.text((68, 11), 'Visual Studio Code - RS PROJECT (RS E-Commerce Laptop Website)', fill='#cccccc', font=font_title)
    draw.text((15, 48), 'EXPLORER: RS PROJECT', fill='#969696', font=font_bold)

    items = [
        ('public/', '#e5c07b', 15, 75),
        ('  images/ (laptop assets)', '#abb2bf', 15, 93),
        ('src/', '#e5c07b', 15, 115),
        ('  components/ (Header, Cart, Cards)', '#61afef', 15, 133),
        ('  context/ (Cart, Auth, Wishlist)', '#61afef', 15, 151),
        ('  data/ (laptops.ts, brands.ts)', '#61afef', 15, 169),
        ('  pages/ (Home, Products, Checkout)', '#61afef', 15, 187),
        ('  types/ (product.ts, cart.ts)', '#61afef', 15, 205),
        ('  utils/ (currency.ts, storage.ts)', '#61afef', 15, 223),
        ('  App.tsx (Routing & Providers)', '#98c379', 15, 241),
        ('  main.tsx (Root bootstrap)', '#98c379', 15, 259),
        ('  index.css (Tailwind & Dark Theme)', '#e06c75', 15, 277),
        ('package.json (React 18, Vite, TS)', '#e5c07b', 15, 300),
        ('tailwind.config.js (Cyber palette)', '#61afef', 15, 318),
        ('tsconfig.json (Strict typing)', '#abb2bf', 15, 336),
        ('vite.config.ts (Fast HMR bundler)', '#61afef', 15, 354)
    ]

    for text, color, x, y in items:
        draw.text((x, y), text, fill=color, font=font_regular)

    # Right pane: Active code preview
    draw.rectangle([270, 36, width, 68], fill='#1e1e1e')
    draw.rectangle([270, 36, 400, 68], fill='#2d2d2d')
    draw.text((285, 46), 'App.tsx  x', fill='#ffffff', font=font_title)
    draw.line([(270, 68), (width, 68)], fill='#2d2d2d', width=1)

    code_lines = [
        ('// RS E-Commerce - Root Architecture & Dynamic Routes', '#6a9955'),
        ('import React from "react";', '#c586c0'),
        ('import { BrowserRouter as Router, Routes, Route } from "react-router-dom";', '#c586c0'),
        ('import { CartProvider } from "./context/CartContext";', '#9cdcfe'),
        ('import { AuthProvider } from "./context/AuthContext";', '#9cdcfe'),
        ('import { HomePage } from "./pages/HomePage";', '#4ec9b0'),
        ('import { ProductsPage } from "./pages/ProductsPage";', '#4ec9b0'),
        ('import { ProductDetailPage } from "./pages/ProductDetailPage";', '#4ec9b0'),
        ('import { CartPage } from "./pages/CartPage";', '#4ec9b0'),
        ('import { CheckoutPage } from "./pages/CheckoutPage";', '#4ec9b0'),
        ('', '#d4d4d4'),
        ('export function App() {', '#569cd6'),
        ('  return (', '#d4d4d4'),
        ('    <CartProvider>', '#4ec9b0'),
        ('      <Router>', '#4ec9b0'),
        ('        <Routes>', '#4ec9b0'),
        ('          <Route path="/" element={<HomePage />} />', '#d4d4d4'),
        ('          <Route path="/laptops" element={<ProductsPage />} />', '#d4d4d4'),
        ('          <Route path="/product/:id" element={<ProductDetailPage />} />', '#d4d4d4'),
        ('          <Route path="/cart" element={<CartPage />} />', '#d4d4d4'),
        ('          <Route path="/checkout" element={<CheckoutPage />} />', '#d4d4d4'),
        ('        </Routes>', '#4ec9b0'),
        ('      </Router>', '#4ec9b0'),
        ('    </CartProvider>', '#4ec9b0'),
        ('  );', '#d4d4d4'),
        ('}', '#569cd6')
    ]

    cy = 78
    for idx, (cline, ccolor) in enumerate(code_lines):
        draw.text((285, cy), str(idx+1).rjust(2), fill='#858585', font=font_code)
        draw.text((315, cy), cline, fill=ccolor, font=font_code)
        cy += 13

    out_dir = r'd:\RS PROJECT\PROJECT REPORT\screenshots'
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'fig_2_1_structure.png')
    img.save(out_path)
    print('Generated:', out_path)

if __name__ == '__main__':
    generate_structure_image()
