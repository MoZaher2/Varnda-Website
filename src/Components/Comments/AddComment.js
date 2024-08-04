import { useState ,useEffect } from 'react';
import { Box, Button, FormControl, Textarea } from '@mui/joy';
import api from "../../API/ApiLink"
import Cookies from 'js-cookie';
import LoadingBtn from '../LoadingBtn';
export default function AddComment({id}) {
    const[comment,setComment]=useState("");
    const token=Cookies.get("token")
    const [load, setLoad] = useState(false);

    const addComment = async () => {
        setLoad(true)
        try {
            const response = await api.post(`add-post-comment`, { post_id: id, comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setComment("")
            window.location.reload();
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false)
        }
    }
    return (
        <FormControl>
            <h3>كتابه تعليق:</h3>
            <Textarea
                placeholder="اكتب تعليق..."
                minRows={3}
                maxRows={4}
                value={comment}
                onChange={(e)=>{setComment(e.target.value)}}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                        }}
                    >
                        <Button sx={{ ml: 'auto' }} disabled={load} onClick={()=>{addComment()}}>{load ? <LoadingBtn /> : "ارسال"}</Button>
                    </Box>
                }
                sx={{
                    minWidth: 300,
                }}
            />
        </FormControl>
    );
}