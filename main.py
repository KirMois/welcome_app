import os
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins="*")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv('BOT_TOKEN', '')
LEAD_CHAT_ID = 675015988  # @yatakoikirill


def build_message(data: dict) -> str:
    name = data.get('name', 'N/A')
    username = data.get('username', 'N/A').lstrip('@')
    email = (data.get('email') or '').strip()
    services_raw = data.get('services', [])
    services = ', '.join(services_raw) if isinstance(services_raw, list) else str(services_raw)
    budget = data.get('budget', 'N/A')
    description = data.get('description', 'N/A')
    ts = data.get('timestamp', datetime.utcnow().isoformat())
    try:
        dt = datetime.fromisoformat(ts.replace('Z', '+00:00'))
        ts_fmt = dt.strftime('%d.%m.%Y %H:%M')
    except Exception:
        ts_fmt = ts

    email_line = f"📧 Email: {email}\n" if email else ""

    return (
        f"🆕 НОВАЯ ЗАЯВКА Novacode VLC\n\n"
        f"👤 Имя: {name}\n"
        f"🆔 Telegram: @{username}\n"
        f"{email_line}"
        f"🎯 Услуги: {services}\n"
        f"💰 Бюджет: {budget}\n"
        f"📝 Задача: {description}\n\n"
        f"⏰ {ts_fmt}"
    )


@app.route('/api/send-lead', methods=['POST'])
def send_lead():
    if not BOT_TOKEN:
        logger.error('BOT_TOKEN is not set')
        return jsonify({'success': False, 'error': 'BOT_TOKEN not configured'}), 500

    data = request.get_json(force=True, silent=True) or {}
    logger.info('New lead: name=%s tg=@%s budget=%s services=%s',
                data.get('name'), data.get('username'), data.get('budget'), data.get('services'))

    message = build_message(data)
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    try:
        resp = requests.post(url, json={
            'chat_id': LEAD_CHAT_ID,
            'text': message,
            'parse_mode': 'HTML',
        }, timeout=10)
        resp.raise_for_status()
        tg_data = resp.json()
        if not tg_data.get('ok'):
            logger.error('Telegram error: %s', tg_data)
            return jsonify({'success': False, 'error': tg_data.get('description')}), 502
        logger.info('Lead sent successfully → chat_id %s', LEAD_CHAT_ID)
        return jsonify({'success': True})
    except requests.RequestException as e:
        logger.error('Request error: %s', e)
        return jsonify({'success': False, 'error': str(e)}), 502


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'bot_configured': bool(BOT_TOKEN)})


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', '1') == '1'
    logger.info('Starting backend on port %s (debug=%s)', port, debug)
    logger.info('Lead target: chat_id=%s', LEAD_CHAT_ID)
    app.run(host='0.0.0.0', port=port, debug=debug)
