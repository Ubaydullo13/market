    const modal = document.getElementById('modal');
    const btnOpenModal = document.getElementById('btn');
    const btnCloseModal = document.getElementById('btn_close');
    const modalInfo = document.querySelector('.modal__info');
    const formAmount = document.querySelector('.amount');
    const amountInput = formAmount.querySelector('input[type="number"]');
    const products = document.querySelectorAll('.product-card');

    let totalAmount =  parseFloat(amountInput.value) || 0;

    btnOpenModal.addEventListener('click', function (event) {
      event.preventDefault();
      updateModal();
      modal.style.display = 'block';
    });

    btnCloseModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    formAmount.addEventListener('submit', function (event) {
      event.preventDefault();
      const inputAmount = formAmount.querySelector('input[type="number"]');
      totalAmount = parseFloat(inputAmount.value) || 0;
      updateModal();
    });

    products.forEach(function (product) {
      const addBtn = product.querySelector('.product-card__btn#add');
      const reduceBtn = product.querySelector('.product-card__btn#reduce');
      const numInput = product.querySelector('.product-card__num input[type="number"]');

      addBtn.addEventListener('click', function () {
        numInput.value = parseInt(numInput.value) + 1;
        updateModal();
      });

      reduceBtn.addEventListener('click', function () {
        if (numInput.value > 0) {
          numInput.value = parseInt(numInput.value) - 1;
          updateModal();
        }
      });

      numInput.addEventListener('input', function () {
        updateModal();
      });
    });

    function updateModal() {
      let totalPrice = 0;
      modalInfo.innerHTML = '';

      products.forEach(function (product) {
        const title = product.querySelector('.product-card__title').textContent;
        const numInput = product.querySelector('.product-card__num input[type="number"]');
        const priceInput = product.querySelector('.product-card__price input[type="number"]');
        const quantity = parseInt(numInput.value);
        const price = parseFloat(priceInput.value) || 0;

        const productTotal = quantity * price;
        totalPrice += productTotal;

        modalInfo.innerHTML += `<p>${title}: ${quantity} x ${price} UZS = ${productTotal} UZS</p>`;
      });

      modalInfo.innerHTML += `<p><strong>Итого: ${totalPrice} UZS</strong></p>`;

      
      if (totalPrice > totalAmount) {
        amountInput.style.backgroundColor = 'red';
        btnOpenModal.innerHTML = `ИТОГО (${totalPrice} UZS) - Сумма превышена`;
      } else {
        amountInput.style.backgroundColor = '';
        btnOpenModal.innerHTML = `ИТОГО (${totalPrice} UZS)`;
      }
    }

