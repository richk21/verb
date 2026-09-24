import {
  Avatar,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { UserRole } from '../../app/interface/user';
import { OrgMembersActions } from '../../redux/orgMembers/orgMembersActions';
import {
  selectOrgMembers,
  selectOrgMembersLoading,
} from '../../redux/orgMembers/orgMembersSelectors';
import { selectUser } from '../../redux/user/userSelectors';

const ROLE_OPTIONS: UserRole[] = ['contributor', 'reviewer', 'auditor', 'admin'];

export function OrgMembersPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const members = useSelector(selectOrgMembers);
  const isLoading = useSelector(selectOrgMembersLoading);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      dispatch(OrgMembersActions.getAllMembers());
    }
  }, [dispatch, currentUser]);

  // Guard against a non-admin reaching this page via direct URL — the
  // Navbar entry (Step 6) already hides the link, but the route itself
  // must not trust that; the backend independently enforces this too.
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const handleRoleChange = (userId: string, event: SelectChangeEvent) => {
    dispatch(OrgMembersActions.changeRole({ userId, role: event.target.value as UserRole }));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, px: 2 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Organization members
      </Typography>

      <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => {
              const isSelf = member.id === currentUser.id;
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={member.profileImage} sx={{ width: 32, height: 32 }} />
                      <Typography variant="body2">
                        {member.name}
                        {isSelf && (
                          <Typography component="span" variant="caption" color="text.secondary">
                            {' '}
                            (you)
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {member.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Select
                      size="small"
                      value={member.role}
                      disabled={isSelf}
                      onChange={(e) => handleRoleChange(member.id, e)}
                      sx={{ minWidth: 140 }}
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoading && members.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          No other members in your organization yet.
        </Typography>
      )}
    </Box>
  );
}
