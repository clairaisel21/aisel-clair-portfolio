export async function onRequestPost({ request }) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const honeypot = formData.get('honeypot');

    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Honeypot spam protection
    if (honeypot && honeypot !== "") {
      return Response.redirect("/?success=true", 302);
    }

    console.log(`New message from ${name} (${email}): ${message}`);

    // For now it just shows success. 
    // Later we can connect real email sending.
    return Response.redirect("/?success=true", 302);

  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }
}
