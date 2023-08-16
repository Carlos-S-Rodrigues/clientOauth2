 function renderPayPalButton() {
      paypal.Buttons({
      createOrder: function(data, actions) {
                return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: '29.99',
            }
          }]
        });
      },
      onApprove: async function(data, actions) {
                const captureResponse = await capturePayment(data.orderID); // Implement this function
        if (captureResponse.success) {
          displayThankYouMessage(captureResponse.transactionId);
        } else {
          handleCaptureFailure()
        }
      }
    }).render('#paypal-button-container');
  }

  function handleCaptureFailure() {
    alert('Payment capture failed. Please try again later.');
  }
  
  renderPayPalButton();
  
  function displayThankYouMessage(transactionId) {
    const thankYouDiv = document.getElementById('thank-you');
    const transactionIdSpan = document.getElementById('transactionId');
    
    transactionIdSpan.textContent = transactionId;
    thankYouDiv.style.display = 'block';
  }
  
  async function capturePayment(orderId) {
    try {
      const response = await axios.post('/capture-payment', { orderId });
      return { success: true, transactionId: response.data.transactionId };
    } catch (error) {
      console.error('Error capturing payment:', error);
      return { success: false };
    }
  }  

  