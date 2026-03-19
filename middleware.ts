import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}
```

**⌘+S** saxlayın, sonra terminala yazın:
```
git add middleware.ts
git commit -m "fix middleware export"
git push origin main