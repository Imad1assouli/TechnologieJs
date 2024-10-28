document.getElementById("bookForm")?.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const book = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    pages: parseInt(document.getElementById('pages').value),
    status: document.getElementById('status').value,
    price: parseFloat(document.getElementById('price').value),
    pagesRead: parseInt(document.getElementById('pagesRead').value) || 0,
    format: document.getElementById('format').value,
    suggestedBy: document.getElementById('suggestedBy').value,
    finished: false
  };

  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });

  if (response.ok) {
    // Optionally reset the form
    document.getElementById("bookForm").reset();
    loadBooks(); // Refresh the book list
  } else {
    const error = await response.json();
    alert(`Error: ${error.message || 'Failed to add book'}`);
  }
});

async function loadBooks() {
  try {
    const res = await fetch('/api/books');
    if (!res.ok) throw new Error('Failed to fetch books');

    const books = await res.json();
    const bookTableBody = document.getElementById('bookTableBody');
    if (bookTableBody) {
      bookTableBody.innerHTML = books.map(book => `
        <tr>
          <td class="py-2 px-4 border">${book.title}</td>
          <td class="py-2 px-4 border">${book.author}</td>
          <td class="py-2 px-4 border">${book.pages}</td>
          <td class="py-2 px-4 border">${book.pagesRead}</td>
          <td class="py-2 px-4 border">$${book.price.toFixed(2)}</td>
          <td class="py-2 px-4 border">${book.suggestedBy}</td>
          <td class="py-2 px-4 border">${book.status}</td>
          <td class="py-2 px-4 border">${book.format}</td>
          <td class="py-2 px-4 border">
            <button class="text-red-500" onclick="removeBook('${book._id}')">Remove</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Function to remove a book
async function removeBook(id) {
  const confirmation = confirm("Are you sure you want to remove this book?");
  if (!confirmation) return;

  await fetch(`/api/books/${id}`, { method: 'DELETE' });
  loadBooks();
}

// Initial load
loadBooks();
