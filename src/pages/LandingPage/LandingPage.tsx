import { ArrowForward } from '@mui/icons-material';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Box, Button, Chip, Container, Grid, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { monoFontStack } from '../../app/theme';

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(92,124,250,0.12)' : 'rgba(52,84,209,0.08)',
          color: 'primary.main',
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero */}
      <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 8, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Chip
              label="INCIDENT REPORTING, GOVERNED"
              size="small"
              sx={{
                mb: 3,
                fontFamily: monoFontStack,
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '0.02em',
                bgcolor: 'transparent',
                border: '1px solid',
                borderColor: 'primary.main',
                color: 'primary.main',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.02em',
                mb: 2,
                fontSize: { xs: '2.25rem', md: '3rem' },
              }}
            >
              Report incidents.
              <Box component="span" sx={{ display: 'block', color: 'text.secondary' }}>
                Review them with a paper trail.
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 460, mb: 4 }}>
              Verb gives engineering teams a governed place to log, review, and publish incident
              post-mortems — with role-based access, organization isolation, and an audit trail that
              can&apos;t be quietly edited after the fact.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/signup')}
                sx={{ px: 3 }}
              >
                Get started
              </Button>
              <Button variant="text" size="large" onClick={() => navigate('/login')} sx={{ px: 3 }}>
                Sign in
              </Button>
            </Box>
          </Grid>

          {/* Mini report-card preview, reusing the same visual language as ReportTile/status chips */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2.5,
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ fontFamily: monoFontStack, color: 'text.secondary' }}
                  >
                    INCIDENT REPORT
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 0.5 }}>
                    Payment API — Elevated Latency
                  </Typography>
                </Box>
                <Chip
                  label="Under Review"
                  size="small"
                  sx={{ bgcolor: 'rgba(217,119,6,0.12)', color: '#D97706', fontWeight: 600 }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2.5 }}>
                <Box sx={{ height: 6, width: '40%', bgcolor: 'divider', borderRadius: 1 }} />
                <Box
                  sx={{
                    height: 6,
                    width: '85%',
                    bgcolor: 'divider',
                    borderRadius: 1,
                    opacity: 0.6,
                  }}
                />
                <Box
                  sx={{
                    height: 6,
                    width: '65%',
                    bgcolor: 'divider',
                    borderRadius: 1,
                    opacity: 0.6,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontFamily: monoFontStack }}
                >
                  27 Aug 2026
                </Typography>
                <Typography variant="caption" color="primary.main" fontWeight={600}>
                  View report →
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 4 }}>
            Built for governed incident management
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Feature
                icon={<VerifiedUserOutlinedIcon />}
                title="Role-based access"
                description="Contributors write, reviewers approve, auditors read — enforced on the server, not just hidden in the UI."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Feature
                icon={<HubOutlinedIcon />}
                title="Organization isolation"
                description="Every report belongs to one organization. Cross-tenant access is structurally impossible, not just policy."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Feature
                icon={<GppGoodOutlinedIcon />}
                title="Immutable audit trail"
                description="Every submit, approve, and change request is logged permanently — no update or delete route exists for it."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
