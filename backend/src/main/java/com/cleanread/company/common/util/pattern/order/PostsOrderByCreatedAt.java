package com.cleanread.company.common.util.pattern.order;

import com.cleanread.company.common.mapper.ObjectMapper;
import com.cleanread.company.model.response.PostDTO;
import com.cleanread.company.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @project: backend
 */
@AllArgsConstructor
public class PostsOrderByCreatedAt implements OrderService {

    private final PostService postService;
    private final Pageable pageable;
    private final ObjectMapper objectMapper;
    private final Long tagId;

    @Override
    public Page<PostDTO> getAllPosts() {
        return postService.getAllPostsByTagOrderByCreatedAt(pageable, tagId)
                .map(post -> objectMapper.mapForResponse(post, PostDTO.class));
    }
}
