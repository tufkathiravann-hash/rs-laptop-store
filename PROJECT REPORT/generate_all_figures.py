import os
from PIL import Image, ImageDraw, ImageFont

def get_fonts():
    try:
        font_title_lg = ImageFont.truetype('arialbd.ttf', 20)
        font_title = ImageFont.truetype('arialbd.ttf', 14)
        font_sub = ImageFont.truetype('arial.ttf', 12)
        font_bold = ImageFont.truetype('arialbd.ttf', 11)
        font_regular = ImageFont.truetype('arial.ttf', 11)
        font_sm_bold = ImageFont.truetype('arialbd.ttf', 10)
        font_sm = ImageFont.truetype('arial.ttf', 9)
        font_mono = ImageFont.truetype('consola.ttf', 11)
        font_mono_sm = ImageFont.truetype('consola.ttf', 9)
    except Exception:
        font_title_lg = font_title = font_sub = font_bold = font_regular = font_sm_bold = font_sm = font_mono = font_mono_sm = ImageFont.load_default()
    
    return {
        'title_lg': font_title_lg,
        'title': font_title,
        'sub': font_sub,
        'bold': font_bold,
        'regular': font_regular,
        'sm_bold': font_sm_bold,
        'sm': font_sm,
        'mono': font_mono,
        'mono_sm': font_mono_sm
    }

def create_fig_2_1(out_path):
    # VS Code Project Architecture
    w, h = 820, 420
    img = Image.new('RGB', (w, h), color='#181818')
    draw = ImageDraw.Draw(img)
    f = get_fonts()

    # Window bar
    draw.rectangle([0, 0, w, 34], fill='#252526')
    draw.ellipse([14, 11, 24, 21], fill='#ff5f56')
    draw.ellipse([30, 11, 40, 21], fill='#ffbd2e')
    draw.ellipse([46, 11, 56, 21], fill='#27c93f')
    draw.text((68, 10), 'Visual Studio Code - RS PROJECT (RS E-Commerce Architecture)', fill='#cccccc', font=f['regular'])

    # Split
    draw.rectangle([0, 34, 275, h], fill='#1e1e1e')
    draw.line([(275, 34), (275, h)], fill='#333333', width=1)
    draw.text((15, 45), 'EXPLORER: RS PROJECT', fill='#969696', font=f['bold'])

    items = [
        ('public/', '#e5c07b', 15, 70),
        ('  images/ (laptop assets)', '#abb2bf', 15, 88),
        ('src/', '#e5c07b', 15, 110),
        ('  components/ (Header, Cart, Cards)', '#61afef', 15, 128),
        ('  context/ (Cart, Auth, Wishlist)', '#61afef', 15, 146),
        ('  data/ (laptops.ts, brands.ts)', '#61afef', 15, 164),
        ('  pages/ (Home, Products, Checkout)', '#61afef', 15, 182),
        ('  types/ (product.ts, cart.ts)', '#61afef', 15, 200),
        ('  utils/ (currency.ts, storage.ts)', '#61afef', 15, 218),
        ('  App.tsx (Routing & Providers)', '#98c379', 15, 236),
        ('  main.tsx (Root bootstrap)', '#98c379', 15, 254),
        ('  index.css (Tailwind & Dark Theme)', '#e06c75', 15, 272),
        ('package.json (React 18, Vite, TS)', '#e5c07b', 15, 295),
        ('tailwind.config.js (Cyber palette)', '#61afef', 15, 313),
        ('tsconfig.json (Strict typing)', '#abb2bf', 15, 331),
        ('vite.config.ts (Fast HMR bundler)', '#61afef', 15, 349)
    ]

    for text, color, x, y in items:
        draw.text((x, y), text, fill=color, font=f['mono_sm'])

    # Right Code pane
    draw.rectangle([275, 34, w, 62], fill='#1e1e1e')
    draw.rectangle([275, 34, 410, 62], fill='#2d2d2d')
    draw.text((290, 42), 'App.tsx  x', fill='#ffffff', font=f['sm_bold'])
    draw.line([(275, 62), (w, 62)], fill='#333333', width=1)

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

    cy = 72
    for idx, (cline, ccolor) in enumerate(code_lines):
        draw.text((285, cy), str(idx+1).rjust(2), fill='#858585', font=f['mono_sm'])
        draw.text((310, cy), cline, fill=ccolor, font=f['mono_sm'])
        cy += 13

    img.save(out_path)

def create_fig_2_2(out_path):
    # Laptop Product Section (Clean Product Card Grid)
    w, h = 820, 350
    img = Image.new('RGB', (w, h), color='#0a0a0f')
    draw = ImageDraw.Draw(img)
    f = get_fonts()

    # Section title
    draw.text((30, 16), 'FLAGSHIP LAPTOP FLEET', fill='#ef4444', font=f['sm_bold'])
    draw.text((30, 34), 'High-Performance Laptop Catalog', fill='#ffffff', font=f['title_lg'])

    cards = [
        {
            'x': 30, 'y': 75, 'w': 365, 'h': 255,
            'brand': 'ASUS ROG', 'name': 'ROG Strix SCAR 18 (2024)',
            'tag': 'GAMING BEAST', 'price': 'Rs. 3,39,990', 'orig': 'Rs. 3,89,990',
            'cpu': 'CPU: Intel Core i9-14900HX (24 Cores / 32 Threads)',
            'gpu': 'GPU: NVIDIA GeForce RTX 4090 16GB (175W Max TGP)',
            'ram_ssd': 'RAM/SSD: 32GB DDR5 5600MHz | 2TB PCIe 4.0 SSD',
            'screen': 'Display: 18.0" QHD+ 240Hz Mini LED (100% DCI-P3)'
        },
        {
            'x': 425, 'y': 75, 'w': 365, 'h': 255,
            'brand': 'APPLE', 'name': 'MacBook Pro 16" M3 Max',
            'tag': 'CREATOR PRO', 'price': 'Rs. 3,99,900', 'orig': 'Rs. 4,29,900',
            'cpu': 'CPU: Apple M3 Max (16-Core CPU / 40-Core GPU)',
            'gpu': 'GPU: Hardware-Accelerated Ray Tracing & Mesh Shading',
            'ram_ssd': 'RAM/SSD: 48GB Unified Memory | 1TB Fast SSD',
            'screen': 'Display: 16.2" Liquid Retina XDR (120Hz ProMotion)'
        }
    ]

    for c in cards:
        cx, cy, cw, ch = c['x'], c['y'], c['w'], c['h']
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=8, fill='#12121a', outline='#262635', width=1)
        
        # Tag & Brand
        draw.rounded_rectangle([cx + 16, cy + 14, cx + 115, cy + 32], radius=4, fill='#2a1215', outline='#dc2626', width=1)
        draw.text((cx + 22, cy + 17), c['tag'], fill='#ef4444', font=f['sm_bold'])
        draw.text((cx + 125, cy + 17), c['brand'], fill='#888888', font=f['sm_bold'])

        # Name
        draw.text((cx + 16, cy + 40), c['name'], fill='#ffffff', font=f['title'])

        # Specs Box
        draw.rounded_rectangle([cx + 16, cy + 68, cx + cw - 16, cy + 180], radius=6, fill='#171722', outline='#1f1f2e', width=1)
        
        # Specs lines with colored bullets
        draw.ellipse([cx + 26, cy + 78, cx + 32, cy + 84], fill='#ef4444')
        draw.text((cx + 38, cy + 75), c['cpu'], fill='#d1d5db', font=f['sm'])

        draw.ellipse([cx + 26, cy + 102, cx + 32, cy + 108], fill='#3b82f6')
        draw.text((cx + 38, cy + 99), c['gpu'], fill='#d1d5db', font=f['sm'])

        draw.ellipse([cx + 26, cy + 126, cx + 32, cy + 132], fill='#10b981')
        draw.text((cx + 38, cy + 123), c['ram_ssd'], fill='#d1d5db', font=f['sm'])

        draw.ellipse([cx + 26, cy + 150, cx + 32, cy + 156], fill='#f59e0b')
        draw.text((cx + 38, cy + 147), c['screen'], fill='#d1d5db', font=f['sm'])

        # Price & Add to Cart button
        draw.text((cx + 16, cy + 195), c['price'], fill='#ef4444', font=f['title'])
        draw.text((cx + 130, cy + 200), c['orig'], fill='#666666', font=f['sm'])
        
        btn_x = cx + cw - 130
        draw.rounded_rectangle([btn_x, cy + 190, cx + cw - 16, cy + 226], radius=6, fill='#ef4444')
        draw.text((btn_x + 18, cy + 200), 'Add to Cart', fill='#ffffff', font=f['bold'])

    img.save(out_path)

def create_fig_2_3(out_path):
    # Developing Home Page (Hero Banner & Nav)
    w, h = 820, 310
    img = Image.new('RGB', (w, h), color='#07070a')
    draw = ImageDraw.Draw(img)
    f = get_fonts()

    # Top notification ribbon
    draw.rectangle([0, 0, w, 24], fill='#15151f')
    draw.text((30, 5), 'RS HARDWARE: Code RSWELCOME10 for Rs. 25,000 instant discount | Certified 2-Year VIP Warranty', fill='#a1a1aa', font=f['sm'])

    # Header Navbar
    draw.rectangle([0, 24, w, 68], fill='#0f0f17')
    draw.line([(0, 68), (w, 68)], fill='#222230', width=1)
    
    # Logo
    draw.rounded_rectangle([30, 34, 58, 58], radius=6, fill='#ef4444')
    draw.text((36, 38), 'RS', fill='#ffffff', font=f['title'])
    draw.text((68, 36), 'RS STORE', fill='#ffffff', font=f['bold'])
    draw.text((68, 50), 'TITAN COMPUTING', fill='#71717a', font=f['sm'])

    # Nav links
    navs = ['Home', 'Laptops', 'Deals', 'Compare (2)', 'About', 'Contact']
    nx = 210
    for nav in navs:
        draw.text((nx, 43), nav, fill='#e4e4e7', font=f['bold'])
        nx += 75

    # Search Bar
    draw.rounded_rectangle([620, 36, 790, 58], radius=11, fill='#181824', outline='#2d2d3d', width=1)
    draw.text((635, 41), 'Search 30+ laptops...', fill='#71717a', font=f['sm'])

    # Hero Content
    draw.rounded_rectangle([30, 80, 225, 102], radius=4, fill='#221015', outline='#ef4444', width=1)
    draw.text((40, 85), 'NEXT-GEN COMPUTING 2026', fill='#ef4444', font=f['sm_bold'])

    draw.text((30, 114), 'The Pinnacle of', fill='#ffffff', font=f['title_lg'])
    draw.text((30, 140), 'Portable Power.', fill='#ef4444', font=f['title_lg'])

    draw.text((30, 175), 'Immerse yourself in precision-engineered computing. Featuring desktop-class', fill='#9ca3af', font=f['regular'])
    draw.text((30, 193), '175W RTX 4090 graphics, Liquid Metal thermals, and OLED 240Hz displays.', fill='#9ca3af', font=f['regular'])

    # CTA Buttons
    draw.rounded_rectangle([30, 222, 175, 260], radius=6, fill='#ef4444')
    draw.text((48, 234), 'Explore Catalog ->', fill='#ffffff', font=f['bold'])

    draw.rounded_rectangle([190, 222, 320, 260], radius=6, fill='#1c1c28', outline='#3f3f50', width=1)
    draw.text((210, 234), 'Compare Rigs', fill='#ffffff', font=f['bold'])

    # Flagship Hardware preview box on right
    draw.rounded_rectangle([440, 88, 790, 275], radius=10, fill='#11111a', outline='#262635', width=1)
    draw.rounded_rectangle([455, 102, 580, 122], radius=4, fill='#1f1f2e')
    draw.text((465, 106), 'TITAN BENCHMARK #1', fill='#f59e0b', font=f['sm_bold'])
    draw.text((455, 130), 'ASUS ROG Strix SCAR 18', fill='#ffffff', font=f['title'])
    draw.text((455, 154), 'Intel i9-14900HX | 64GB DDR5 | RTX 4090', fill='#9ca3af', font=f['sm'])
    draw.text((455, 178), 'Cinebench R23 Score: 38,450 pts (Record)', fill='#10b981', font=f['sm_bold'])
    draw.text((455, 212), 'Rs. 3,39,990', fill='#ef4444', font=f['title_lg'])
    draw.text((580, 218), 'Rs. 3,89,990 (13% OFF)', fill='#666666', font=f['sm'])

    img.save(out_path)

def create_fig_2_4(out_path):
    # Laptop Brand Categories
    w, h = 820, 215
    img = Image.new('RGB', (w, h), color='#0a0a0f')
    draw = ImageDraw.Draw(img)
    f = get_fonts()

    draw.text((30, 14), 'OFFICIAL BRAND PARTNERS', fill='#ef4444', font=f['sm_bold'])
    draw.text((30, 32), 'Explore Laptops by Top Global Manufacturers', fill='#ffffff', font=f['title'])

    brands = [
        ('ASUS ROG', '12 Models', 'ROG & ZenBook', '#ef4444'),
        ('Apple', '8 Models', 'MacBook M3/M4', '#60a5fa'),
        ('Dell Alienware', '7 Models', 'XPS & Aurora', '#3b82f6'),
        ('Lenovo Legion', '9 Models', 'Legion & ThinkPad', '#10b981'),
        ('HP Omen', '6 Models', 'Omen & Spectre', '#f59e0b')
    ]

    bx = 30
    bw = 142
    for bname, bcount, bsub, bcol in brands:
        draw.rounded_rectangle([bx, 72, bx + bw, 190], radius=8, fill='#13131c', outline='#242433', width=1)
        draw.rounded_rectangle([bx + 12, 86, bx + 42, 116], radius=6, fill=bcol)
        draw.text((bx + 20, 93), bname[0], fill='#ffffff', font=f['bold'])
        draw.text((bx + 12, 126), bname, fill='#ffffff', font=f['bold'])
        draw.text((bx + 12, 146), bsub, fill='#9ca3af', font=f['sm'])
        draw.text((bx + 12, 164), bcount, fill=bcol, font=f['sm_bold'])
        bx += 156

    img.save(out_path)

def create_fig_2_5(out_path):
    # Shopping Cart with Items & Pricing Breakdown
    w, h = 820, 360
    img = Image.new('RGB', (w, h), color='#0a0a0f')
    draw = ImageDraw.Draw(img)
    f = get_fonts()

    draw.text((30, 16), 'HARDWARE CART & ALLOCATION', fill='#ef4444', font=f['sm_bold'])
    draw.text((30, 34), 'Your Configured Laptops (2 Items)', fill='#ffffff', font=f['title_lg'])

    # Left Cart Table
    draw.rounded_rectangle([30, 72, 520, 340], radius=8, fill='#12121a', outline='#222230', width=1)
    
    # Item 1
    draw.rounded_rectangle([45, 86, 505, 190], radius=6, fill='#171722', outline='#1f1f2e', width=1)
    draw.text((60, 98), 'ASUS ROG Strix SCAR 18 (2024)', fill='#ffffff', font=f['bold'])
    draw.text((60, 118), 'Config: 32GB DDR5 | 2TB Gen4 SSD | RTX 4090 16GB', fill='#9ca3af', font=f['sm'])
    draw.text((60, 138), '[Protected] VIP 2-Year Extended Protection Included', fill='#10b981', font=f['sm'])
    draw.text((60, 160), 'Rs. 3,39,990', fill='#ef4444', font=f['bold'])
    
    # Qty buttons
    draw.rounded_rectangle([380, 154, 490, 180], radius=4, fill='#222230')
    draw.text((392, 159), ' - ', fill='#ffffff', font=f['bold'])
    draw.text((430, 159), ' 1 ', fill='#ffffff', font=f['bold'])
    draw.text((468, 159), ' + ', fill='#ffffff', font=f['bold'])

    # Item 2
    draw.rounded_rectangle([45, 204, 505, 308], radius=6, fill='#171722', outline='#1f1f2e', width=1)
    draw.text((60, 216), 'Apple MacBook Pro 16" M3 Max', fill='#ffffff', font=f['bold'])
    draw.text((60, 236), 'Config: 48GB Unified RAM | 1TB SSD | Space Black', fill='#9ca3af', font=f['sm'])
    draw.text((60, 256), '[Warranty] AppleCare+ Available', fill='#60a5fa', font=f['sm'])
    draw.text((60, 278), 'Rs. 3,99,900', fill='#ef4444', font=f['bold'])
    
    draw.rounded_rectangle([380, 272, 490, 298], radius=4, fill='#222230')
    draw.text((392, 277), ' - ', fill='#ffffff', font=f['bold'])
    draw.text((430, 277), ' 1 ', fill='#ffffff', font=f['bold'])
    draw.text((468, 277), ' + ', fill='#ffffff', font=f['bold'])

    # Right Order Summary Card
    draw.rounded_rectangle([545, 72, 790, 340], radius=8, fill='#12121a', outline='#222230', width=1)
    draw.text((565, 90), 'Order Summary', fill='#ffffff', font=f['title'])
    
    summary_lines = [
        ('Subtotal (2 laptops)', 'Rs. 7,39,890'),
        ('Instant Promo Discount', '-Rs. 25,000'),
        ('Insured Express Freight', 'FREE'),
        ('GST / Taxes (18% incl.)', 'Rs. 1,09,051')
    ]
    sy = 130
    for slabel, sval in summary_lines:
        draw.text((565, sy), slabel, fill='#9ca3af', font=f['sm'])
        draw.text((700, sy), sval, fill='#ffffff' if sval != 'FREE' else '#10b981', font=f['sm_bold'])
        sy += 24

    draw.line([(565, 230), (770, 230)], fill='#2a2a3a', width=1)
    draw.text((565, 245), 'Total Amount', fill='#ffffff', font=f['bold'])
    draw.text((670, 243), 'Rs. 7,14,890', fill='#ef4444', font=f['title'])

    # Checkout Button
    draw.rounded_rectangle([565, 282, 770, 322], radius=6, fill='#ef4444')
    draw.text((595, 295), 'Proceed to Checkout ->', fill='#ffffff', font=f['bold'])

    img.save(out_path)

def create_fig_2_6(out_path):
    # Checkout Function & Payment Methods
    w, h = 820, 320
    img = Image.new('RGB', (w, h), color='#0a0a0f')
    draw = ImageDraw.Draw(img)
    f = get_fonts()

    draw.text((30, 16), 'SECURE ENCRYPTED CHECKOUT', fill='#ef4444', font=f['sm_bold'])
    draw.text((30, 34), 'Delivery Address & Payment Verification', fill='#ffffff', font=f['title_lg'])

    # Left Delivery Form
    draw.rounded_rectangle([30, 72, 460, 305], radius=8, fill='#12121a', outline='#222230', width=1)
    draw.text((50, 88), '1. Shipping & Customer Details', fill='#ffffff', font=f['bold'])

    fields = [
        ('Full Name', 'Rahul Sharma'),
        ('Email Address', 'rahul.sharma@example.com'),
        ('Phone Number', '+91 98765 43210'),
        ('Delivery Address', 'Flat 402, High-Tech Towers, Indiranagar, Bengaluru - 560038')
    ]
    fy = 114
    for flabel, fval in fields:
        draw.text((50, fy), flabel, fill='#888888', font=f['sm'])
        draw.rounded_rectangle([50, fy + 15, 440, fy + 36], radius=4, fill='#181824', outline='#2b2b3c', width=1)
        draw.text((60, fy + 20), fval, fill='#d1d5db', font=f['sm'])
        fy += 44

    # Right Payment Option Selector
    draw.rounded_rectangle([485, 72, 790, 305], radius=8, fill='#12121a', outline='#222230', width=1)
    draw.text((505, 88), '2. Select Payment Method', fill='#ffffff', font=f['bold'])

    pmethods = [
        ('[x] UPI Instant (GPay / PhonePe / Paytm)', '#10b981'),
        ('[ ] Credit / Debit Cards (Visa / MC / RuPay)', '#9ca3af'),
        ('[ ] No-Cost EMI (Up to 24 Months)', '#9ca3af'),
        ('[ ] Net Banking (All Major Indian Banks)', '#9ca3af'),
        ('[ ] Cash on Delivery (COD Serviceable)', '#9ca3af')
    ]
    py = 118
    for ptext, pcol in pmethods:
        draw.rounded_rectangle([505, py, 770, py + 24], radius=4, fill='#161622', outline='#222232', width=1)
        draw.text((515, py + 5), ptext, fill=pcol, font=f['sm_bold'])
        py += 30

    # Place Order Button
    draw.rounded_rectangle([505, 258, 770, 294], radius=6, fill='#ef4444')
    draw.text((545, 269), 'Complete Order & Pay Rs. 7,14,890 ->', fill='#ffffff', font=f['bold'])

    img.save(out_path)

def create_fig_2_7(out_path):
    # Contact and Technical Enquiry Section
    w, h = 820, 320
    img = Image.new('RGB', (w, h), color='#0a0a0f')
    draw = ImageDraw.Draw(img)
    f = get_fonts()

    draw.text((30, 16), '24/7 TECHNICAL CONCIERGE & SUPPORT', fill='#ef4444', font=f['sm_bold'])
    draw.text((30, 34), 'Direct Message to Hardware Engineering Desk', fill='#ffffff', font=f['title_lg'])

    # Form Container
    draw.rounded_rectangle([30, 72, 520, 305], radius=8, fill='#12121a', outline='#222230', width=1)
    
    # Fields
    draw.text((50, 88), 'Full Name *', fill='#888888', font=f['sm'])
    draw.rounded_rectangle([50, 104, 260, 128], radius=4, fill='#181824', outline='#2b2b3c', width=1)
    draw.text((60, 110), 'Rahul Sharma', fill='#d1d5db', font=f['sm'])

    draw.text((280, 88), 'Email Address *', fill='#888888', font=f['sm'])
    draw.rounded_rectangle([280, 104, 500, 128], radius=4, fill='#181824', outline='#2b2b3c', width=1)
    draw.text((290, 110), 'rahul@company.com', fill='#d1d5db', font=f['sm'])

    draw.text((50, 138), 'Phone Number *', fill='#888888', font=f['sm'])
    draw.rounded_rectangle([50, 154, 500, 178], radius=4, fill='#181824', outline='#2b2b3c', width=1)
    draw.text((60, 160), '+91 98765 43210', fill='#d1d5db', font=f['sm'])

    draw.text((50, 188), 'Message / Hardware Enquiry *', fill='#888888', font=f['sm'])
    draw.rounded_rectangle([50, 204, 500, 250], radius=4, fill='#181824', outline='#2b2b3c', width=1)
    draw.text((60, 212), 'Inquiring about custom 64GB DDR5 memory upgrade for ROG SCAR 18...', fill='#9ca3af', font=f['sm'])

    draw.rounded_rectangle([50, 260, 200, 292], radius=6, fill='#ef4444')
    draw.text((75, 270), 'Send Message ->', fill='#ffffff', font=f['bold'])

    # Right Info Sidebar
    draw.rounded_rectangle([545, 72, 790, 305], radius=8, fill='#12121a', outline='#222230', width=1)
    draw.text((565, 90), 'RS Experience Centers', fill='#ffffff', font=f['bold'])
    
    locs = [
        ('Bengaluru Tech Hub', '100 Feet Rd, Indiranagar\n+91 80 4912 8888'),
        ('Mumbai Flagship Lab', 'BKC Cyber City, Bandra East\n+91 22 6123 9999'),
        ('Support Hours', 'Mon - Sat: 9:00 AM - 9:00 PM\n24/7 Dedicated Discord/Email')
    ]
    ly = 118
    for ltitle, ldesc in locs:
        draw.text((565, ly), ltitle, fill='#ef4444', font=f['sm_bold'])
        for idx, line in enumerate(ldesc.split('\n')):
            draw.text((565, ly + 15 + idx * 13), line, fill='#9ca3af', font=f['sm'])
        ly += 52

    img.save(out_path)

def generate_all():
    out_dir = r'd:\RS PROJECT\PROJECT REPORT\screenshots\processed'
    os.makedirs(out_dir, exist_ok=True)
    
    create_fig_2_1(os.path.join(out_dir, 'fig_2_1_structure.png'))
    create_fig_2_2(os.path.join(out_dir, 'fig_2_2_product_section.png'))
    create_fig_2_3(os.path.join(out_dir, 'fig_2_3_homepage.png'))
    create_fig_2_4(os.path.join(out_dir, 'fig_2_4_brand_categories.png'))
    create_fig_2_5(os.path.join(out_dir, 'fig_2_5_shopping_cart.png'))
    create_fig_2_6(os.path.join(out_dir, 'fig_2_6_checkout.png'))
    create_fig_2_7(os.path.join(out_dir, 'fig_2_7_contact.png'))
    print('All 7 figures cleanly regenerated in:', out_dir)

if __name__ == '__main__':
    generate_all()
