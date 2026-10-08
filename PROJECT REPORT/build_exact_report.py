import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.pdfgen import canvas
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

# Numbered Canvas for exact double border and page numbers (3 to 13)
class AcademicReportCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self.pages)
        for page_idx, page in enumerate(self.pages):
            self.__dict__.update(page)
            self.draw_page_decorations(page_idx + 1)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_num):
        width, height = letter
        self.saveState()

        # Double black rectangular border
        # Outer border
        self.setStrokeColor(colors.black)
        self.setLineWidth(1.5)
        self.rect(32, 32, width - 64, height - 64)

        # Inner border
        self.setLineWidth(0.6)
        self.rect(36, 36, width - 72, height - 72)

        # Bottom Page Number: Page 1 = 3, Page 2 = 4, ... Page 11 = 13
        printed_page_num = page_num + 2
        self.setFont("Times-Roman", 11)
        self.setFillColor(colors.black)
        self.drawCentredString(width / 2.0, 46, str(printed_page_num))

        self.restoreState()

def build_pdf(filename):
    # US Letter: 8.5 x 11 inches (612 x 792 pt)
    # Margins: inside double border
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=52,
        rightMargin=52,
        topMargin=52,
        bottomMargin=62
    )

    styles = getSampleStyleSheet()

    # Custom academic styles with Times-Roman
    style_chapter = ParagraphStyle(
        'ChapterHeader',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=13,
        leading=16,
        alignment=TA_CENTER,
        spaceAfter=4
    )

    style_subchapter = ParagraphStyle(
        'DailyProgressHeader',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=12,
        leading=15,
        alignment=TA_CENTER,
        spaceAfter=14
    )

    style_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=11,
        leading=14,
        alignment=TA_LEFT,
        spaceBefore=8,
        spaceAfter=4
    )

    style_body = ParagraphStyle(
        'AcademicBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10,
        leading=13.5,
        alignment=TA_JUSTIFY,
        firstLineIndent=24,
        spaceAfter=5
    )

    style_body_no_indent = ParagraphStyle(
        'AcademicBodyNoIndent',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10,
        leading=13.5,
        alignment=TA_JUSTIFY,
        spaceAfter=5
    )

    style_bullet = ParagraphStyle(
        'AcademicBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10,
        leading=13.5,
        alignment=TA_LEFT,
        leftIndent=36,
        firstLineIndent=-12,
        spaceAfter=2
    )

    style_caption = ParagraphStyle(
        'FigCaption',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.5,
        leading=12,
        alignment=TA_CENTER,
        spaceBefore=4,
        spaceAfter=6
    )

    style_flow = ParagraphStyle(
        'FlowText',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        spaceAfter=2
    )

    style_flow_arrow = ParagraphStyle(
        'FlowArrow',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=11,
        leading=13,
        alignment=TA_CENTER,
        spaceAfter=2
    )

    story = []

    sc_dir = r'd:\RS PROJECT\PROJECT REPORT\screenshots\processed'

    # ================= PAGE 1 (Printed Page 3) =================
    story.append(Paragraph("CHAPTER - 2", style_chapter))
    story.append(Paragraph("DAILY PROGRESS", style_subchapter))

    story.append(Paragraph("2.1 Project Idea and Requirement Analysis", style_heading))
    story.append(Paragraph(
        "The primary objective of RS E-Commerce is to create a specialized, high-performance online laptop shopping platform that eliminates the complexity and friction of purchasing premium computing devices. Unlike generic retail platforms, purchasing modern laptops demands in-depth technical specifications, transparent configuration options, brand categorization, and a streamlined purchasing workflow. Requirement analysis identified key system modules including dynamic catalog browsing, multi-criteria hardware filtering (CPU, RAM, GPU, SSD), real-time cart state management, simulated order checkout, and comprehensive customer enquiry mechanisms tailored specifically for modern laptop consumers.",
        style_body
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2.2 Website Structure", style_heading))
    story.append(Paragraph(
        "The RS E-Commerce web application is designed using a modular, scalable component-driven architecture built with React 18, TypeScript, and Vite. The system maintains strict separation of concerns through dedicated modular directories: <code>/src/pages</code> for primary route views, <code>/src/components</code> for reusable UI controls, <code>/src/context</code> for global state providers (CartContext, AuthContext, WishlistContext), <code>/src/data</code> for structured catalog datasets, and <code>/src/types</code> for strict TypeScript contracts. Tailwind CSS delivers a uniform dark theme design system with responsive layouts across all screen resolutions.",
        style_body
    ))

    story.append(Spacer(1, 4))
    img1_path = os.path.join(sc_dir, 'fig_2_1_structure.png')
    if os.path.exists(img1_path):
        story.append(RLImage(img1_path, width=410, height=210))
    story.append(Paragraph("Fig:2.1 Website Structure", style_caption))
    story.append(PageBreak())

    # ================= PAGE 2 (Printed Page 4) =================
    story.append(Paragraph("2.3 Laptop Product Section", style_heading))
    story.append(Paragraph(
        "The laptop product section displays available computers in a dynamic, responsive grid layout. Products are rendered dynamically through React components mapping over typed catalog models rather than being static HTML markup. Each product card presents:",
        style_body_no_indent
    ))
    story.append(Paragraph("&bull; Laptop product image with high-resolution thumbnail", style_bullet))
    story.append(Paragraph("&bull; Laptop model name and manufacturer brand", style_bullet))
    story.append(Paragraph("&bull; Product category badge and hardware specifications", style_bullet))
    story.append(Paragraph("&bull; Current price, original price, and active discounts", style_bullet))
    story.append(Paragraph("&bull; Add to Cart button and quick wishlist toggle", style_bullet))

    story.append(Spacer(1, 4))
    img2_path = os.path.join(sc_dir, 'fig_2_2_product_section.png')
    if os.path.exists(img2_path):
        story.append(RLImage(img2_path, width=380, height=160))
    story.append(Paragraph("Fig:2.2 Laptop Product Section", style_caption))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2.4 Developing the Home Page", style_heading))
    story.append(Paragraph(
        "The Home Page serves as the central showcase and primary interactive gateway for the RS E-Commerce laptop platform. It incorporates a modern cyberpunk-inspired hero banner highlighting flagship machines, an intuitive quick-search input, manufacturer brand carousels, top promotional deals, and verified buyer reviews. Robust navigation headers enable instant routing between catalog categories, shopping cart summaries, and user account portals.",
        style_body
    ))
    story.append(PageBreak())

    # ================= PAGE 3 (Printed Page 5) =================
    img3_path = os.path.join(sc_dir, 'fig_2_3_homepage.png')
    if os.path.exists(img3_path):
        story.append(RLImage(img3_path, width=430, height=165))
    story.append(Paragraph("Fig:2.3 Developing the Home Page", style_caption))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2.5 Laptop Brand Categories", style_heading))
    story.append(Paragraph(
        "Users can filter laptops seamlessly using dedicated brand category buttons. The implemented brand categories include:",
        style_body_no_indent
    ))
    story.append(Paragraph("&bull; ASUS (ROG Strix, TUF Gaming, and ZenBook series)", style_bullet))
    story.append(Paragraph("&bull; Apple (MacBook Pro and MacBook Air M-Series)", style_bullet))
    story.append(Paragraph("&bull; Dell (Alienware and XPS performance series)", style_bullet))
    story.append(Paragraph("&bull; Lenovo (Legion gaming and ThinkPad series)", style_bullet))
    story.append(Paragraph("&bull; HP (Omen gaming and Spectre series)", style_bullet))

    story.append(Spacer(1, 4))
    img4_path = os.path.join(sc_dir, 'fig_2_4_brand_categories.png')
    if os.path.exists(img4_path):
        story.append(RLImage(img4_path, width=420, height=120))
    story.append(Paragraph("Fig:2.4 Laptop Brand Categories", style_caption))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2.6 Search Function", style_heading))
    story.append(Paragraph(
        "The real-time search functionality enables customers to instantly discover specific laptop models, processors, or hardware keywords. Whenever a user types into the search bar, React state triggers instantaneous filtering across titles, descriptions, and technical specifications, displaying matching laptop results without page reloads.",
        style_body
    ))
    story.append(PageBreak())

    # ================= PAGE 4 (Printed Page 6) =================
    story.append(Paragraph("2.7 Laptop Search and Filtering", style_heading))
    story.append(Paragraph(
        "The multi-faceted search and filtering system allows customers to refine laptop selections according to specific technical criteria. Users can filter products by manufacturer brand, price range slider, RAM capacity (16GB, 32GB, 64GB), storage size (512GB, 1TB, 2TB SSD), and primary usage category (Gaming, Workstation, Ultralight, Creator). Live counters display matching models, enabling quick comparison.",
        style_body
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2.8 Shopping Cart", style_heading))
    story.append(Paragraph(
        "The shopping cart represents a crucial interactive module of the website. Built using React Context (<code>CartContext</code>) with browser localStorage persistence, it tracks selected laptops, custom warranty add-ons, and quantities. When a customer adds an existing product, the system automatically increments the item quantity rather than creating duplicate entries, providing a smooth user experience.",
        style_body
    ))

    story.append(Spacer(1, 6))
    img5_path = os.path.join(sc_dir, 'fig_2_5_shopping_cart.png')
    if os.path.exists(img5_path):
        story.append(RLImage(img5_path, width=410, height=210))
    story.append(Paragraph("Fig:2.5 Shopping Cart", style_caption))
    story.append(PageBreak())

    # ================= PAGE 5 (Printed Page 7) =================
    story.append(Paragraph("2.9 Laptop Product Listing", style_heading))
    story.append(Paragraph(
        "The product listing page presents the comprehensive catalog of laptops with rich visuals, detailed specification badges, live stock availability, customer review ratings, and direct Add to Cart triggers. Shoppers can sort products by price, popularity, release date, and user ratings to discover laptops tailored to their performance and budget requirements.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.10 Laptop Product Details", style_heading))
    story.append(Paragraph(
        "The product details page delivers an exhaustive technical overview of each laptop model. It incorporates high-resolution multi-angle image galleries, detailed hardware specification tables (display refresh rates, GPU TGP wattage, thermal cooling architecture, port selection), warranty packages, customer reviews, and immediate Add to Cart or Buy Now purchasing options.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.11 Wishlist", style_heading))
    story.append(Paragraph(
        "The Wishlist allows customers to bookmark desired laptops for later review and purchase. Shoppers can save premium configurations without immediately adding them to their active shopping cart. Customers can revisit their saved wishlist anytime and effortlessly transfer selected laptops into the cart when ready to purchase.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.12 User Registration and Login", style_heading))
    story.append(Paragraph(
        "RS E-Commerce provides a streamlined authentication module for customer accounts. Users can register and sign in using basic profile credentials including full name, email address, contact phone number, and password. Authenticated customers gain access to personalized order history, saved shipping addresses, and persistent cart synchronisation across browsing sessions.",
        style_body
    ))
    story.append(PageBreak())

    # ================= PAGE 6 (Printed Page 8) =================
    story.append(Paragraph("2.13 Quantity Management", style_heading))
    story.append(Paragraph(
        "Users can easily adjust the quantity of laptops directly within the shopping cart drawer and cart page using intuitive <b>+</b> and <b>-</b> buttons.",
        style_body_no_indent
    ))
    story.append(Paragraph("For example:", style_body_no_indent))
    story.append(Paragraph("Product quantity: 1", style_bullet))
    story.append(Paragraph("Clicking <b>+</b> changes it to:", style_body_no_indent))
    story.append(Paragraph("Product quantity: 2", style_bullet))
    story.append(Paragraph("Clicking <b>-</b> decreases it again.", style_body_no_indent))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.14 Payment Options", style_heading))
    story.append(Paragraph(
        "RS E-Commerce is structured to support flexible and secure payment methods. Supported checkout options include Credit Cards, Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking across major banks, No-Cost EMI financing options for high-value laptops, and Cash on Delivery (COD) for supported delivery zones. The checkout simulation verifies all transaction fields cleanly.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.15 Order Confirmation", style_heading))
    story.append(Paragraph(
        "Upon successfully completing the checkout flow, customers receive an immediate order confirmation summary. The confirmation screen presents a unique order ID, purchased laptop models, billing breakdown, shipping address, chosen payment method, and estimated delivery timeline, with options to download an invoice or track order progress.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.16 Order Tracking", style_heading))
    story.append(Paragraph(
        "The order tracking module allows buyers to monitor shipment milestones from processing to doorstep delivery. Tracking stages include Order Confirmed, Quality Inspection, Dispatched, In Transit, Out for Delivery, and Delivered. A transparent tracking timeline establishes buyer confidence and reduces customer support inquiries.",
        style_body
    ))
    story.append(PageBreak())

    # ================= PAGE 7 (Printed Page 9) =================
    story.append(Paragraph("2.17 Delivery Service", style_heading))
    story.append(Paragraph(
        "Reliable logistics and secure transit are essential when purchasing premium laptops. RS E-Commerce integrates automated pincode verification, insured courier handling, and scheduled delivery timeframes. Laptops are dispatched in shock-resistant packaging with delivery tracking numbers to ensure safe and timely arrival.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.18 Cart Total Calculation", style_heading))
    story.append(Paragraph("The website automatically calculates the total price dynamically.", style_body_no_indent))
    story.append(Paragraph("The calculation used is:", style_body_no_indent))
    story.append(Paragraph("<b>Total = Product Price &times; Quantity</b>", style_bullet))
    story.append(Paragraph("For multiple products:", style_body_no_indent))
    story.append(Paragraph("<b>Cart Total = &Sigma; (Product Price &times; Quantity)</b>", style_bullet))
    story.append(Paragraph("The total is dynamically updated whenever:", style_body_no_indent))
    story.append(Paragraph("&bull; A product is added", style_bullet))
    story.append(Paragraph("&bull; Product quantity is changed", style_bullet))
    story.append(Paragraph("&bull; A product is removed", style_bullet))
    story.append(Paragraph("Prices are formatted using the Indian numbering system through:", style_body_no_indent))
    story.append(Paragraph("<b>toLocaleString(\"en-IN\")</b>", style_bullet))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.19 Checkout Function", style_heading))
    story.append(Paragraph(
        "The website includes a comprehensive checkout button. When the user clicks Proceed to Checkout, JavaScript validates whether the cart contains items. If products are available, the website navigates to the checkout interface for shipping address entry, order review, and payment option selection.",
        style_body
    ))
    story.append(PageBreak())

    # ================= PAGE 8 (Printed Page 10) =================
    img6_path = os.path.join(sc_dir, 'fig_2_6_checkout.png')
    if os.path.exists(img6_path):
        story.append(RLImage(img6_path, width=410, height=165))
    story.append(Paragraph("Fig:2.6 Checkout Function", style_caption))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2.20 Contact and Enquiry Section", style_heading))
    story.append(Paragraph(
        "The website features a dedicated Contact Us and technical enquiry section. The form includes:",
        style_body_no_indent
    ))
    story.append(Paragraph("&bull; Name", style_bullet))
    story.append(Paragraph("&bull; Email", style_bullet))
    story.append(Paragraph("&bull; Phone number", style_bullet))
    story.append(Paragraph("&bull; Message / Technical Enquiry", style_bullet))
    story.append(Paragraph("&bull; Contact button", style_bullet))

    story.append(Spacer(1, 4))
    img7_path = os.path.join(sc_dir, 'fig_2_7_contact.png')
    if os.path.exists(img7_path):
        story.append(RLImage(img7_path, width=410, height=170))
    story.append(Paragraph("Fig:2.7 Contact and Enquiry Section", style_caption))
    story.append(PageBreak())

    # ================= PAGE 9 (Printed Page 11) =================
    story.append(Paragraph("2.21 Customer Reviews and Ratings", style_heading))
    story.append(Paragraph(
        "Customer reviews and star ratings help prospective buyers make confident decisions. Buyers can submit verified feedback regarding build quality, battery endurance, thermal performance, and overall satisfaction. RS E-Commerce displays average ratings and verified reviews on product pages to foster community trust.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.22 Special Offers and Discounts", style_heading))
    story.append(Paragraph(
        "Special offers and promotional campaigns are effective methods for boosting user engagement and conversions. RS E-Commerce provides discounts during seasonal events, festivals, tech expos, and product launches:",
        style_body_no_indent
    ))
    story.append(Paragraph("&bull; Flat percentage discounts on select laptop brands", style_bullet))
    story.append(Paragraph("&bull; Bundle deals with gaming accessories and warranties", style_bullet))
    story.append(Paragraph("&bull; Free express delivery on prepaid orders", style_bullet))
    story.append(Paragraph("&bull; First-order student discount coupons", style_bullet))
    story.append(Paragraph("&bull; Brand-specific clearance discounts", style_bullet))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.23 Promotional Laptop Deals", style_heading))
    story.append(Paragraph(
        "The Deals section showcases limited-time offers featuring substantial price markdowns on top-tier gaming and workstation laptops. Real-time discount tags and promotional countdown timers create purchasing urgency and encourage immediate checkout.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("2.24 New Laptop Arrivals", style_heading))
    story.append(Paragraph(
        "The New Arrivals section highlights newly released laptop models equipped with next-generation processors and dedicated GPUs. Customers can easily discover the latest hardware innovations with detailed launch specifications and direct purchase options.",
        style_body
    ))
    story.append(PageBreak())

    # ================= PAGE 10 (Printed Page 12) =================
    story.append(Paragraph("2.25 Best Selling Laptops", style_heading))
    story.append(Paragraph(
        "The Best Sellers section highlights the most popular and highly rated laptop models based on sales volume, customer reviews, and benchmark reliability. Featuring verified customer favorites helps new shoppers identify dependable models across gaming, creator, and productivity categories.",
        style_body
    ))

    story.append(Spacer(1, 5))
    story.append(Paragraph("2.26 Responsive Web Design", style_heading))
    story.append(Paragraph(
        "RS E-Commerce is developed with a mobile-first, responsive architecture built with Tailwind CSS. The user interface seamlessly adapts across mobile phones, tablets, laptops, and ultra-wide desktop monitors, featuring touch-friendly buttons, adaptive product grids, and smooth drawer navigation menus.",
        style_body
    ))

    story.append(Spacer(1, 5))
    story.append(Paragraph("2.27 Customer Support", style_heading))
    story.append(Paragraph(
        "RS E-Commerce delivers comprehensive customer support covering technical specifications, order status, warranty coverage, and return queries. Support channels include hardware FAQs, email ticketing, and direct enquiry forms, ensuring prompt assistance and customer retention.",
        style_body
    ))

    story.append(Spacer(1, 5))
    story.append(Paragraph("2.28 Working Flow of the Website", style_heading))
    story.append(Paragraph("The general workflow is:", style_body_no_indent))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Open Website", style_flow))
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("Display Products", style_flow))
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("Search or Filter Products", style_flow))
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("Select Product", style_flow))
    story.append(PageBreak())

    # ================= PAGE 11 (Printed Page 13) =================
    # Continuation of 2.28 flow at top without repeating heading
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("Add to Cart", style_flow))
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("View Cart", style_flow))
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("Change Quantity / Remove Product", style_flow))
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("Calculate Total", style_flow))
    story.append(Paragraph("&darr;", style_flow_arrow))
    story.append(Paragraph("Display Checkout Message", style_flow))

    story.append(Spacer(1, 14))
    story.append(Paragraph("2.29 Marketing and Customer Engagement", style_heading))
    story.append(Paragraph(
        "RS E-Commerce utilizes digital marketing and customer engagement strategies to attract tech enthusiasts and maintain strong relationships with existing buyers. Marketing initiatives include social media campaigns, promotional banners, seasonal discount coupons, hardware comparison guides, and loyalty reward programs for repeat customers.",
        style_body
    ))

    story.append(Spacer(1, 12))
    story.append(Paragraph("2.30 Future Development", style_heading))
    story.append(Paragraph(
        "RS E-Commerce can be expanded with advanced future enhancements such as AI-powered laptop recommendation wizards, 3D interactive model previewers, native mobile applications for iOS and Android, automated live chat assistance, genuine payment gateway integrations (Razorpay/Stripe), multi-currency support, and enterprise B2B bulk procurement portals.",
        style_body
    ))

    doc.build(story, canvasmaker=AcademicReportCanvas)
    print("PDF build complete:", filename)

if __name__ == '__main__':
    out_pdf = r'd:\RS PROJECT\PROJECT REPORT\RS_ECommerce_Daily_Progress_Report.pdf'
    build_pdf(out_pdf)
