'use client'

import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material'

const documents = [
  {
    title: 'UnderTaking Letter',
    file: '/docs/d41d8cd98f00b204e9800998ecf8427e.pdf'
  }
]

export default function DocumentsDownloadsPage() {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Documents
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          Click download to save the document to your device.
        </Typography>

        <List>
          {documents.map((doc, idx) => (
            <ListItem
              key={idx}
              secondaryAction={
                <Button variant='contained' component='a' href={doc.file} download>
                  Download
                </Button>
              }
            >
              <ListItemText primary={doc.title} secondary={doc.file} />
            </ListItem>
          ))}
        </List>

        {documents.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant='body2' color='text.secondary'>No documents available.</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}


