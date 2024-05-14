type AuthCache = {
  credentials: string | null
  expiresAt: number | null
}

const cache: AuthCache = {
  credentials: null,
  expiresAt: null,
}

const getClientCredentials = () => ({
  client_id: import.meta.env.PUBLIC_CLIENT_ID,
  grant_type: "client_credentials",
  scope: import.meta.env.PUBLIC_SCOPE,
})

const fetchCredentials = async () => {
  const response = await fetch("https://auth.commercelayer.io/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getClientCredentials()),
  })

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }

  const data = await response.json()
  cache.credentials = data.access_token
  cache.expiresAt = Date.now() + data.expires_in * 1000 - 60000 // Subtracting 60 seconds to account for potential delays
  return cache.credentials
}

const getCachedCredentials = async () => {
  if (cache.credentials && cache.expiresAt && Date.now() < cache.expiresAt) {
    return cache.credentials
  }
  return fetchCredentials()
}

export { getCachedCredentials }