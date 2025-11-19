# Section 02: Project Test List

**Last Updated:** 2025-01-19

This section contains testing checklists to verify our implementations. After completing any task from Section 01, use these checklists to ensure what we built actually works.

---

## Testing Philosophy

**Every implementation must be tested before it's considered complete.**

Testing ensures:
1. Features work as intended
2. No regressions introduced
3. Edge cases handled
4. User experience is smooth
5. Errors are handled gracefully

---

## Manual Testing Checklists

### Authentication Tests

#### Google OAuth
- [ ] Click "Sign in with Google" redirects to Google
- [ ] Successful auth redirects back to app
- [ ] User session is created
- [ ] User data appears in dashboard
- [ ] Sign out clears session
- [ ] Protected routes redirect to sign-in

#### Wallet Authentication
- [ ] MetaMask connection prompt appears
- [ ] Successful connection shows address
- [ ] Wallet disconnect works
- [ ] Wrong network shows warning
- [ ] Transaction signing works

---

### Document Management Tests

#### Create Document
- [ ] Click "New Document" opens dialog
- [ ] Select document type (text/whiteboard)
- [ ] Enter document name
- [ ] Document created and visible in list
- [ ] Document opens in editor
- [ ] URL shows correct document ID

#### Edit Document
- [ ] Text typing appears in real-time
- [ ] Formatting (bold, italic) works
- [ ] Lists and headings work
- [ ] Images can be inserted
- [ ] Links can be added
- [ ] Character count updates

#### Collaboration
- [ ] Second user can join document
- [ ] Both users see each other's cursors
- [ ] Edits sync in real-time
- [ ] Presence shows active users
- [ ] Comments can be added
- [ ] Mentions work

#### Permissions
- [ ] Share dialog opens
- [ ] Add user by email
- [ ] Set permission level
- [ ] User receives access
- [ ] Remove user access
- [ ] Default access can be changed

#### Delete Document
- [ ] Delete button shows confirmation
- [ ] Confirm deletes document
- [ ] Document removed from list
- [ ] Cannot access deleted document

---

### Whiteboard Tests

- [ ] Notes can be created
- [ ] Notes can be dragged
- [ ] Note position persists
- [ ] Note text can be edited
- [ ] Notes sync between users
- [ ] Undo/Redo works
- [ ] Cursors show for other users

---

### Game Catalog Tests

- [ ] Games page loads all games
- [ ] Game cards show correct info
- [ ] Filter by subject works
- [ ] Featured carousel works
- [ ] Click game opens modal
- [ ] Modal shows full details
- [ ] Play button works (or shows coming soon)

---

### Dashboard Tests

- [ ] Dashboard loads with user data
- [ ] Document list shows user's documents
- [ ] Sidebar navigation works
- [ ] Groups filter documents correctly
- [ ] Draft filter works
- [ ] Create document from dashboard
- [ ] Pagination works

---

### Board of Directors Tests

- [ ] Board page loads
- [ ] Members page shows board members
- [ ] Initiatives page loads
- [ ] Insights page loads
- [ ] Risk page loads
- [ ] Tokenomics page loads

---

### Blockchain Tests

#### Wallet Connection
- [ ] Connect wallet button visible
- [ ] Supported wallets shown
- [ ] Connection establishes
- [ ] Address displayed correctly
- [ ] Network name shown
- [ ] Switch network works

#### Smart Contract Interaction
- [ ] Contract address resolves
- [ ] Read functions work
- [ ] Write functions prompt signature
- [ ] Transaction confirms
- [ ] Events received

---

### RSS Feed Tests

- [ ] RSS feeds load
- [ ] Feed items display
- [ ] Links open correctly
- [ ] Multiple sources aggregated
- [ ] Cache works (fast reload)

---

## Automated Testing (To Be Implemented)

### Unit Tests

```typescript
// Example test structure
describe('Document Actions', () => {
  test('createDocument creates new document', async () => {
    // Test implementation
  });

  test('deleteDocument removes document', async () => {
    // Test implementation
  });
});
```

### Integration Tests

```typescript
// Example test structure
describe('Authentication Flow', () => {
  test('user can sign in with Google', async () => {
    // Test implementation
  });
});
```

### E2E Tests

```typescript
// Example Playwright test
test('create and edit document', async ({ page }) => {
  await page.goto('/dashboard');
  await page.click('text=New Document');
  // ... test steps
});
```

---

## Post-Implementation Test Template

Use this template after completing any implementation:

```markdown
## Test Report - [FEATURE NAME]

**Date:** [DATE]
**Implemented by:** CTO (Claude)
**Tested by:** [WHO]

### Test Cases

| Test | Expected | Actual | Pass/Fail |
|------|----------|--------|-----------|
| Test 1 | Expected result | Actual result | Pass |
| Test 2 | Expected result | Actual result | Fail |

### Issues Found
- Issue 1: [Description]
- Issue 2: [Description]

### Notes
[Any additional observations]

### Sign-off
- [ ] All tests pass
- [ ] No critical issues
- [ ] Ready for merge/deploy
```

---

## Regression Testing

After any major change, run these critical path tests:

### Critical Path Tests
- [ ] User can sign in
- [ ] User can create document
- [ ] User can edit document
- [ ] Real-time collaboration works
- [ ] User can share document
- [ ] User can view games
- [ ] Navigation works throughout app

---

## Performance Testing Checklist

- [ ] Page load < 3 seconds
- [ ] Real-time sync < 100ms latency
- [ ] No memory leaks on long sessions
- [ ] Works on mobile viewport
- [ ] Works on slow network (3G)

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## How to Use This Document

### After Implementing a Feature
1. Find the relevant test section
2. Run through each test manually
3. Document any failures
4. Fix issues before marking task complete
5. Add any new tests discovered

### Before Deploying
1. Run full regression test
2. Run critical path tests
3. Document results
4. Get CEO sign-off

### When Adding New Features
1. Add new test section to this document
2. Define test cases before implementing
3. Use tests to guide development
4. Update after implementation

---

**CTO Commitment:** No implementation is complete until all relevant tests pass. I am responsible for ensuring quality through thorough testing.
