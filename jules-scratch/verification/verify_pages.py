import os
import time
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Get the absolute path to the HTML files
    base_path = os.path.abspath('.')

    def take_screenshots(page, name):
        # Light mode
        page.wait_for_timeout(500) # wait for animations
        page.screenshot(path=f"jules-scratch/verification/{name}-light.png")

        # Switch to dark mode
        theme_toggle = page.locator('.theme-switch')
        theme_toggle.click()
        page.wait_for_timeout(500) # wait for animations
        page.screenshot(path=f"jules-scratch/verification/{name}-dark.png")


    # 1. Home Page
    page.goto(f"file://{base_path}/home.html")
    take_screenshots(page, "home")

    # 2. About Page
    page.goto(f"file://{base_path}/about.html")
    take_screenshots(page, "about")

    # 3. Portfolio Page
    page.goto(f"file://{base_path}/portfolio.html")
    take_screenshots(page, "portfolio")

    # 4. Services Page
    page.goto(f"file://{base_path}/services.html")
    take_screenshots(page, "services")

    # 5. Contact Page
    page.goto(f"file://{base_path}/contact.html")
    take_screenshots(page, "contact")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
