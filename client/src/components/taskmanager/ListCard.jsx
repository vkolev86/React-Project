import './listcard.scss';
import { useState } from 'react';
// import Moment from 'react-moment';
import { arrowClick, deleteItem } from '../../redux/taskSlice';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { blue, red, brown } from '@mui/material/colors';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Badge } from '@mui/material';
import Button from '@mui/material/Button';

const ListCard = (items) => {
	const { item } = items;
	const { auth } = useSelector((state) => ({ ...state }));
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	const ArrowClick = (string) => {
		dispatch(arrowClick(item, string));
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};

	const handleClose = () => {
		setOpen(false);
	  };

	return (
		<>
        <TableBody>
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': '' }}
			  hover
            >
			  <TableCell component="th" scope="row">{item._id}</TableCell>
              <TableCell align="left">{item.task}</TableCell>
              <TableCell align="left">{item.description}</TableCell>
              <TableCell align="center">
				{/* <Moment format="YYYY/MM/DD"> */}
					{item.createdDate}
				{/* </Moment> */}
			  </TableCell>
              <TableCell align="center">
				<Badge
					color={item.status && item.status == "done" ? ( "success") : ("warning")}
					badgeContent={item.status}>
				</Badge>
			  </TableCell>
              <TableCell align="center">
				{auth.currentUser && auth.currentUser.id ==  item.cretedBy ? (
					<>
						<Link
							disabled={item.status === 'new'}
							onClick={() => ArrowClick('left')}
						>
							<ArrowCircleLeftIcon 
								sx={item.status && item.status == "new" ? ({color: brown[50] }) : ({ color: blue[500] })}
							/>
						</Link>
						<Link
							disabled={item.status === 'done'}
							onClick={() => ArrowClick('right')}
						>
							<ArrowCircleRightIcon
								sx={item.status && item.status == "done" ? ({color: brown[50] }) : ({ color: blue[500] })}
							/>
						</Link>
						<Link onClick={handleClickOpen}>
							<DeleteForeverIcon sx={{ color: red[500] }} />
						</Link>
					</>
					) : (
					<>
						<Link disabled >
							<ArrowCircleLeftIcon sx={{ color: brown[50] }} />
						</Link>
						<Link disabled >
							<ArrowCircleRightIcon sx={{ color: brown[50] }} />
						</Link>
						<Link disabled >
							<DeleteForeverIcon sx={{ color: brown[50] }} />
						</Link>
					</>
				)}
			  </TableCell>
            </TableRow>
        </TableBody>
		<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
		  	Task: {item.task}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
		</>
	);
};

export default ListCard;
