const express = require('express');
const { createServer } = require('http');
const { paymentMiddleware } = require('x402-express');

const WALLET_ADDRESS = '0x191f418fb4E3109CD91656F05d12A19E862414A0';
const FACILITATOR_URL = 'https://facilitator.x402.rs/';

const app = express();
app.use(express.json());

app.use(paymentMiddleware(
  WALLET_ADDRESS,
  {
    'POST /note-paid': {
      price: '$0.01',
      network: 'base',
      config: {
        description: 'Pay to post a note via AI agent',
        resource: 'Note posting service'
      }
    }
  },
  { url: FACILITATOR_URL }
));

app.post('/note-paid', (req, res) => {
  const { note = "Hello" } = req.body;
  res.json({
    message: `${note} - Paid $0.01 USDC at ${new Date().toISOString()}`,
    status: 'success',
    price: '0.01 USDC'
  });
});

app.get('/health', (req, res) => {
  res.send('x402 API Running — Ready for AI Agents!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('x402 Passive Income API Running!');
  console.log(`http://localhost:${PORT}`);
  console.log('Test: curl -X POST http://localhost:${PORT}/note-paid -d "{\"note\":\"test\"}" -H "Content-Type: application/json"');
  console.log('Expected: 402 response with payment link (until paid)');

});

