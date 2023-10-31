const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get('/todos', async (req, res) => {
  res.send({
      id: 1,
      title: "Berenang"
  });
});

app.post('/api/v1/get-link', async (req, res) => {
  const { total_price, name, server_key_midtrans } = req.body;
  const serverKeyMidtrans = server_key_midtrans;

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKeyMidtrans,
  });

  const timestamp = new Date().getTime();
  const orderId = `order_${timestamp}`;
  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: total_price,
    },
    customer_details: {
      first_name: name,
    },
  };
  try {
    const midTransData = await snap.createTransaction(parameter);
    const response = {
      status: 'success',
      data: {
        redirect_url: midTransData.redirect_url,
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    if (error.httpStatusCode === 400) {
      return res.status(error.httpStatusCode).json({
        status: 'failed',
        message: error.ApiResponse.error_messages
      });
    }
    return res.status(500).json({
      status: 'failed',
      message: 'Server failed',
      error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
